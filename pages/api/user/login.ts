import { NextApiRequest, NextApiResponse } from "next"
import { loginSchema } from "../../../lib/validationSchemas";
import bcrypt from "bcrypt"
import prisma from "../../../lib/prisma";
import { createToken } from "../../../lib/util";
import { httpCatchError } from "../../../lib/httpCatchError";
import { decryptRSA } from "../../../lib/rsa";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      try {
        await loginSchema.validate(req.body);
        const username = req.body?.username
        const password = decryptRSA(req.body?.password)

        const findUser = await prisma.user.findUnique({
          where: { username },
        });
        if (!findUser) throw new Error(JSON.stringify({ statusCode: "400", message: "User not found" }))

        const checkPw = await bcrypt.compare(password, findUser!.password);
        if (!checkPw) throw new Error(JSON.stringify({ statusCode: "400", message: "incorrect Password" }))

        const token = createToken({
          username: findUser!.username,
          name: findUser!.name,
        });
        res.status(200).send({ statusCode: "200", token })
      } catch (error: any) {
        httpCatchError({ error, res })
      }
      break;
    }
    default:
      throw new Error(
        `The HTTP ${req.method} method is not supported at this route.`
      )
  }
}

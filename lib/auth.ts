import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export const auth = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers["authorization"];
    if (!token) throw new Error("Token not found")
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) throw new Error("Invalid token")
  } catch (error: any) {
    res.status(401).send({
      statusCode: "401",
      message: error?.message
    })
  }
}
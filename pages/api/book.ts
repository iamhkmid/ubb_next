import { NextApiRequest, NextApiResponse } from "next"
import { httpCatchError } from "../../lib/httpCatchError";
import prisma from "../../lib/prisma";
import { saveFile } from "../../lib/saveFile";
import { stringPath } from "../../lib/util";
import { addBookSchema, deleteBookSchema, updateBookSchema } from "../../lib/validationSchemas";
import { auth } from "../../lib/auth";
import cloudinary from "../../lib/cloudinary";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      const { bookId, slug } = req.query
      if (bookId || slug) {
        const book = await prisma.book.findUnique({ where: { id: bookId as string, slug: slug as string }, include: { Images: { select: { url: true, secureUrl: true, type: true } } } })
        if (book) res.status(200).json({ statusCode: "200", data: book })
        else res.status(404).json({ statusCode: "404", message: "Book not found" })
      } else {
        const books = await prisma.book.findMany({
          include: {
            Images: { select: { url: true, secureUrl: true, type: true } }
          }
        })
        res.status(200).json({ statusCode: "200", data: books })
      }
      break;
    }
    case "POST": {
      auth(req, res).then(async () => {
        try {
          await addBookSchema.validate(req.body);
          const limit = 1048576
          const bufferFile = Buffer.from(req.body.cover.split("base64,")[1], "base64");
          if (bufferFile.byteLength > limit) throw new Error(JSON.stringify({ statusCode: "400", message: `Max file size ${limit / 1024}` }))
          else {
            const image = await cloudinary.uploader.upload(req.body.cover, { folder: "dapurkata/books" })
            const addBook = await prisma.book.create({
              data: {
                title: req.body.title || undefined,
                authorName: req.body.authorName || undefined,
                price: req.body.price || undefined,
                stock: req.body.stock || undefined,
                publisher: req.body.publisher || undefined,
                description: req.body.description || undefined,
                printType: req.body.printType || undefined,
                numberOfPages: req.body.numberOfPages || undefined,
                isbn: req.body.isbn || undefined,
                slug: stringPath(`${req.body.publisher}-${req.body.title}`),
                Images: {
                  create: [
                    {
                      publicId: image.public_id,
                      url: image.url,
                      type: "COVER",
                      secureUrl: image.secure_url,
                    }
                  ]
                }
              },
            })
            res.json({ status: "200", data: addBook })
          }
        } catch (error) {
          throw error
        }
      }).catch((error) => {
        httpCatchError({ error, res })
      })
      break;
    }
    case "/api/book/update": {
      auth(req, res)
      try {
        await updateBookSchema.validate(req.body);
        const findBook = await prisma.book.findUnique({ where: { id: req.body.bookId } })
        let pathFile: string | undefined = undefined;
        if (req.body.cover) {
          saveFile({ dir: "/public/uploads/books", file: req.body.cover, name: `${new Date().getTime()}-${findBook?.title}` as string, limit: 1048576 })
            .then(({ pathFile: path }) => pathFile = path)
        }
        const updateBook = await prisma.book.update({
          where: { id: req.body?.bookId },
          data: {
            title: req.body.title || undefined,
            authorName: req.body.authorName || undefined,
            price: req.body.price || undefined,
            stock: req.body.stock || undefined,
            publisher: req.body.publisher || undefined,
            description: req.body.description || undefined,
            printType: req.body.status || undefined,
            numberOfPages: req.body.numberOfPages || undefined,
            isbn: req.body.isbn || undefined,
            slug: stringPath(`${req.body.publisher || findBook?.publisher}-${req.body.title || findBook?.title}`)
          }
        })
        res.json({ status: "200", data: updateBook })
      } catch (error) {
        httpCatchError({ error, res })
      }
      break;
    }
    case "DELETE": {
      auth(req, res).then(async () => {
        try {
          await deleteBookSchema.validate(req.body);
          const findImage = await prisma.bookImage.findUnique({ where: { bookId: req.body?.bookId } })
          const deleteBook = await prisma.book.delete({ where: { id: req.body?.bookId } })
          if (deleteBook) await cloudinary.uploader.destroy(findImage?.publicId!)
          res.json({ status: "200", data: deleteBook })
        } catch (error) {
          throw error
        }
      }).catch((error) => {
        httpCatchError({ error, res })
      })
      break;
    }
    default: res.status(400).send(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

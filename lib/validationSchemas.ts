import * as yup from "yup"


export const loginSchema = yup.object({
  username: yup.string().required("username is a required field"),
  password: yup.string().required("password is a required field"),
});

export const addBookSchema = yup.object({
  title: yup.string().required("title is a required field"),
  authorName: yup.string().required("authorName is a required field"),
  price: yup.number().required("price is a required field"),
  stock: yup.number().required("stock is a required field"),
  publisher: yup.string().required("publisher is a required field"),
  description: yup.string().required("description is a required field"),
  printType: yup.string().required("printType is a required field"),
  numberOfPages: yup.number().required("numberOfPages is a required field"),
  isbn: yup.string().required("isbn is a required field"),
  cover: yup.string().required("cover is a required field"),
});

export const deleteBookSchema = yup.object({
  bookId: yup.string().required("bookId is a required field")
});

export const updateBookSchema = yup.object({
  bookId: yup.string().required("bookId is a required field")
});
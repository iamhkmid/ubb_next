export type TBook = {
  id: string;
  title: string;
  authorName: string;
  price: number,
  numberOfPages: number,
  stock: number;
  publisher: string;
  description: string;
  Images: { url: string; type: string; secureUrl: string; }[]
  printType: string;
  isbn: string;
  slug: string;
}

export type TQueryBookDetail = {
  book: TBook
}

export type TBookCardHome = {
  id: string;
  title: string;
  authorName: string;
  slug: string;
  printType: string;
  price: number;
  Images: { url: string; type: string; secureUrl: string; }[]
}

export type TQueryBookHome = {
  books: TBookCardHome[]
}

export type TBookPortal = {
  id: string;
  title: string;
  authorName: string;
  createdAt: Date;
}

export type TFormAddBook = {
  title: string;
  authorName: string;
  categoryIds: string;
  price: number;
  stock: number;
  publisher: string;
  description: string;
  printType: string;
  publicationYear: number;
  numberOfPages: number
  isbn: string;
  cover: string;
}

export type TMutationAddBook = {
  addBook: {
    id: string;
    title: string;
    authorName: string;
    price: number;
    stock: number;
    publicationYear: number;
    publisher: string;
    description: string;
    printType: string;
    numberOfPages: number
    isbn: string;
  }
}

export type TMutationDeleteBook = {
  deleteBook: {
    id: string;
    title: string;
    authorName: string;
    price: number;
    stock: number;
    publisher: string;
    description: string;
    printType: string;
    numberOfPages: number
    isbn: string;
  }
}

export type TMutationUpdateBook = {
  updateBook: {
    id: string;
    title: string;
    authorName: string;
    price: number;
    stock: number;
    publisher: string;
    description: string;
    printType: string;
    numberOfPages: number
    isbn: string;
  }
}

export type TDefaultValueUpdateBook = {
  title?: string;
  authorName?: string;
  price?: number;
  stock?: number;
  publisher?: string;
  description?: string;
  printType?: string;
  numberOfPages?: number
  isbn?: string;
}
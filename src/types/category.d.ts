export type TCategory = {
  id: string;
  name: string;
}

export type TFormAddCategory = {
  name: string;

}

export type TMutationAddBookCategory = {
  addBookCategory: {
    id: string;
    name: string;
  }
}

export type TMutationDeleteBookCategory = {
  deleteBookCategory: {
    id: string;
    name: string;
  }
}
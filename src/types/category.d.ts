export type TCategory = {
  id: string;
  nameId: string;
}

export type TFormAddCategory = {
  nameId: string;
  nameEn: string;
}

export type TMutationAddBookCategory = {
  addBookCategory: {
    id: string;
    nameId: string;
    nameEn: string;
  }
}

export type TMutationDeleteBookCategory = {
  deleteBookCategory: {
    id: string;
    nameId: string;
    nameEn: string;
  }
}
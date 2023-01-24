export type TCategory = {
  id: string;
  nameId: string;
}

export type TFormAddCategory = {
  category: string;
}

export type TMutationAddCategory = {
  statusCode: string;
  data: {
    id: string;
    category: string;
  }
}

export type TMutationDeleteCategory = {
  statusCode: string;
  data: {
    id: string;
    category: string;
  }
}
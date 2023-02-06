export type TContact = {
  id: string;
  name: string;
  image: string;
  url: string;
}

export type TMutationUpdateContact = {
  updateContact: {
    url: string;
  }
}

export type TContactPortal = {
  id: string;
  name: string;
  url: string;
}


export type TFormUpdateContact = {
  url?: string;
}

export type TDefaultValueUpdateContact = {
  url: string;
}

export type TUpdateContact = {
  id?: string;
  url?: string;
}

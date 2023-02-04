export type TContact = {
  id: string;
  whatsApp: string;
  instagram: string;
  twitter: string;
  email: string
  facebook: string;
}

export type TMutationUpdateContact = {
  updateContact: {
    id: string;
    whatsApp: string;
    instagram: string;
    twitter: string;
    email: string
    facebook: string;
  }
}

export type TFormUpdateContact = {
  whatsApp?: string;
  instagram?: string;
  twitter?: string;
  email?: string;
  facebook?: string;
}

export type TDefaultValueUpdateContact = {
  whatsApp: string;
  instagram: string;
  twitter: string;
  email: string;
  facebook: string;
}

export type TUpdateContact = {
  id?: string;
  whatsApp?: string;
  instagram?: string;
  twitter?: string;
  email?: string;
}

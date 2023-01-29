export type TAnnouncement = {
  id: string;
  secureUrl: string;
}

export type TMutationAddAnnouncement = {
  addAnnouncement: {
    id: string;
    secureUrl: string;
  }
}

export type TFormAddAnnouncement = {
  image: string;
}

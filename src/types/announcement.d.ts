export type TAnnouncement = {
  id: string;
  image: string
}

export type TMutationAddAnnouncement = {
  addAnnouncement: {
    id: string;
  }
}

export type TFormAddAnnouncement = {
  image: string;
}

export type TQueryPlublicBanners = {
  banners: {
    id: string;
    image: string;
  }[]
}

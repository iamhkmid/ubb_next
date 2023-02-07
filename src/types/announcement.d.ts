export type TBanner = {
  id: string;
  image: string
  length: any
}

export type TMutationAddBanner = {
  addBanner: {
    id: string;
    image: string;
  }
}

export type TMutationDeleteBanner = {
  deleteBanner: {
    id: string;
  }
}

export type TFormAddBanner = {
  image: string ;
}

export type TQueryPlublicBanners = {
  banners: {
    id: string;
    image: string;
  }[]
}

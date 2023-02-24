export type TBanner = {
  id: string;
  imageUrl: string
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
    imageUrl: string;
  }[]
}

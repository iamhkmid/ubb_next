export type TFooterGroup = {
  id: string;
  name: string;
}

export type TFooterInfo = {
  id: string;
  label: string;
  image: string;
  value: string;
  Group?: TFooterGroup
}

export type TMutationUpdateFooter = {
  updateFooterInfo: {
    url: string;
    label: string;
  }
}

export type TFooterPortal = {
  id: string;
  label: string;
  value: string;
  Group?: TFooterGroup
}


export type TFormUpdateFooter = {
  label?: string;
  value?: string;
}

export type TDefaultValueUpdateFooter = {
  label: string;
  value: string;
}

export type TUpdateFooter = {
  id?: string;
  value?: string;
}

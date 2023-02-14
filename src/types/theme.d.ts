type TDefaultColorPallet = {
  "01"?: string
  "02"?: string
  "03"?: string
  "04"?: string
  "05"?: string
  "06"?: string
  "07"?: string
  "08"?: string
  "09"?: string
  "10"?: string
}

type TColors = {
  primary?: {
    dark?: string
    hard?: string
    default?: string
    medium?: string
    soft?: string
    ultrasoft?: string
  },
  text?: {
    dark?: string
    darkGrey?: string
    medium?: string
    soft?: string
    ultraSoft?: string
  },
  stateColor?: {
    red?: {
      medium?: string
      soft?: string
    },
    yellow?: {
      medium?: string
      soft?: string
    },
    blue?: {
      medium?: string
      soft?: string
    },
    green: {
      medium?: string
      soft?: string
    },
    purple?: {
      medium?: string
      soft?: string
    }
  }
  gradient?: {
    red?: {
      vertical?: string
      horizontal?: string
    }
    yellow?: {
      vertical?: string
      horizontal?: string
    }
    blue?: {
      vertical?: string
      horizontal?: string
    }
    green?: {
      vertical?: string
      horizontal?: string
    }
    pink?: {
      vertical?: string
      horizontal?: string
    }
  }
  blue?: TDefaultColorPallet
  red?: TDefaultColorPallet
  yellow?: TDefaultColorPallet
  gray?: TDefaultColorPallet
  green?: TDefaultColorPallet
  purple?: TDefaultColorPallet
}

export type TTheme = {
  colors?: TColors
}
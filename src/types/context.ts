import { TFooterInfo } from "./footer"
import { TTheme } from "./theme"

export type TThemeCtxProps = {
  theme?: TTheme,
}

export type TThemeCtxProviderProps = {
  children: React.ReactNode
}

export type TUbbContext = {
  footer: { data: TFooterInfo[]; error: any; loading: boolean; }
}

export type TUbbCtxProviderProps = {
  children: React.ReactNode
}

export type TUbbReducerState = TUbbContext
export type TUbbReducerAction = {
  type: "SET_FOOTER",
  value: { data: TFooterInfo[]; error: any; loading: boolean; }
}

export type TUbbReducer = (state: TUbbReducerState, action: TUbbReducerAction) => TUbbContext
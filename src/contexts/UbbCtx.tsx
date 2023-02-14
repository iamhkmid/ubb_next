import { useQuery } from "@apollo/client";
import React from "react"
import { FOOTER_INFO } from "../graphql/footer.graphql";
import { TUbbContext, TUbbCtxProviderProps } from "../types/context";
import { TFooterInfo } from "../types/footer";
import { initialState, reducer } from "./UbbReducer";

export const UbbCtx = React.createContext<TUbbContext>(initialState)

const UbbCtxProvider: React.FC<TUbbCtxProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const { data, loading, error } = useQuery<{ footerInfo: TFooterInfo[] }>(FOOTER_INFO)

  React.useEffect(() => {
    if (loading || data || error) dispatch({ type: "SET_FOOTER", value: { data: data?.footerInfo || [], loading, error } })
  }, [data, loading, error])

  const value = { ...state }
  return (
    <UbbCtx.Provider value={value}>
      {children}
    </UbbCtx.Provider>
  )
}

export default UbbCtxProvider

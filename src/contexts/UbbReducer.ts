import { TUbbContext, TUbbReducer } from "../types/context";

export const reducer: TUbbReducer = (state, action) => {
  switch (action.type) {
    case "SET_FOOTER": return { ...state, footer: action?.value };
    default:
      return state;
  }
};

export const initialState: TUbbContext = {
  footer: {
    data: [],
    loading: false,
    error: null
  }
};
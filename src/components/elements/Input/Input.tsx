import React from "react";
import { TInput } from "./Input.types";
import InputCurrency from "./Inputs/InputCurrency";
import InputNumber from "./Inputs/InputNumber";
import InputPaassword from "./Inputs/InputPaassword";
import InputPattern from "./Inputs/InputPattern";
import InputText from "./Inputs/InputText";
import InputTextArea from "./Inputs/InputTextArea";

const Input: React.FC<TInput> = (props) => {
  switch (props.type) {
    case "text": return <InputText {...props} />
    case "numeric": return <InputNumber {...props} />
    case "pattern": return <InputPattern {...props} />
    case "currency": return <InputCurrency {...props} />
    case "password": return <InputPaassword {...props} />
    case "textArea": return <InputTextArea {...props} />
    default: return null
  }
};

export default Input;
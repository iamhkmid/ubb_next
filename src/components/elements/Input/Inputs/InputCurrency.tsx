import React from "react"
import { InputProps, TInputCurrency } from "../Input.types"
import * as El from "../Input.styled";
import rnf from "react-number-format"
import { ThemeCtx } from "../../../../contexts/ThemeCtx";

const InputCurrency: React.FC<InputProps & TInputCurrency> = (props) => {
  const [value, setValue] = React.useState<number | string | undefined>(undefined)
  const [isFocus, setIsFocus] = React.useState(false)

  React.useEffect(() => {
    setValue(props.value!)
  }, [props.value])

  const onChange: rnf.OnValueChange = (value) => {
    props.onChange!(value.floatValue)
    setValue(value.floatValue)
  }

  const onClickClear = () => {
    setValue("")
    props.onChange!("")
  }

  return (
    <El.Main className={`Input-root ${props.className}`} width={props.width} isFocus={isFocus} isFilled={value?.toString()?.length! > 0} disabled={props.disabled!}>
      <div className="Input-wrapper">
        <label className="label" htmlFor={props.id}>{props.label}</label>
        <El.InputNumeric
          id={props.id}
          value={value}
          onValueChange={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          disabled={props.disabled}
          thousandSeparator="."
          decimalSeparator=","
          label={props.label!}
        />
        <El.CloseIcon onClick={onClickClear} show={value?.toString()?.length! > 0} disabled={props.disabled!}><XIcon /></El.CloseIcon>
      </div>
    </El.Main>
  );
}

export default InputCurrency

InputCurrency.defaultProps = {
  disabled: false,
  className: "",
  onChange: () => { },
  width: "300px",
  id: undefined,
  autoComplete: "off",
  value: undefined,
  type: "currency",
};


const XIcon = () => {
  const { theme } = React.useContext(ThemeCtx)
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M1.08325 1.08331L6.91659 6.91665M6.91659 1.08331L1.08325 6.91665" stroke={theme?.colors?.primary?.default} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg >
  )
}
import React from "react"
import { InputProps, TInputPattern } from "../Input.types"
import * as El from "../Input.styled";
import rnf from "react-number-format"
import { ThemeCtx } from "../../../../contexts/ThemeCtx";

const InputPattern: React.FC<InputProps & TInputPattern> = (props) => {
  const [value, setValue] = React.useState<number | string | undefined>(undefined)
  const [isFocus, setIsFocus] = React.useState(false)

  React.useEffect(() => {
    setValue(props.value!)
  }, [props.value])

  const onChange: rnf.OnValueChange = (value) => {
    props.onChange!(value)
    setValue(value.floatValue)
  }

  const onClickClear = () => {
    setValue("")
  }

  return (
    <El.Main className={`Input-root ${props.className}`} width={props.width} isFocus={isFocus} isFilled={value?.toString()?.length! > 0} disabled={props.disabled!}>
      <div className="Input-wrapper">
        <label className="label" htmlFor={props.id}>{props.label}</label>
        <El.InputPattern
          id={props.id}
          value={value}
          onValueChange={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          disabled={props.disabled}
          // @ts-ignore
          format={format}
        />
        <El.CloseIcon onClick={onClickClear} show={value?.toString()?.length! > 0} disabled={props.disabled!}><XIcon /></El.CloseIcon>
      </div>
    </El.Main>
  );
}

export default InputPattern

InputPattern.defaultProps = {
  disabled: false,
  label: "Caption",
  className: "",
  onChange: () => { },
  width: "300px",
  id: "input",
  autoComplete: "off",
  placeholder: "Placeholder",
  value: undefined,
  type: "pattern",
  format:""
};


const XIcon = () => {
  const { theme } = React.useContext(ThemeCtx)
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M1.08325 1.08331L6.91659 6.91665M6.91659 1.08331L1.08325 6.91665" stroke={theme?.colors?.primary?.default} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg >
  )
}
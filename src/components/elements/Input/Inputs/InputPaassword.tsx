import React from "react"
import { InputProps, TInputPassword, TInputText } from "../Input.types"
import * as El from "../Input.styled";
import { ThemeCtx } from "../../../../contexts/ThemeCtx";

const InputPaassword: React.FC<InputProps & TInputPassword> = (props) => {

  const [value, setValue] = React.useState<string>("")
  const [isFocus, setIsFocus] = React.useState(false)
  
  React.useEffect(() => {
    setValue(props.value!)
  }, [props.value])

  const ref = React.useRef<null | HTMLInputElement>(null)
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onChange!(e)
    setValue(e.target.value)
  }

  const onClickClear = () => {
    const nativeInputValueSetter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeInputValueSetter?.call(ref.current, "");

    const inputEvent = new Event('input', { bubbles: true });
    ref.current?.dispatchEvent(inputEvent);
  }
  return (
    <El.Main className={`Input-root ${props.className}`} width={props.width} isFocus={isFocus} isFilled={value?.length! > 0} disabled={props.disabled!}>
      <div className="Input-wrapper">
        <label className="label" htmlFor={props.id}>{props.label}</label>
        <El.InputText
          id={props.id}
          ref={ref}
          value={value}
          type="password"
          onChange={onChange}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoComplete={props.autoComplete}
          placeholder={props.placeholder}
          disabled={props.disabled}
          label={props.label!}
        />
        <El.CloseIcon onClick={onClickClear} show={value?.length! > 0} disabled={props.disabled!}><XIcon /></El.CloseIcon>
      </div>
    </El.Main>
  );
}

export default InputPaassword

InputPaassword.defaultProps = {
  disabled: false,
  label: "Caption",
  className: "",
  onChange: () => { },
  width: "300px",
  id: "input",
  autoComplete: "off",
  placeholder: "Placeholder",
  type: "password"
};


const XIcon = () => {
  const { theme } = React.useContext(ThemeCtx)
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
      <path d="M1.08325 1.08331L6.91659 6.91665M6.91659 1.08331L1.08325 6.91665" stroke={theme?.colors?.primary?.default} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg >
  )
}
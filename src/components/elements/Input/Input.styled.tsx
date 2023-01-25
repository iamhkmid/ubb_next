import styled, { css } from "styled-components";
import { NumericFormat, PatternFormat } from "react-number-format"

type TMain = {
  width?: string;
  isFocus: boolean;
  isFilled: boolean;
  disabled: boolean;
}

export const Main = styled.div<TMain>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: ${({ width }) => width};
  > div.Input-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    > label {
      position: absolute;
      background: #ffffff;
      border-radius: 5px;
      padding: 0 3px;
      height: fit-content;
      top: calc(50% - 7px);
      left: 0;
      color: ${({ theme }) => theme.colors?.text?.darkGrey};
      margin: 0;
      margin-left: 15px;
      line-height: 1;
      font-weight: 500;
      font-size: 14px;
      transition: 0.2s all ease;
    }
  }
  
  ${({ isFocus }) => isFocus ? css`
    > div.Input-wrapper {
      > label {
        top: -7px;
        font-size: 12px;
      }
    }
  ` : css`
    > div.Input-wrapper {
        > label {
          cursor: text;
        }
      }
  `}
  ${({ isFilled }) => isFilled && css`
    > div.Input-wrapper {
      > label {
        top: -7px;
        font-size: 12px;
      }
    }
  `}
  ${({ disabled, isFilled }) => disabled && css`
    > div.Input-wrapper {
      > label {
        color: ${({ theme }) => theme.colors?.text?.medium};
        background: ${({ theme }) => theme.colors?.gray?.["02"]};
        ${isFilled && css`
            background: linear-gradient(to bottom, transparent 50%, ${({ theme }) => theme.colors?.gray?.["02"]} 50%);
        `}
      }
    }
  `}
  transition: .2s all ease;
`;

type TInputText = {
  label: string;
}

export const InputText = styled.input<TInputText>`
  border: 1.5px solid ${({ theme }) => theme.colors?.primary?.soft};
  outline: none;
  border-radius: 25px;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 14px;
  padding: 0 40px 0 18px;
  width: calc(100%-54px);
  height: 40px;
  caret-color: ${({ theme }) => theme.colors?.primary?.default};
  ::placeholder { 
    color: transparent;
  }
  :-ms-input-placeholder {
    color: transparent;
  }
  ::-ms-input-placeholder {
    color: transparent;
  }
  ${({ label }) => !label && css`
    ::placeholder { 
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    :-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    ::-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
  `}

  :focus {
    box-shadow: ${({ theme }) => theme.colors?.primary?.ultrasoft} 0px 0px 0px 2.5px;
    ::placeholder { 
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    :-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    ::-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
  }
  :disabled {
    background: ${({ theme }) => theme.colors?.gray?.["02"]};
    color: ${({ theme }) => theme.colors?.text?.medium};
    border: 1.5px solid ${({ theme }) => theme.colors?.gray?.["06"]};
  }
  transition: .2s all ease;
`

type THelperText = {
  error?: boolean;
}
export const HelperText = styled.div<THelperText>`
  display: flex;
  gap: 5px;
  align-items: center;
  line-height: 1;
  padding: 0 2px;
  padding-top: 5px;
  font-weight: 400;
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.text?.darkGrey};;
  ${({ error }) => error && css`
    color: ${({ theme }) => theme.colors?.stateColor?.red?.medium};
  `}
  transition: all ease 0.2s;
`;

type TCloseIcon = {
  show: boolean;
  disabled: boolean;
}

export const CloseIcon = styled.div<TCloseIcon>`
  display: flex;
  position: absolute;
  cursor: default;
  right: 10px;
  opacity: 0;
  overflow: hidden;
  top: 0;
  bottom: 0;
  margin: auto 0;
  background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 12px 1px rgba(175, 173, 200, 0.2);
  border-radius: 100px;
  width: 22px;
  height: 22px;
  :hover {
    background: ${({ theme }) => theme.colors?.text?.soft};
  }
  ${({ show, disabled }) => show && !disabled && css`
    opacity: 1;
    cursor: pointer;
  `}
  transition: .2s all ease;
`

type TInputNumeric = {
  label: string;
}

export const InputNumeric = styled(NumericFormat) <TInputNumeric>`
  border: 1.5px solid ${({ theme }) => theme.colors?.primary?.soft};
  outline: none;
  border-radius: 25px;
  font-weight: 400;
  font-size: 14px;
  padding: 0 40px 0 18px;
  width: calc(100%-54px);
  height: 46px;
  caret-color: ${({ theme }) => theme.colors?.primary?.default};
  ::placeholder { 
    color: transparent;
  }
  :-ms-input-placeholder {
    color: transparent;
  }
  ::-ms-input-placeholder {
    color: transparent;
  }
  
  ${({ label }) => !label && css`
    ::placeholder { 
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    :-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    ::-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
  `}
  
  :focus {
    box-shadow: ${({ theme }) => theme.colors?.primary?.ultrasoft} 0px 0px 0px 2.5px;
    ::placeholder { 
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    :-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    ::-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
  }
  :disabled {
    background: ${({ theme }) => theme.colors?.gray?.["02"]};
    color: ${({ theme }) => theme.colors?.text?.medium};
    border: 1.5px solid ${({ theme }) => theme.colors?.gray?.["06"]};
  }
  transition: .2s all ease;
`

export const InputPattern = styled(PatternFormat)`
  border: 1.5px solid ${({ theme }) => theme.colors?.primary?.soft};
  outline: none;
  border-radius: 10px;
  font-weight: 400;
  font-size: 14px;
  padding: 0 40px 0 18px;
  width: calc(100%-54px);
  height: 46px;
  caret-color: ${({ theme }) => theme.colors?.primary?.default};
  ::placeholder { 
    color: transparent;
  }
  :-ms-input-placeholder {
    color: transparent;
  }
  ::-ms-input-placeholder {
    color: transparent;
  }
  :focus {
    box-shadow: ${({ theme }) => theme.colors?.primary?.ultrasoft} 0px 0px 0px 2.5px;
    ::placeholder { 
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    :-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    ::-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
  }
  :disabled {
    background: ${({ theme }) => theme.colors?.gray?.["02"]};
    color: ${({ theme }) => theme.colors?.text?.medium};
    border: 1.5px solid ${({ theme }) => theme.colors?.gray?.["06"]};
  }
  transition: .2s all ease;
`



type TDropdown = {
  isSelected: boolean;
  isOpen: boolean;
  disabled: boolean;
}

export const Dropdown = styled.div<TDropdown>`
  display: flex;
  cursor: pointer;
  width: 66px;
  height: 46px;
  padding: 0 10px;
  background: ${({ theme }) => theme.colors?.primary?.default};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors?.text?.ultraSoft};
  gap: 5px;
  font-weight: 700;
  font-size: 16px;
  position: relative;
  transition: 0.2s all ease;
  `

type TOptions = {
  maxHeight: string;
}

export const Options = styled.div<TOptions>`
  display: flex;
  position: absolute;
  z-index: 1;
  padding: 0;
  font-weight: 700;
  font-size: 16px;
  left: 0;
  color: #000;
  top: 100%;
  width: fit-content;
  top: calc(100% - (-3px));
  background: #ffffff;
  overflow: hidden;
  flex-direction: column;
  box-shadow: 0px 4px 12px 1px rgba(175, 173, 200, 0.2);
  border-radius: 10px;
  
  > div.options-scroll {
    max-height: ${({ maxHeight }) => maxHeight ? maxHeight : "200px"};
    overflow-y: auto;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors?.text?.medium};
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${({ theme }) => theme.colors?.text?.darkGrey};
    }
  }
`


type TOption = {
  selected: boolean;
  show?: boolean;
  disabled?: boolean;
}

export const Option = styled.li<TOption>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.text?.dark};
  background: #ffffff;
  max-height: 0;
  gap: 5px;
  overflow: hidden;
  > svg {
    opacity: 0;
  }
  :hover {
    background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
  }
  ${({ selected }) => selected && css`
    background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
    > svg {
      opacity: 1;
    }
  `}
  
  ${({ show }) => show && css`
    padding: 10px 12px;
    max-height: 300px;
  `}
  ${({ disabled }) => disabled && css`
    pointer-events: none;
    background: ${({ theme }) => theme.colors?.gray?.["02"]};
    color: ${({ theme }) => theme.colors?.text?.medium};
  `}
  transition: all 0.2s ease;
`


export const InputTextArea = styled.textarea`
  border: 1.5px solid ${({ theme }) => theme.colors?.primary?.soft};
  outline: none;
  font-family: "Poppins";
  border-radius: 15px;
  font-weight: 400;
  font-size: 14px;
  padding: 15px 40px 15px 13px;
  width: calc(100%-54px);
  height: 150px;
  resize: none;
  caret-color: ${({ theme }) => theme.colors?.primary?.default};
  ::placeholder { 
    color: transparent;
  }
  :-ms-input-placeholder {
    color: transparent;
  }
  ::-ms-input-placeholder {
    color: transparent;
  }
  :focus {
    box-shadow: ${({ theme }) => theme.colors?.primary?.ultrasoft} 0px 0px 0px 2.5px;
    ::placeholder { 
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    :-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
    ::-ms-input-placeholder {
      color: ${({ theme }) => theme.colors?.text?.medium};
    }
  }
  :disabled {
    background: ${({ theme }) => theme.colors?.gray?.["02"]};
    color: ${({ theme }) => theme.colors?.text?.medium};
    border: 1.5px solid ${({ theme }) => theme.colors?.gray?.["06"]};
  }
  transition: .2s all ease;
`
import styled, { css } from "styled-components";

type TMain = {
  width?: string;
}

export const Main = styled.div<TMain>`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  position: relative;
  width: ${({ width }) => width ? width : "fit-content"};
`;

type TDrropdown = {
  isOpen: boolean;
  disabled?: boolean;
  isSelected: boolean;
  type: "SINGLE" | "MULTIPLE"
}
export const Dropdown = styled.div<TDrropdown>`
  display: flex;
  align-items: center;
  position: relative;
  border: 1.5px solid ${({ theme }) => theme.colors?.primary?.soft};
  color: transparent;
  border-radius: 25px;
  min-height: 45px;
  padding: 0 15px;
  justify-content: space-between;
  outline: none;
  cursor: pointer;
  > div.label {
    position: absolute;
    background: #ffffff;
    padding: 0 3px;
    height: fit-content;
    top: calc(50% - 9px);
    left: 0;
    color: ${({ theme }) => theme.colors?.text?.darkGrey};
    margin-left: 13px;
    font-weight: 500;
    font-size: 14px;
    transition: 0.2s all ease;
  }
  > p.value {
    font-weight: 400;
    font-size: 14px;
    margin: 0;
    line-height: 1;
    > span.multiple {
      color: ${({ theme }) => theme.colors?.primary?.default};
    }
  }
  > p.placeholder {
    position: absolute;
    left: 15px;
    color: ${({ theme }) => theme.colors?.text?.darkGrey};
    font-weight: 400;
    font-size: 14px;
    opacity: 0;
    transition: 0.2s opacity ease;
  }

  :focus {
    box-shadow: ${({ theme }) => theme.colors?.primary?.ultrasoft} 0px 0px 0px 2.5px;
  }
  
  > svg.end-icon {
    transition: 0.2s transform ease;
    transform: rotate(180deg);
  }
  ${({ isOpen }) => isOpen && css`
      color: ${({ theme }) => theme.colors?.text?.dark}; 
      box-shadow: ${({ theme }) => theme.colors?.primary?.ultrasoft} 0px 0px 0px 2.5px;
    > div.label {
      top: -7px;
      font-size: 12px;
    }
    > p.placeholder {
      opacity: 1;
    }
    > svg.end-icon {
      transform: rotate(0);
    }
  `}
  ${({ isSelected }) => isSelected && css`
    color: ${({ theme }) => theme.colors?.text?.dark};
    > div.label {
      top: -7px;
      font-size: 12px;
      opacity: 1;
    }
    > p.placeholder {
      opacity: 0;
    }
  `}
  ${({ disabled }) => disabled && css`
    background: ${({ theme }) => theme.colors?.gray?.["02"]};
    cursor: default;
    border: 1.5px solid ${({ theme }) => theme.colors?.text?.medium};
    color: transparent;
    > div.label {
      background: transparent;
      bottom: 15px;
      font-size: 14px;
    }
    > svg.end-icon {
      path {
        stroke: ${({ theme }) => theme.colors?.text?.medium};
      }
    }
  `}
  transition: 0.2s all ease;
`;

type TOptions = {
  maxHeight?: string;
  isOpen: boolean;
}

export const Options = styled.ul<TOptions>`
  display: none;
  position: absolute;
  z-index: 1;
  padding: 0;
  width: 100%;
  top: calc(100% - 10px);
  background: #ffffff;
  overflow: hidden;
  border: 1.5px solid ${({ theme }) => theme.colors?.primary?.ultrasoft};
  flex-direction: column;
  box-shadow: 0px 4px 12px 1px rgba(175, 173, 200, 0.2);
  border-radius: 10px;
  ${({ isOpen }) => isOpen && css`
    display: flex;
  `}
  > div.search{
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.colors?.gray?.["02"]};
    padding: 0 18px;
    gap: 8px;
    > input{
      border: none;
      width: 100%;
      background: transparent;
      color: ${({ theme }) => theme.colors?.text?.darkGrey};;
      font-weight: 400;
      font-size: 14px;
      height: 44px;
      caret-color: ${({ theme }) => theme.colors?.primary?.default};
      outline: none;
      ::placeholder { 
        color: ${({ theme }) => theme.colors?.text?.medium};
        opacity: 1;
      }
      :-ms-input-placeholder {
        color: ${({ theme }) => theme.colors?.text?.medium};
      }
      ::-ms-input-placeholder {
        color: ${({ theme }) => theme.colors?.text?.medium};
      }
      :hover{
        outline: none;
      }
    }
  }
  > div.no-data{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors?.text?.darkGrey};
  }
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
`;

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
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.text?.darkGrey};
  background: #ffffff;
  max-height: 0;
  overflow: hidden;
  :focus {
    background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
  }
  :hover {
    background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
  }
  ${({ selected }) => selected && css`
    background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
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
  > div.label-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  transition: all 0.2s ease;
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
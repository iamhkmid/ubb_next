import { Button as ButtonComp, ButtonProps } from "@mui/material";
import React from "react";
import styled from "styled-components";

type TButton = {
  label?: string | JSX.Element
}

const Button: React.FC<ButtonProps & TButton> = (props) => {
  return (
    <Main {...props}>
      {props.label}
    </Main>
  );
};

export default Button;

Button.defaultProps = {
  variant: "contained",
  type: "button",
  onClick: () => { },
  disabled: false,
  color: "primary"
}

const Main = styled(ButtonComp)`
  display: flex;
  &.MuiButton-root {
    border-radius: 25px;
    margin: 0;
    width: fit-content;
    height: 40px;
    line-height: 1;
    text-transform: none;
  }
  &.MuiButton-contained {
    background: ${({ theme }) => theme?.colors?.primary?.default};
    :hover {
      background: ${({ theme }) => theme?.colors?.primary?.hard};
    }
  }
  &.MuiButton-outlined {
    color: ${({ theme }) => theme?.colors?.primary?.default};
    border-color: ${({ theme }) => theme?.colors?.primary?.soft};
    :hover {
      border-color: ${({ theme }) => theme?.colors?.primary?.medium};
    }
  }
  &.MuiButton-root.Mui-disabled {
    background: ${({ theme }) => theme?.colors?.primary?.ultrasoft};
    border-color: ${({ theme }) => theme?.colors?.primary?.ultrasoft};
    color: ${({ theme }) => theme?.colors?.text?.soft};
  }
  &.MuiButton-startIcon {
    > div {
      display: flex;
      align-items: center;
    }
  }
`
import { Button as ButtonComp, ButtonProps } from "@mui/material";
import React from "react";
import styled from "styled-components";

type TButton = {
  label?: string
}

const Button: React.FC<ButtonProps & TButton> = (props) => {
  return (
    <Main>
      <ButtonComp {...props}>
        {props.label}
      </ButtonComp>
    </Main>
  );
};

export default Button;

Button.defaultProps = {
  variant: "contained",
  type: "button",
  onClick: () => { },
  disabled: false,
  label: "Button",
  color: "primary"
}


const Main = styled.div`
  display: flex;
  .MuiButton-root {
    border-radius: 25px;
    margin: 0;
    height: 40px;
    line-height: 1;
    text-transform: none;
  }
  .MuiButton-contained {
    background: ${({ theme }) => theme?.colors?.primary?.default};
    :hover {
      background: ${({ theme }) => theme?.colors?.primary?.hard};
    }
  }
  .MuiButton-outlined {
    color: ${({ theme }) => theme?.colors?.primary?.default};
    border-color: ${({ theme }) => theme?.colors?.primary?.default};
  }
  .MuiButton-root.Mui-disabled {
    background: ${({ theme }) => theme?.colors?.primary?.Soft};
  }
`
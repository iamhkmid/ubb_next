import { Checkbox as MuiCheckbox, CheckboxProps } from "@mui/material"
import React from "react"
import styled, { css } from "styled-components"

type TCheckbox = CheckboxProps

const Checkbox: React.FC<TCheckbox> = (props) => {
  return <SCheckbox {...props} color="primary"/>
}

export default Checkbox

const SCheckbox = styled(MuiCheckbox)`
  &.MuiCheckbox-root.MuiCheckbox-colorPrimary {
    padding: 5px;
    color: ${({ theme }) => theme.colors?.primary?.soft};
    ${({ checked }) => checked && css`
      color: ${({ theme }) => theme.colors?.primary?.default};
    `}
  }
`
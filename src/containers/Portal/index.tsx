import React from "react"
import styled from "styled-components"

const Portal: React.FC = () => {

  return (
    <Main>
      <p className="title">PORTAL</p>
    </Main>
  )
}

export default Portal

const Main = styled.div`
  left: 250px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 220px);
  align-items: center;
  justify-content: center;
  >p.title {
    font-size: 30px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors?.text?.dark};
  }
`

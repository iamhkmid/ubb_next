import { useRouter } from "next/router"
import React from "react"
import styled, { css } from "styled-components"
import Footer from "../Footer"
import Navbar from "./Navbar"
import SideMenu from "./SideMenu"


type TNavigation = {
  children: React.ReactNode
}

const Navigation: React.FC<TNavigation> = ({ children }) => {
  const { pathname } = useRouter()
  const isPortal = pathname.includes("/portal")
  return (
    <Main isPortal={isPortal}>
      {!isPortal && <Navbar />}
      {isPortal && !pathname.includes("login") && <SideMenu />}
      <div className="child">
        {children}
      </div>
      {!isPortal && <Footer />}
    </Main>
  )
}

export default Navigation

type TMain = {
  isPortal: boolean
}

const Main = styled.div<TMain>`
  display: flex;
  flex-direction: column;
  ${({ isPortal }) => isPortal && css`
    flex-direction: row;
    > div.child {
      margin-left: 250px;
      width: 100%
    }
  `}
`
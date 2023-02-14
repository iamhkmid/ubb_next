import { Collapse } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import styled, { css } from "styled-components"
import { dataMenu } from "./data"

const SideMenu = () => {
  const { pathname, push, replace } = useRouter()
  const [selectedMenu, setSelectedMenu] = React.useState<string>("")

  React.useEffect(() => {
    if (pathname) {
      dataMenu.forEach((item) => {
        if (item.pathname === pathname || item.subMenu?.some((val) => val.pathname === pathname)) {
          setSelectedMenu(item.pathname)
        }
      })
    }
  }, [pathname])

  React.useEffect(() => {
    if (!sessionStorage.getItem("token")) replace("/portal/login")
  }, [])

  const onClickMenu = (nPathname: string) => {
    if (nPathname === "/logout") {
      sessionStorage.removeItem("token")
      replace("/portal/login")
    } else setSelectedMenu((prev) => prev === nPathname ? "" : nPathname)
  }

  return (
    <Main>
      <MenuList>
        {dataMenu.map((item) => (
          <div className="menu" key={item.label}>
            <Item key={item.label} isActive={pathname.includes(item.pathname)} isShow={item.pathname === selectedMenu} onClick={() => onClickMenu(item.pathname)}>
              <div>
                {item.icon}
                {item.label}
              </div>
              {item.subMenu && <ArrowIcon />}
            </Item>
            <Collapse in={item.subMenu && item.pathname === selectedMenu} unmountOnExit>
              <SubMenuWrapper>
                {item.subMenu?.map((submenu) => (
                  <SubMenu isActive={pathname.includes(submenu.pathname)} onClick={() => push(submenu.pathname)} key={submenu.label}>
                    <div>
                      {submenu.label}
                    </div>
                  </SubMenu>
                ))}
              </SubMenuWrapper>
            </Collapse>
          </div>
        ))}
      </MenuList>
    </Main>
  )
}

export default SideMenu

const ArrowIcon = () => (<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144" /></svg>)

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  z-index: 100;
  position: fixed;
  width: 250px;
  
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`
const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  > div.menu {
    display: flex;
    flex-direction: column;
  }
`

type TItem = {
  isActive: boolean;
  isShow: boolean;
}

const Item = styled.div<TItem>`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin: 0 10px;
  border-radius: 0 8px 8px 0;
  font-size: 14px;
  font-weight: 500;
  align-items: center;
  height: 45px;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.colors?.primary?.ultrasoft};
  background: white;
  color: ${({ theme }) => theme.colors?.text?.dark};
  > div {
    display: flex;
    align-items: center;
    gap: 15px;
    > svg {
      path {
        fill: ${({ theme }) => theme.colors?.text?.dark};
      }
      height: 15px;
    }
  }
  > svg {
    height: 10px;
    transition: transform ease 0.3s;
  }
  :hover {
    color: ${({ theme }) => theme.colors?.text?.ultraSoft};
    background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
    > div {
      > svg {
        path {
          fill: ${({ theme }) => theme.colors?.text?.ultraSoft};
        }
      }
    }
  }
  
  ${({ isShow }) => isShow && css`
    > svg {
      transform: rotate(-180deg);
    }
  `}
  ${({ isActive }) => isActive && css`
    background: ${({ theme }) => theme.colors?.primary?.medium};
    color: ${({ theme }) => theme.colors?.primary?.ultrasoft};
    > div {
      > svg {
        path {
          fill: ${({ theme }) => theme.colors?.text?.ultraSoft};
        }
      }
    }
  `}
  transition: all ease 0.3s;
`

type TSubMenu = {
  isActive: boolean
}

const SubMenu = styled.div<TSubMenu>`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 15px;
  font-weight: 400;
  align-items: center;
  height: 45px;
  cursor: pointer;
  background: white;
  border-top: 1px solid ${({ theme }) => theme.colors?.primary?.ultrasoft};
  color: ${({ theme }) => theme.colors?.text?.dark};
  > div {
    display: flex;
    align-items: center;
    gap: 7px;
    > svg {
      path {
        fill: ${({ theme }) => theme.colors?.text?.dark};
      }
      height: 20px;
    }
  }
  > svg {
    height: 20px;
  }
  :hover {
    color: ${({ theme }) => theme.colors?.text?.ultraSoft};
    background: ${({ theme }) => theme.colors?.primary?.soft};
    > div {
      > svg {
        path {
          fill: ${({ theme }) => theme.colors?.text?.ultraSoft};
        }
      }
    }
  }
  ${({ isActive }) => isActive && css`
    background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
    color: ${({ theme }) => theme.colors?.primary?.default};
    > div {
      > svg {
        path {
          fill: ${({ theme }) => theme.colors?.primary?.default};
        }
      }
    }
  `}
  transition: all ease 0.3s;
`

const SubMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${({ theme }) => theme.colors?.primary?.soft};
`
import { Collapse } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import styled, { css } from "styled-components"
import { dataMenu } from "./data"
import { AnimatePresence, motion } from "framer-motion"

const SideMenu = () => {
  const { pathname, push, replace } = useRouter()
  const [selectedMenu, setSelectedMenu] = React.useState<string>("")
  const [hover, setHover] = React.useState<string | null>(null)
  const [hoverSub, setHoverSub] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (pathname) {
      const findMenu = dataMenu.find((item) => item.pathname === pathname || item.subMenu?.some((val) => val.pathname === pathname))
      setSelectedMenu(findMenu?.pathname!)
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
          <div
            className="menu"
            key={item.label}
            onMouseEnter={() => setHover(item.pathname)}
            onMouseLeave={() => setHover(null)}>
            <Item
              key={item.label}
              isActive={pathname.includes(item.pathname)}
              isShow={item.pathname === selectedMenu}
              onClick={() => onClickMenu(item.pathname)}
            >
              <div>
                {item.icon}
                {item.label}
              </div>
              {item.subMenu && <ArrowIcon />}
              <AnimatePresence>
                {hover === item.pathname &&
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover-menu"
                    layoutId="hover-menu">
                  </motion.div>
                }
              </AnimatePresence>
            </Item>
            <Collapse in={item.subMenu && item.pathname === selectedMenu} unmountOnExit>
              <SubMenuWrapper>
                {item.subMenu?.map((submenu) => (
                  <SubMenu
                    isActive={pathname.includes(submenu.pathname)}
                    onClick={() => push(submenu.pathname)} key={submenu.label}
                    onMouseEnter={() => setHoverSub(submenu.pathname)}
                    onMouseLeave={() => setHoverSub(null)}
                  >
                    <div>
                      {submenu.label}
                    </div>
                    <AnimatePresence>
                      {hoverSub === submenu.pathname &&
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover-sub-menu"
                          layoutId="hover-sub-menu">
                        </motion.div>
                      }
                    </AnimatePresence>
                    <AnimatePresence>
                      {pathname.includes(submenu.pathname) &&
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="selected-sub-menu"
                          layoutId="selected-sub-menu">
                        </motion.div>
                      }
                    </AnimatePresence>
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
  position: relative;
  justify-content: space-between;
  padding: 0 20px;
  margin: 0 10px;
  font-size: 13px;
  font-weight: 500;
  align-items: center;
  height: 45px;
  cursor: pointer;
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
  > div.hover-menu {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 0 8px 8px 0;
    background: ${({ theme }) => theme.colors?.primary?.ultraSoft};
    z-index: -1;
  }
  > svg {
    height: 20px;
    transition: transform ease 0.3s;
  }

  ${({ isShow }) => isShow && css`
    > svg {
      transform: rotate(-180deg);
    }
  `}
  ${({ isActive }) => isActive && css`
    color: ${({ theme }) => theme.colors?.primary?.default
    };
    > div {
      > svg {
        path {
          fill: ${({ theme }) => theme.colors?.primary?.default};
        }
      }
    }
  `}
`

type TSubMenu = {
  isActive: boolean
}

const SubMenu = styled.div<TSubMenu>`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 0 20px 0 30px;
  font-size: 13px;
  font-weight: 500;
  align-items: center;
  height: 45px;
  cursor: pointer;
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
  
  > div.hover-sub-menu {
    display: flex;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 0 8px 8px 0;
    background: ${({ theme }) => theme.colors?.primary?.ultraSoft};
    z-index: -1;
  }
  > div.selected-sub-menu {
    display: flex;
    position: absolute;
    height: 100%;
    left: 10px;
    top: 0;
    z-index: 0;
    border-left: 3px solid ${({ theme }) => theme.colors?.primary?.medium};
  }

  ${({ isActive }) => isActive && css`
    color: ${({ theme }) => theme.colors?.primary?.default};
    > div {
      > svg {
        path {
          fill: ${({ theme }) => theme.colors?.primary?.default};
        }
      }
    }
  `}
`

const SubMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2px 20px 0 20px;
  position: relative;
  ::before {
    display: flex;
    position: absolute;
    content: "";
    left: 10px;
    height: 100%;
    width: 100%;
    border-left: 2px solid ${({ theme }) => theme.colors?.text?.soft};
  }
`
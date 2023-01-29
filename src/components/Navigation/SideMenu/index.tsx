import { Collapse } from "@mui/material"
import { useRouter } from "next/router"
import React from "react"
import styled, { css } from "styled-components"

const SideMenu = () => {
  const { pathname, push, replace } = useRouter()
  const [selectedMenu, setSelectedMenu] = React.useState<string>("")

  React.useEffect(() => {
    if (pathname) {
      menu.forEach((item) => {
        if (item.pathname === pathname || item.subMenu?.some((val) => val.pathname === pathname)) {
          setSelectedMenu(item.pathname)
        }
      })
    }
  }, [pathname])

  React.useEffect(() => {
    if(!sessionStorage.getItem("token")) replace("/portal/login")
  }, [])
  

  const menu = [
    {
      label: "Master",
      pathname: "/portal/master",
      icon: <Server />,
      subMenu: [
        {
          label: "Book",
          pathname: "/portal/master/book"
        },
        {
          label: "Category",
          pathname: "/portal/master/category"
        },
        {
          label: "Announcement",
          pathname: "/portal/master/announcement"
        },
      ]
    },
    {
      label: "Logout",
      icon: <Logout />,
      pathname: "/logout"
    }
  ]

  const onClickMenu = (nPathname: string) => {
    if (nPathname === "/logout") {
      sessionStorage.removeItem("token")
      replace("/portal/login")
    } else setSelectedMenu((prev) => prev ? "" : nPathname)
  }

  return (
    <Main>
      <MenuList>
        {menu.map((item) => (
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
const Server = () => (<svg viewBox="0 0 512 512"><path d="M256 428c-52.35 0-111.39-11.61-157.93-31-17.07-7.19-31.69-18.82-43.64-28a4 4 0 00-6.43 3.18v12.58c0 28.07 23.49 53.22 66.14 70.82C152.29 471.33 202.67 480 256 480s103.7-8.67 141.86-24.42C440.51 438 464 412.83 464 384.76v-12.58a4 4 0 00-6.43-3.18c-11.95 9.17-26.57 20.81-43.65 28-46.54 19.39-105.57 31-157.92 31zM464 126.51c-.81-27.65-24.18-52.4-66-69.85C359.74 40.76 309.34 32 256 32s-103.74 8.76-141.91 24.66c-41.78 17.41-65.15 42.11-66 69.69L48 144c0 6.41 5.2 16.48 14.63 24.73 11.13 9.73 27.65 19.33 47.78 27.73C153.24 214.36 207.67 225 256 225s102.76-10.68 145.59-28.58c20.13-8.4 36.65-18 47.78-27.73C458.8 160.49 464 150.42 464 144z" /><path d="M413.92 226c-46.53 19.43-105.57 31-157.92 31s-111.39-11.57-157.93-31c-17.07-7.15-31.69-18.79-43.64-28a4 4 0 00-6.43 3.22V232c0 6.41 5.2 14.48 14.63 22.73 11.13 9.74 27.65 19.33 47.78 27.74C153.24 300.34 207.67 311 256 311s102.76-10.68 145.59-28.57c20.13-8.41 36.65-18 47.78-27.74C458.8 246.47 464 238.41 464 232v-30.78a4 4 0 00-6.43-3.18c-11.95 9.17-26.57 20.81-43.65 27.96z" /><path d="M413.92 312c-46.54 19.41-105.57 31-157.92 31s-111.39-11.59-157.93-31c-17.07-7.17-31.69-18.81-43.64-28a4 4 0 00-6.43 3.2V317c0 6.41 5.2 14.47 14.62 22.71 11.13 9.74 27.66 19.33 47.79 27.74C153.24 385.32 207.66 396 256 396s102.76-10.68 145.59-28.57c20.13-8.41 36.65-18 47.78-27.74C458.8 331.44 464 323.37 464 317v-29.8a4 4 0 00-6.43-3.18c-11.95 9.17-26.57 20.81-43.65 27.98z" /></svg>)
const Logout = () => (<svg viewBox="0 0 512 512"><path d="M160 256a16 16 0 0116-16h144V136c0-32-33.79-56-64-56H104a56.06 56.06 0 00-56 56v240a56.06 56.06 0 0056 56h160a56.06 56.06 0 0056-56V272H176a16 16 0 01-16-16zM459.31 244.69l-80-80a16 16 0 00-22.62 22.62L409.37 240H320v32h89.37l-52.68 52.69a16 16 0 1022.62 22.62l80-80a16 16 0 000-22.62z" /></svg>)

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  position: relative;
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
  font-size: 15px;
  font-weight: 400;
  align-items: center;
  height: 45px;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.colors?.primary?.ultrasoft};
  background: white;
  color: ${({ theme }) => theme.colors?.text?.dark};
  > div {
    display: flex;
    align-items: center;
    gap: 7px;
    > svg {
      path {
        fill: ${({ theme }) => theme.colors?.text?.dark};
      }
      height: 22px;
    }
  }
  > svg {
    height: 20px;
    transition: transform ease 0.3s;
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
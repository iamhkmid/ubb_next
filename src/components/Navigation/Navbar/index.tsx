"use client"  
import React, { useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import styled from "styled-components"
'use client'
import { motion } from "framer-motion"

const Navbar = () => {
  const router = useRouter()
  const [selected, setSelected] = React.useState<string>("/")

  useEffect(() => {
    if(router.pathname) setSelected(router.pathname)
  }, [router.pathname])
  

  return (
    <Main>
      <div onClick={() => router.push("/")} className="logo-wrapper">
        <Image src="/icons/ubb_press.png" height={40} width={145} alt="logo" />
      </div>
      <Menu>
        <ul className="menu-list">
          {menuList.map((menu) => (
            <li onClick={() => router.push(menu.path)} key={menu.id}>
              {menu.label}
              {selected === menu.path && <motion.div className="selected-menu" layoutId="selected-menu"></motion.div>}
            </li>
          ))}
        </ul>
      </Menu>
    </Main>
  )
}

export default Navbar


const menuList = [
  {
    id: 1,
    label: "Home",
    path: "/"
  },
  {
    id: 2,
    label: "Explore",
    path: "/explore"
  }
]

const Main = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  position: fixed;
  padding: 0 50px;
  background: #fff;
  min-height: 60px;
  z-index: 10;
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  > div.logo-wrapper {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`

const Menu = styled.div`
  display: flex;
  > ul.menu-list {
    list-style-type: none;
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 0 50px;
    font-size: 14px;
    font-weight: 400; 
    > li {
      float: left;
      text-align: center;
      cursor: pointer;
      color: ${({ theme }) => theme.colors?.primary?.dark};
      position: relative;
      padding: 5px 10px;
      border-radius: 25px;
      > div.selected-menu {
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        border-radius: 2px;
        background: ${({ theme }) => theme.colors?.primary?.default};
        z-index: -1;
        transition: background ease 0.3s;
      }
      :hover {
          background: ${({ theme }) => theme.colors?.primary?.ultraSoft};
        > div.selected-menu {
          background: ${({ theme }) => theme.colors?.primary?.default};
        }
      }
      transition: background ease 0.3s;
    }
  }
`
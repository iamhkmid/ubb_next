import Image from "next/image"
import { useRouter } from "next/router"
import styled from "styled-components"

const Navbar = () => {
  const router = useRouter()
  return (
    <Main>
      <div onClick={()=>router.push("/")} className="logo-wrapper">
        <Image src="/icons/ubb_press.png" height={40} width={145} alt="logo" />
      </div>
    </Main>
  )
}

export default Navbar

const Main = styled.div`
  display: flex;
  width: 100%;
  position: fixed;
  align-items: center;
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
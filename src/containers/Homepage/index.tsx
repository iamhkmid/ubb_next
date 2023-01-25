import { useRouter } from "next/router"
import { FC } from "react"
import styled from "styled-components"
import BookList from "../../components/BookList"

type THomepage = {}

const Homepage: FC<THomepage> = () => {
  const router = useRouter()
  return (
    <Main>
      <BookList />
    </Main>
  )
}

export default Homepage

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,245,247,1) 70%, rgba(230,236,240,1) 100%);
`
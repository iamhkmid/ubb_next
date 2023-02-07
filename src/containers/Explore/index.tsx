import { FC } from "react"
import styled from "styled-components"
import BookExplore from "../../components/BookExplore"

type TExplore = {}

const Explore: FC<TExplore> = () => {
  
  return (
    <Main>
      <BookExplore />
    </Main>
  )
}

export default Explore

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding-top: 110px;
  min-height: calc(100vh - 220px);
  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,245,247,1) 70%, rgba(230,236,240,1) 100%);
  gap: 20px;
`
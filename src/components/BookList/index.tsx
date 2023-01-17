import { Fade } from "@mui/material"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import styled from "styled-components"
import useQuery from "../../hooks/useQuery"
import { TBook } from "../../types/book"
import BookCard from "../BookCard"
import { FacebookCircularProgress } from "../Loading/LoadingWrapper"

type TBookList = {
}

type TResBook = {
  statusCode: string;
  data: TBook[]
}

const BookList: FC<TBookList> = () => {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const { data, error, loading } = useQuery<TResBook>({
    method: "GET",
    url: "/api/book"
  })

  const onClickBook = (slug: string) => {
    router.push({
      pathname: '/book/[slug]',
      query: { slug },
    })
  }

  const filterBook = data?.data?.filter((val) => `${val.title.toLowerCase()} ${val.authorName.toLowerCase()}`.includes(search.toLowerCase()))

  return (
    <Main id="book-list">
      <Content>
        <div className="search">
          <div className="input-wrapper">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari berdasarkan judul/penulis"
            />
          </div>
        </div>
        <Fade in={!loading && filterBook?.length > 0} unmountOnExit>
          <div className="books-wrapper">
            {filterBook?.map((book) => (
              <div key={book.id}>
                <BookCard data={book} onClick={() => onClickBook(book.slug)} />
              </div>
            ))}
          </div>
        </Fade>
        {!loading && filterBook?.length === 0 && <NoData>Buku tidak ditemukan</NoData>}
        <Fade in={loading} unmountOnExit>
          <Loading>
            <FacebookCircularProgress size={60} thickness={5} />
          </Loading>
        </Fade>
      </Content>
    </Main>
  )
}

export default BookList

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 90px 60px 60px 60px;
  min-height: calc(100vh - 220px);
  gap: 50px;
  >p.title{
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    margin: 0;
    line-height: 1;
  }
`

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  position: absolute;
  background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
  position: relative;
  gap: 40px;
  > div.search {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    > div.input-wrapper {
      display: flex;
      position: relative;
      > input {
        outline: none;
        border: 1px solid #dcecfd;
        border-radius: 3px;
        font-size: 16px;
        padding: 9px 10px 9px 35px;
        font-weight: 500;
        width: 500px;
        color: #384048;
        ::-webkit-input-placeholder { /* Edge */
          color: #3d5e7e;
        }

        :-ms-input-placeholder { /* Internet Explorer 10-11 */
          color: #3d5e7e;
        }

        ::placeholder {
          color: #3d5e7e;
        }
      }
      > svg{
        position: absolute;
        left: 10px;
        height: 100%;
        width: 20px;
        > path {
          fill: #3d5e7e;
        }
      }
    }
  }
  > div.books-wrapper {
    display: grid;
    padding: 40px 0;
    width: 100%;
    gap: 20px;
    grid-template-columns: repeat( auto-fill, minmax(160px, 1fr) );
    border-top: 2px dashed #5e7a95;
    border-bottom: 2px dashed #5e7a95;
  }
`

const NoData = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #384048;
`

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Search</title><path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z" /></svg>
)
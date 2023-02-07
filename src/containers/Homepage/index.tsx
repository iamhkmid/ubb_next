import React from "react"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import styled from "styled-components"
import Banners from "../../components/Banners"
import BookCard from "../../components/BookCard"
import Button from "../../components/elements/Button"
import LoadingWrapper from "../../components/Loading/LoadingWrapper"
import { PUBLIC_ANNOUNCEMENT } from "../../graphql/announcement.graphql"
import { PUBLIC_BOOK_LIST } from "../../graphql/book.graphql"
import { TQueryPlublicBanners } from "../../types/announcement"
import { TQueryBookHome } from "../../types/book"
import { Fade } from "@mui/material"

type THomepage = {}

const Homepage: React.FC<THomepage> = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)

  const { data: dataBanner, loading: loadBanner } = useQuery<TQueryPlublicBanners>(PUBLIC_ANNOUNCEMENT)

  const { data, error, loading: loadBooks, refetch } = useQuery<TQueryBookHome>(PUBLIC_BOOK_LIST, {
    refetchWritePolicy: "overwrite",
    notifyOnNetworkStatusChange: true,
    variables: { options: { take: 14, sortBy: "NEW" } }
  })

  React.useEffect(() => {
    setLoading(loadBanner || loadBooks)
  }, [loadBanner, loadBooks])

  const onClickBook = (slug: string) => {
    router.push({ pathname: '/book/[slug]', query: { slug } })
  }

  return (
    <Main>
      <LoadingWrapper open={loading} />
      <Fade in={!loading}>
        <div>
          <Banners data={dataBanner!} />
          <NewBook>
            <Line>
              <div className="label">
                <p className="title">Terbaru</p>
                <Button variant="text" label="Tampilkan Semua" onClick={() => router.push("/explore")} />
              </div>
              <div className="line-color" />
            </Line>
            <div className="books-wrapper">
              {data?.books?.map((book) => (
                <div key={book.id}>
                  <BookCard data={book} onClick={() => onClickBook(book.slug)} />
                </div>
              ))}
            </div>
          </NewBook>
        </div>
      </Fade>
    </Main>
  )
}

export default Homepage

const Main = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 0 60px;
  padding-top: 110px;
  min-height: calc(100vh - 220px);
  box-sizing: border-box;
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(242,245,247,1) 70%, rgba(230,236,240,1) 100%);
  gap: 100px;
`

const Line = styled.div`
  display: flex;
  flex-direction: column;
  > div.label {
    display: flex;
    justify-content: space-between;
    >p.title {
      font-size: 18px;
      font-weight: 600;
    }
    .MuiButton-root {
      padding: 10px;
      line-height: 1;
      height: auto;
      border-radius: 10px;
    }
  }
  > div.line-color {
    display: flex;
    width: 100%;
    position: relative;
    height: 3px;
    overflow: hidden;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
    ::before {
      content: "";
      position: absolute;
      width: 10%;
      height: 100%;
      left: 0;
      top: 0;
      background: #f02f59;
    }
  }
`

const NewBook = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-bottom: 100px;
  > div.books-wrapper {
    display: grid;
    padding: 10px 20px;
    width: 100%;
    gap: 20px;
    grid-template-columns: repeat( auto-fill, minmax(150px, 1fr) );
  }
`
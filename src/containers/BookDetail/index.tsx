import { useQuery } from "@apollo/client"
import { Fade } from "@mui/material"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { FC, useMemo } from "react"
import styled from "styled-components"
import Button from "../../components/elements/Button"
import { FacebookCircularProgress } from "../../components/Loading/LoadingWrapper"
import { PUBLIC_BOOK_DETAIL } from "../../graphql/book.graphql"
import { CONTACTS, CONTACTWA } from "../../graphql/contact.graphql"
import { formatToCurrency } from "../../helpers/formatToCurrency"
import { TQueryBookDetail } from "../../types/book"
import { TContact, TDefaultValueUpdateContact } from "../../types/contact"

type TBookDetail = { slug: string; }

const BookDetail: FC<TBookDetail> = ({ slug }) => {
  type TResContact = {
    contact: TContact;
  }
  const { data: dataContact} = useQuery<TResContact>(CONTACTWA)
  const router = useRouter()
  const { data, loading, error } = useQuery<TQueryBookDetail>(PUBLIC_BOOK_DETAIL, { variables: { slug } })

  const onClickCategory = (category: string) => {
    router.push({ pathname: "/", query: { categories: category } })
  }

  const detail = useMemo(() => ([
    {
      label: "Jumlah Halaman",
      value: data?.book?.numberOfPages
    },
    {
      label: "ISBN",
      value: data?.book?.isbn
    },
    {
      label: "Penerbit",
      value: data?.book?.publisher
    },
    {
      label: "Stok",
      value: data?.book?.stock
    },
    {
      label: "Tahun Terbit",
      value: data?.book?.publicationYear
    }
  ]), [data?.book])

  return (
    <>
      <Head>
        <title>{data?.book ? `${data?.book.title} - ${data?.book.authorName}` : slug}</title>
        <link rel="icon" href="/icons/ubb_press_logo.png" />
      </Head>
      <Main>
        <div className="content">
          <Back onClick={() => router.push({ pathname: "/", hash: "#book-list" })}>{"< Kembali"}</Back>
          <Fade in={loading} unmountOnExit>
            <Loading>
              <FacebookCircularProgress size={60} thickness={5} />
            </Loading>
          </Fade>
          {!loading && data?.book && (
            <div className="detail-wrapper">
              <CoverWrapper>
                <div>
                  {data?.book.Images?.find((val) => val.type === "COVER") ? (
                    <Image
                      src={data?.book?.Images?.find((val) => val.type === "COVER")?.secureUrl!}
                      fill
                      alt="cover"
                    />) : null}
                </div>
              </CoverWrapper>
              <BookInfo>
                <div className="main-info">
                  <div className="section-1">
                    <p className="title">{data.book?.title}</p>
                    <p className="author">{data.book?.authorName}</p>
                    <div className="additional">
                      <div>{data.book?.printType}</div>
                    </div>
                  </div>
                  <div className="section-2">
                    <p className="price">{`Rp ${formatToCurrency(data.book?.price, 0)}`}</p>
                    <Button type="button" onClick={() => window.open(dataContact?.contact?.url)} label="Beli Sekarang" variant="contained" />
                  </div>
                </div>
                <div className="additional-info">
                  <Description>
                    <p className="title">Deskripsi Buku</p>
                    <p className="value">{data.book?.description}</p>
                  </Description>
                  {data?.book?.Categories?.length && (
                    <Categories>
                      <p className="title">Kategori</p>
                      <div className="item-wrapper">
                        {data?.book?.Categories?.map((cat) => <div><Button label={cat.name} variant="outlined" onClick={() => onClickCategory(cat.name)} /></div>)}
                      </div>
                    </Categories>
                  )}
                  <Detail>
                    <p className="title">Detail</p>
                    <div className="item-wrapper">
                      {detail.map((val) => (
                        <div key={val.label}>
                          <p className="label">{val.label}</p>
                          <p className="value">{val.value}</p>
                        </div>
                      ))}
                    </div>
                  </Detail>
                </div>
              </BookInfo>
            </div>
          )}
        </div>
      </Main>
    </>
  )
}

export default BookDetail

const Main = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);
  padding: 100px 60px 0 60px;
  background: #e7edf2;
  padding-bottom: 30px;
  >div.content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    background: rgb(255,255,255);
    border-radius: 8px;
    padding: 30px;
    padding-bottom: 70px;
    position: relative;
    > div.detail-wrapper{
      display: flex;
      gap: 40px;
    }
  }
`

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  left: 0;
  position: absolute;
  background: white;
  z-index: 2;
`

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  > div.main-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    > div.section-1 {
      display: flex;
      flex-direction: column;
      > p.title {
        font-size: 25px;
        font-weight: 700;
        margin: 0;
        line-height: 1.3;
        color: #101316;
      }
      > p.author {
        font-size: 15px;
        font-weight: 600;
        margin: 0;
        line-height: 1.3;
        color: #6a7b8b;
      }
      
      > div.additional{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        margin: 0;
        margin-top: 3px;
        width: fit-content;
        font-size: 11px;
        padding: 3px 10px;
        border-radius: 20px;
        font-weight: 600;
        line-height: 1.3;
        background: #467ac1;
        color: #fff;
      }
    }
    > div.section-2{
      display: flex;
      flex-direction: column;
      gap: 10px;
      > p {
        font-size: 22px;
        font-weight: 700;
        margin: 0;
        line-height: 1.3;
        color: #ff4a71;
      }
    }
  }
  >div.additional-info {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
`

const CoverWrapper = styled.div`
  display: flex;
  padding: 20px;
  min-width: 450px;
  height: 450px;
  aspect-ratio: 1/1;
  background: #d2e2f3;
  justify-content: center;
  border-radius: 10px;
  >div{
    border-radius: 8px;
    overflow: hidden;
    aspect-ratio: 2/2.9;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
  }
`

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > p.title {
    font-size: 17px;
    font-weight: 600;
    margin: 0;
    line-height: 1.3;
    color: #466899;
  }
  > p.value {
    font-size: 14px;
    font-weight: 500;
    margin: 0;
    padding: 0 10px;
    line-height: 1.6;
    color: #495569;
  }
`

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > p.title {
    font-size: 17px;
    font-weight: 600;
    margin: 0;
    line-height: 1.3;
    color: #466899;
  }
  > div.item-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    > div {
      display: flex;
      flex-direction: column;
      gap: 5px;
      > p:nth-child(1){
        font-size: 12px;
        font-weight: 600;
        margin: 0;
        padding: 0 10px;
        line-height: 1;
        color: #495569;
      }
      > p:nth-child(2){
        font-size: 15px;
        font-weight: 400;
        margin: 0;
        padding: 0 10px;
        line-height: 1;
        color: #495569;
      }
    }
  }
`

const Back = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  padding: 0 10px;
  line-height: 1;
  color: #2c313d;
  cursor: pointer;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 3px;
  :hover {
    background: #c9d4e6;
    color:#3c4a6c;
  }
  transition: 0.3s all ease;
`

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > p.title {
    font-size: 17px;
    font-weight: 600;
    margin: 0;
    line-height: 1.3;
    color: #466899;
  }
  > div.item-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    > div {
      display: flex;
    }
    > div >div {
      display: flex;
      width: 100%;
    }
    .MuiButton-root {
      border-radius: 25px;
      width: 100%;
      margin: 0;
      height: 30px;
      box-shadow: none;
    }
  }
`
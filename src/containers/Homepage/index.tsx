import Image from "next/image"
import { useRouter } from "next/router"
import { FC } from "react"
import styled from "styled-components"
import BookList from "../../components/BookList"
import Button from "../../components/elements/Button"
import { TBook } from "../../types/book"

type THomepage = {
}

const Homepage: FC<THomepage> = () => {
  const router = useRouter()
  return (
    <>
      <Main>
        <div className="content">
          <div className="title">
            <p>Penerbit DapurKata</p>
            <p>"Di sini, naskahmu diracik dengan sempurna."</p>
          </div>
          <Image src="/img/banner.svg" width={400} height={300} alt="pic" />
          <div className="button-wrapper">
            <Button type="button" variant="contained" label="Pesan Sekarang" onClick={() => window.open("https://wa.link/i4bf6x")} />
            <Button type="button" variant="outlined" label="Daftar Buku" onClick={() => router.push({ hash: "#book-list" })} />
          </div>
        </div>
      </Main>
      <BookList />
    </>
  )
}

export default Homepage

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(231,241,255,1) 54%, rgba(181,212,255,1) 100%);
  >div.content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    >div.title{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      >p:nth-child(1){
        font-size: 23px;
        font-weight: 700;
        margin: 0;  
        line-height: 1.4;
        color: #23252c;
      }
      >p:nth-child(2){
        font-size: 17px;
        font-weight: 500;
        margin: 0;  
        line-height: 1.4;
        color: #3c404a;
      }
    }
    > div.button-wrapper {
      display: flex;
      gap: 50px;
    }
  }
`
import Image from "next/image";
import { FC } from "react";
import styled from "styled-components"
import { formatToCurrency } from "../../helpers/formatToCurrency";
import { TBook } from "../../types/book"

type TBookCard = {
  data: TBook;
  onClick?: () => void;
}

const BookCard: FC<TBookCard> = ({ data, onClick }) => {

  return (
    <Main onClick={onClick}>
      <div className="cover">
        {data?.Images?.find((val) => val.type === "COVER") ? (
          <Image
            src={data?.Images?.find((val) => val.type === "COVER")?.secureUrl!}
            fill
            alt="cover"
          />) : null}
      </div>
      <div className="detail">
        <p className="title">{data.title}</p>
        <p className="author">{data.authorName}</p>
        <p className="price">{`Rp ${formatToCurrency(data.price, 0)}`}</p>
        <div className="additional">
          <div>{data.printType}</div>
        </div>
      </div>
    </Main>
  )
}

export default BookCard

const Main = styled.div`
  display: flex;
  flex-direction: column;
  aspect-ratio: 2/2.8;
  padding: 7px;
  background: #fff;
  border-radius: 3px;
  cursor: pointer;
  border: 1px solid transparent;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  :hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    border: 1px solid #c2dbff;
  }
  transition: 0.3s all ease;
  >div.cover {
    border-radius: 3px;
    overflow: hidden;
    height: 100%;
    width: 100%;
    top: -15px;
    position: relative;  
    background: #fff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  >div.detail {
    display: flex;
    flex-direction: column;
    position: relative;
    top: -5px;
    > p.title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 12px;
      font-weight: 500;
      margin: 0;
      line-height: 1.3;
      color: #1e242c;
    }
    > p.author {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: 11px;
      font-weight: 400;
      margin: 0;
      line-height: 1.3;
      color: #475464;
    }
    > p.price {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      line-height: 1.3;
      color: #ff4a71;
    }
    > div.additional{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      margin: 0;
      margin-top: 3px;
      width: fit-content;
      font-size: 10px;
      padding: 2px 4px;
      border-radius: 2px;
      font-weight: 600;
      line-height: 1.3;
      background: #467ac1;
      color: #fff;
    }
  }
`
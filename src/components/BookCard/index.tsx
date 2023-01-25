import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import Image from "next/image";
import { FC, useContext } from "react";
import styled from "styled-components"
import { ThemeCtx } from "../../contexts/ThemeCtx";
import { formatToCurrency } from "../../helpers/formatToCurrency";
import { TBookCardHome } from "../../types/book";

type TBookCard = {
  data: TBookCardHome;
  onClick?: () => void;
}

const BookCard: FC<TBookCard> = ({ data, onClick }) => {

  const { theme } = useContext(ThemeCtx)

  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (<Tooltip {...props} classes={{ popper: className }} />
  ))(({ }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme?.colors?.primary?.ultrasoft,
      color: theme?.colors?.text?.dark,
      boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;",
      fontSize: 11,
      textAlign: "center",
      maxWidth: "250px"
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme?.colors?.primary?.soft,
    },
  }));

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
        <LightTooltip title={data?.title} arrow>
          <p className="title">{data.title}</p>
        </LightTooltip>
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
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
    border: 1px solid ${({theme})=>theme.colors?.primary?.medium};
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
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
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
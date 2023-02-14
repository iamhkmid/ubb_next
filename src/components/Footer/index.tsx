import React from "react"
import styled from "styled-components"
import { UbbCtx } from "../../contexts/UbbCtx"

const Footer = () => {
  const { footer } = React.useContext(UbbCtx)

  const socialMedia = React.useMemo(() => footer?.data?.filter((val) => val?.Group?.name === "SOCIAL_MEDIA") || [], [footer?.data])
  const phone = React.useMemo(() => footer?.data?.find((val) => val?.Group?.name === "PHONE")?.value || "-", [footer?.data])
  const address = React.useMemo(() => footer?.data?.find((val) => val?.Group?.name === "ADDRESS")?.value || "-", [footer?.data])

  return (
    <Main>
      <div className="content">
        <Phone>
          <p>No. Telp</p>
          <p>{phone}</p>
        </Phone>
        <Address>
          <p>Alamat</p>
          <p>{address}</p>
        </Address>
        <Media>
          <p>Sosial Media</p>
          <div className="icon-wrapper">
            {socialMedia?.map((val) => (
              <div onClick={() => window.open(val.value)} key={val?.id}>
                <img src={val.image} alt={val.label} />
              </div>
            ))}
          </div>
        </Media>
      </div>
      <div className="footer-message">© Copyright 2023 UBB PRESS</div>
    </Main>
  )
}

export default Footer

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  > div.content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 40px 60px;
    gap: 20px;
  }
  > div.footer-message {
    display: flex;
    border-top: 2px dashed #a7b1cf;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    margin: 0;
    line-height: 1;
    padding: 10px;
    color: #101114;
    background: #f0f4ff;
  }
`

const Phone = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  > p:nth-child(1){
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    line-height: 1;
    color: #101114;
  }
  > p:nth-child(2){
    font-size: 13px;
    font-weight: 500;
    margin: 0;
    line-height: 1;
    color: #1f2127;
  }
`;


const Address = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  > p:nth-child(1){
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    line-height: 1;
    color: #101114;
  }
  > p:nth-child(2){
    font-size: 13px;
    font-weight: 500;
    margin: 0;  
    line-height: 1.4;
    color: #1f2127;
  }
`

const Media = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  > p:nth-child(1){
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    line-height: 1;
    color: #101114;
  }
  > div.icon-wrapper {
    display: grid;
    grid-template-columns: repeat( auto-fit, 45px);
    gap: 5px;
    > div {
      cursor: pointer;
      display: flex;
      background: #fff;
      border-radius: 100%;
      padding: 5px;
      aspect-ratio: 1/1;
      :hover{
        box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
      }
      transition: 0.3s all ease;
    }
  }
`
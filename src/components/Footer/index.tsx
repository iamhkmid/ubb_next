import { useQuery } from "@apollo/client"
import styled from "styled-components"
import { CONTACTS } from "../../graphql/contact.graphql"
import { TContact } from "../../types/contact"

const Footer = () => {
  type TResContact = {
    contacts: TContact[]
  }
  const { data } = useQuery<TResContact>(CONTACTS)
  return (
    <Main>
      <div className="content">
        <Phone>
          <p>No. Telp</p>
          <p>+62 (0717) 422145</p>
        </Phone>
        <Address>
          <p>Alamat</p>
          <p>Gedung Rektorat UBB, Kampus Terpadu Universitas Bangka Belitung Desa Balinijuk, Kec. Merawang, Kab. Bangka, Prov. Kep. Bangka Belitung</p>
        </Address>
        <Media>
          <p>Sosial Media</p>
          <div className="icon-wrapper">
          {data?.contacts?.map((val) => (
            <div onClick={() => window.open(val.url)}>
                 <img src={val.image} alt={val.name}/>
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
  > div.icon-wrapper{
    display: grid;
    grid-template-columns: repeat( auto-fit, 40px );
    gap: 10px;
    > img {
      display: flex;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      border-radius: 100%;
      padding: 5px;
      cursor: pointer;
      :hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
      transition: 0.2s all ease;
    }
  }
`


const Facebook = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      id="rect832"
      fill="#3b5999"
      fillOpacity="1"
      stroke="none"
      strokeWidth="10.6958"
      d="m 254.74922,2.89017 c -140.41204,0 -253.452385,113.03839 -253.452385,253.45041 0,134.11607 103.132735,243.25113 234.739615,252.76925 V 334.19235 h -64.1402 v -80.17521 h 64.1402 v -64.14017 c 0,-53.15083 43.05944,-96.21027 96.21031,-96.21027 h 64.14017 v 80.17522 h -32.07007 c -17.70272,0 -32.0701,-1.66763 -32.0701,16.03505 v 64.14017 h 80.17521 L 380.3519,334.19235 H 332.24676 V 498.5947 C 435.82,466.7653 510.70317,370.62109 510.70317,256.34058 510.70317,115.92856 397.66285,2.89017 257.2508,2.89017 Z"
    />
  </svg>
)

const Instagram = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <linearGradient
      id="SVGID_1_"
      gradientUnits="userSpaceOnUse"
      x1="-46.0041"
      y1="634.1208"
      x2="-32.9334"
      y2="647.1917"
      gradientTransform="matrix(32 0 0 -32 1519 20757)"
    >
      <stop offset="0" stopColor="#FFC107" id="stop2" />
      <stop offset="0.507" stopColor="#F44336" id="stop4" />
      <stop offset="0.99" stopColor="#9C27B0" id="stop6" />
    </linearGradient>
    <path
      fill="url(#SVGID_1_)"
      d="M352,0H160C71.648,0,0,71.648,0,160v192c0,88.352,71.648,160,160,160h192  c88.352,0,160-71.648,160-160V160C512,71.648,440.352,0,352,0z M464,352c0,61.76-50.24,112-112,112H160c-61.76,0-112-50.24-112-112  V160C48,98.24,98.24,48,160,48h192c61.76,0,112,50.24,112,112V352z"
      id="path9"
    />
    <linearGradient
      id="SVGID_2_"
      gradientUnits="userSpaceOnUse"
      x1="-42.2971"
      y1="637.8279"
      x2="-36.6404"
      y2="643.4846"
      gradientTransform="matrix(32 0 0 -32 1519 20757)"
    >
      <stop offset="0" stopColor="#FFC107" id="stop11" />
      <stop offset="0.507" stopColor="#F44336" id="stop13" />
      <stop offset="0.99" stopColor="#9C27B0" id="stop15" />
    </linearGradient>
    <path
      fill="url(#SVGID_2_)"
      d="M256,128c-70.688,0-128,57.312-128,128s57.312,128,128,128s128-57.312,128-128  S326.688,128,256,128z M256,336c-44.096,0-80-35.904-80-80c0-44.128,35.904-80,80-80s80,35.872,80,80  C336,300.096,300.096,336,256,336z"
      id="path18"
    />
    <linearGradient
      id="SVGID_3_"
      gradientUnits="userSpaceOnUse"
      x1="-35.5456"
      y1="644.5793"
      x2="-34.7919"
      y2="645.3331"
      gradientTransform="matrix(32,0,0,-32,1519,20756.48)"
    >
      <stop offset="0" stopColor="#FFC107" id="stop20" />
      <stop offset="0.507" stopColor="#F44336" id="stop22" />
      <stop offset="0.99" stopColor="#9C27B0" id="stop24" />
    </linearGradient>
    <circle
      fill="url(#SVGID_3_)"
      cx="393.60001"
      cy="117.88019"
      r="17.056"
      id="circle27"
    />
  </svg>
)

const IMG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
      fill="#03a9f4"
    />
  </svg>
)

const Gmail = () => (
  <svg x="0px" y="0px" viewBox="0 0 512 512">
    <rect x="64" y="64" fill="#ECEFF1" width="384" height="384" />
    <polygon fill="#CFD8DC" points="256,296.384 448,448 448,148.672 " />
    <path
      fill="#F44336"
      d="M464,64h-16L256,215.616L64,64H48C21.504,64,0,85.504,0,112v288c0,26.496,21.504,48,48,48h16V148.672
	l192,147.68L448,148.64V448h16c26.496,0,48-21.504,48-48V112C512,85.504,490.496,64,464,64z"
    />
  </svg>
)

const Whatsapp = () => (
  <svg x="0px" y="0px" viewBox="0 0 24 24">
    <path
      fill="#00b309"
      d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"
    />
  </svg>
)
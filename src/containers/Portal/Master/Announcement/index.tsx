import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/client"
import { TAnnouncement } from "../../../../types/announcement"
import { PORTAL_ANNOUNCEMENT_LIST } from "../../../../graphql/announcement.graphql"
import BannerUploader from "../../../../components/elements/BannerUploader/BannerUploader"

const Book: React.FC = () => {
  const [popupDelete, setPopupDelete] = useState(false)
  const [deleteData, setDeleteData] = useState<{ id: string;}>({ id: ""})
  type TResAnnouncement = {
    announcements: TAnnouncement[]
  }

  const { data, error, loading, refetch } = useQuery<TResAnnouncement>(PORTAL_ANNOUNCEMENT_LIST)


  // const createData = (id: string, no: string, secureUrl: string) => ({ id, no, secureUrl});


  // const dataTable = useMemo(() => {
  //   const rows = data?.announcements?.map((val, idx) => {
  //     return createData(
  //       val?.id,
  //       String(idx + 1),
  //       val?.secureUrl,
  //       <Action>
  //         <Button onClick={(e) => onClickDelete(e, {id: val?.id})}><XIcon /></Button>
  //       </Action>
  //     );
  //   }, []);
  //   return { rows };
  // }, [data]);


  return (
    <Main>
      <p className="title">Portal - Announncement</p>
      <Upload>
        <BannerUploader onChange={undefined} />
      </Upload>
     
     
    </Main>
  )
}

export default Book

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  >p.title {
    font-size: 20px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors?.text?.dark};
  }
`

const Upload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Action = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  gap: 5px;
  > button.MuiButton-root {
    min-width: auto;
    min-height: auto;
    height: fit-content;
    padding: 5px;
    border-radius: 100%;
    margin: 0;
    
    color: ${({ theme }) => theme?.colors?.text?.ultraSoft};
    :hover {
      background: ${({ theme }) => theme?.colors?.red?.["09"]};
    }
    > svg {
      height: 20px;
      path{
        stroke-width: 40px;
      }
      rect, path {
        fill: ${({ theme }) => theme?.colors?.text?.ultraSoft};
      }
    }
  }
  > button.MuiButton-root:nth-child(1) {
    background: ${({ theme }) => theme?.colors?.primary?.default};
  }
  > button.MuiButton-root:nth-child(2) {
    background: ${({ theme }) => theme?.colors?.red?.["07"]};
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 30px 20px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  border-radius: 15px;
  gap: 20px;
  > div.action {
    display: flex;
  }
  
  .MuiButton-startIcon {
    height: 17px;
  }
`
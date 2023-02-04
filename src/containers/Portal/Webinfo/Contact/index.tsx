import { Button } from "@mui/material"
import React, { useMemo, useState } from "react"
import styled from "styled-components"
import PopupUpdate from "../../../../components/Popups/PopupUpdateBook"
import TableComponent from "../../../../components/Tables/TableComponent"
import { useQuery } from "@apollo/client"
import { TContact } from "../../../../types/contact"
import { CONTACT } from "../../../../graphql/contact.graphql"

const Contact: React.FC = () => {
  type TResContact = {
    contact: TContact[]
  }

  const [updateData, setUpdateData] = useState<TContact | null>(null)
  const [popupUpdate, setPopupUpdate] = useState(false)
  

  const { data, error, loading, refetch } = useQuery<TResContact>(CONTACT)

  const onClickUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: TContact) => {
    e.stopPropagation()
    setUpdateData(data)
    setPopupUpdate(true)
  }
  const createData = (id: string, no: string, whatsApp: string, facebook: string, instagram: string, email: string, twitter: string, action: any) => ({ id, no, whatsApp, facebook, instagram, email, twitter , action });

  const dataTable = useMemo(() => {
    const columns = [
      { id: "id", label: "id", width: "auto", align: "left", display: "hidden" },
      { id: "no", label: "No", width: "10px", align: "left" },
      { id: "whatsApp", label: "whatsApp", width: "auto", align: "left" },
      { id: "facebook", label: "Facebook", width: "auto", align: "left" },
      { id: "instagram", label: "Instagram", width: "auto", align: "left" },
      { id: "email", label: "Email", width: "auto", align: "left" },
      { id: "twitter", label: "Twitter", width: "auto", align: "left" },
      { id: "action", label: "Action", width: "0", align: "center" },
    ];
    const rows = data?.contact?.map((val, idx) => {
      return createData(
        val?.id,
        String(idx + 1),
        val?.whatsApp,
        val?.facebook,
        val?.instagram,
        val?.email,
        val?.twitter,
        <Action>
          <Button onClick={(e) => onClickUpdate(e, val)}><EditIcon /></Button>
        </Action>
      );
    }, []);
    return { columns, rows };
  }, [data]);


  const onCloseUpdateBook = () => {
    setPopupUpdate(false)
  }

  return (
    <Main>
      <PopupUpdate open={popupUpdate} onClickClose={onCloseUpdateBook} data={updateData!} refetch={refetch}/>
      <p className="title">Portal - Contact</p>
      <Content>
        <TableComponent dataTable={dataTable} loading={loading}  maxHeight="600px" />
      </Content>
    </Main>
  )
}

export default Contact;

const EditIcon = () => (<svg viewBox="0 0 512 512"><title>Pencil</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="44" d="M358.62 129.28L86.49 402.08 70 442l39.92-16.49 272.8-272.13-24.1-24.1zM413.07 74.84l-11.79 11.78 24.1 24.1 11.79-11.79a16.51 16.51 0 000-23.34l-.75-.75a16.51 16.51 0 00-23.35 0z"/></svg>)

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
import { Button } from "@mui/material"
import React, { useMemo, useState } from "react"
import styled from "styled-components"
import ButtonComp from "../../../../components/elements/Button"
import PopupAddCategory from "../../../../components/Popups/PopupAddCategory"
import PopupDelete from "../../../../components/Popups/PopupDeleteCategory"
import PopupUpdate from "../../../../components/Popups/PopupUpdateCategory"
import TableComponent from "../../../../components/Tables/TableComponent"
import { BOOKCATEGORIES } from "../../../../graphql/category.graphql"
import { useQuery } from "@apollo/client"
import { TCategory } from "../../../../types/category"

const Category: React.FC = () => {
  const [popupDelete, setPopupDelete] = useState(false)
  const [popupAdd, setPopupAdd] = useState(false)
  const [popupUpdate, setPopupUpdate] = useState(false)
  const [deleteData, setDeleteData] = useState<{ id: string; name: string; }>({ id: "", name: "" })
  const [updateData, setUpdateData] = useState<{ id: string; name: string; }>({ id: "", name: "" })
  type TResCategory = {
    bookcategories: TCategory[]
  }

  const { data, error, loading, refetch } = useQuery<TResCategory>(BOOKCATEGORIES)

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: { id: string; name: string; }) => {
    e.stopPropagation()
    setPopupDelete(true)
    setDeleteData(data)
  }

  const onClickUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: { id: string; name: string; }) =>{
    setUpdateData(data)
    setPopupUpdate(true)
  }

  const createData = (id: string, no: string, name: string, action: any) => ({ id, no, name, action });

  const dataTable = useMemo(() => {
    const columns = [
      { id: "id", label: "id", width: "auto", align: "left", display: "hidden" },
      { id: "no", label: "No", width: "10px", align: "left" },
      { id: "name", label: "Category", width: "auto", align: "left" },
      { id: "action", label: "Action", width: "0", align: "center" },
    ];
    const rows = data?.bookcategories?.map((val, idx) => {
      return createData(
        val?.id,
        String(idx + 1),
        val?.name,
        <Action>
          
          <Button onClick={(e) => onClickUpdate(e, { id: val?.id, name: val?.name })}><EditIcon /></Button>
          <Button onClick={(e) => onClickDelete(e, { id: val?.id, name: val?.name })}><XIcon /></Button>
        </Action>
      );
    }, []);
    return { columns, rows };
  }, [data]);

  const onCloseAddBook = () => {
    setPopupAdd(false)
  }
  const onCloseDeleteBook = () => {
    setPopupDelete(false)
  }

  const onCloseUpdateBook = () => {
    setPopupUpdate(false)
  }

  return (
    <Main>
      <PopupDelete open={popupDelete} onClickClose={onCloseDeleteBook} data={deleteData} refetch={refetch} />
      <PopupUpdate open={popupUpdate} onClickClose={onCloseUpdateBook} data={updateData} refetch={refetch} />
      <PopupAddCategory open={popupAdd} onClickClose={onCloseAddBook} refetch={refetch}/>
      <p className="title">Portal - Category</p>
      <Content>
        <div className="action">
          <ButtonComp label="ADD" startIcon={<PlusIcon />} onClick={() => setPopupAdd(true)} />
        </div>
        <TableComponent dataTable={dataTable} loading={loading}  maxHeight="600px" />
      </Content>
    </Main>
  )
}

export default Category

const XIcon = () => (<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M368 368L144 144M368 144L144 368" /></svg>)
const PlusIcon = () => (<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="54" d="M256 112v288M400 256H112" /></svg>)
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
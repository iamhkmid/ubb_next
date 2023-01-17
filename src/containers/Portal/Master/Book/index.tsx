import { Button } from "@mui/material"
import React, { useMemo, useState } from "react"
import styled from "styled-components"
import ButtonComp from "../../../../components/elements/Button"
import PopupAddBook from "../../../../components/Popups/PopupAddBook"
import PopupDelete from "../../../../components/Popups/PopupDelete"
import TableComponent from "../../../../components/Tables/TableComponent"
import useQuery from "../../../../hooks/useQuery"
import { TBook } from "../../../../types/book"

const Book: React.FC = () => {
  const [popupDelete, setPopupDelete] = useState(false)
  const [popupAdd, setPopupAdd] = useState(false)
  const [deleteData, setDeleteData] = useState<{ id: string; title: string; }>({ id: "", title: "" })
  type TResBook = {
    statusCode: string;
    data: TBook[]
  }

  const { data, error, loading, refetch } = useQuery<TResBook>({
    method: "GET",
    url: "/api/book"
  })

  const onClickDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: { id: string; title: string; }) => {
    e.stopPropagation()
    setPopupDelete(true)
    setDeleteData(data)
  }

  const createData = (id: string, no: string, title: string, authorName: string, action: any) => ({ id, no, title, authorName, action });

  const dataTable = useMemo(() => {
    const columns = [
      { id: "id", label: "id", width: "auto", align: "left", display: "hidden" },
      { id: "no", label: "No", width: "auto", align: "left" },
      { id: "title", label: "Title", width: "auto", align: "left" },
      { id: "authorName", label: "Author Name", width: "auto", align: "left" },
      { id: "action", label: "Action", width: "0", align: "center" },
    ];
    const rows = data?.data?.map((val, idx) => {
      return createData(
        val?.id,
        String(idx + 1),
        val?.title,
        val?.authorName,
        <Action>
          <Button onClick={(e) => onClickDelete(e, { id: val?.id, title: val?.title })}><XIcon /></Button>
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

  return (
    <Main>
      <PopupDelete open={popupDelete} onClickClose={onCloseDeleteBook} data={deleteData} refetch={refetch} />
      <PopupAddBook open={popupAdd} onClickClose={onCloseAddBook} refetch={refetch}/>
      <p className="title">Portal - Book</p>
      <Content>
        <div className="action">
          <ButtonComp label="ADD" startIcon={<PlusIcon />} onClick={() => setPopupAdd(true)} />
        </div>
        <TableComponent dataTable={dataTable} loading={loading} checkbox maxHeight="600px" />
      </Content>
    </Main>
  )
}

export default Book

const XIcon = () => (<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M368 368L144 144M368 144L144 368" /></svg>)
const PlusIcon = () => (<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="54" d="M256 112v288M400 256H112" /></svg>)

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
  .MuiButton-root {
    min-width: auto;
    min-height: auto;
    height: fit-content;
    padding: 5px;
    border-radius: 100%;
    margin: 0;
    background: ${({ theme }) => theme?.colors?.red?.["07"]};
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
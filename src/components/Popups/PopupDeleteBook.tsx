import { Backdrop, Button, Fade, Modal } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';
import useMutation from '../../hooks/useMutation';
import { TMutationDeleteBook } from '../../types/book';
import ButtonComp from '../elements/Button';
import { FacebookCircularProgress } from '../Loading/LoadingWrapper';

type TPopupDelete = {
  open: boolean;
  onClickClose: () => void;
  data: { title: string; id: string; };
  refetch: (p?: any) => void;
}

const PopupDelete: FC<TPopupDelete> = ({ open, onClickClose, data, refetch }) => {
  const { data: dataDelete, error, loading, mutation } = useMutation<TMutationDeleteBook>({ method: "DELETE", url: "/api/book" })

  React.useEffect(() => {
    if (dataDelete?.data?.id) {
      onClickClose()
      refetch()
    }
  }, [dataDelete])

  const onClickDelete = () => {
    mutation({
      body: {
        bookId: data?.id
      }
    })
  }

  return (
    <StyledModal
      open={open}
    >
      <Fade in={open} unmountOnExit>
        <ContentWrapper>
          <div className="head"><p>Delete Confirmation</p><Button color="error" onClick={onClickClose}><CloseIcon /></Button></div>
          <div className="content">
            <div><p>ID</p><p>{data?.id || "-"}</p></div>
            <div><p>Title</p><p>{data?.title || "-"}</p></div>
          </div>
          <div className="footer">
            <ButtonComp label="Delete" className="delete" variant="contained" onClick={onClickDelete} startIcon={loading && <FacebookCircularProgress size={20} thickness={3} />} disabled={loading} />
            <ButtonComp label="Cancel" variant="outlined" onClick={onClickClose} disabled={loading} />
          </div>
        </ContentWrapper>
      </Fade>
    </StyledModal>
  );
};

export default PopupDelete;

const CloseIcon = () => (<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368" /></svg>)

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    outline: none;
  }
  .MuiBackdrop-root  {
    background: #070814ba;
  } 
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  background: #FFFFFF;
  border: 1px solid #BCC8E7;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 10px;
  gap: 10px;
  >div.head{
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: space-between;
    > p {
      padding-left: 10px;
      line-height: 1;
      font-size: 16px;
      font-weight: 500;
      margin: 0;
    }
    .MuiButton-root{
      padding: 2px;
      border-radius: 100%;
      min-width: fit-content;
      color: ${({ theme }) => theme?.colors?.red?.["07"]};
      > svg {
        height: 30px;
        color: ${({ theme }) => theme?.colors?.red?.["07"]};
        path {
          stroke-width: 30px;
        }
      }
    }
  }
  >div.content {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 20px;
    background: ${({ theme }) => theme?.colors?.primary?.ultrasoft};
    border-radius: 5px;
    padding: 10px 20px;
    margin: 0 10px;
    > div {
      display: flex;
      align-items: center;
      gap: 10px;
      >p:nth-child(1) {
        margin: 0;
        font-weight: 600;
        font-size: 15px;
        color: #2B2F3C;
        line-height: 1.2;
      }
      >p:nth-child(2) {
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        color: #2B2F3C;
        line-height: 1.2;
      }
    }
  }
  >div.footer {
    display: flex;
    width: 100%;
    padding: 15px;
    gap: 10px;
    .MuiButton-root.delete {
      width: fit-content;
      background: ${({ theme }) => theme?.colors?.red?.["07"]};
    }
    .MuiButton-root {
      width: fit-content;
    }
    .MuiButton-root.Mui-disabled {
      background: ${({ theme }) => theme?.colors?.primary?.Soft};
    }
  }
`;

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Fade, Modal } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import ButtonComp from '../elements/Button'
import * as yup from "yup"
import InputText from '../elements/Input/Input'
import { useMutation } from '@apollo/client'
import { FacebookCircularProgress } from "../Loading/LoadingWrapper"
import { useQuery } from '@apollo/client'
import { TFooterInfo, TFormUpdateFooter, TMutationUpdateFooter, TUpdateFooter } from '../../types/footer'
import { FOOTER_INFO, PORTAL_INIT_FOOTER_UPDATE, UPDATE_FOOTER_INFO } from '../../graphql/footer.graphql'
import { useSnackbar } from 'notistack'


type TPopupDelete = {
  open: boolean;
  data: { id: string | null };
  onClickClose: () => void;
  refetch: () => void;
}

const PopupUpdateFooter: FC<TPopupDelete> = (props) => {
  type TResContact = { footerInfo: TFooterInfo[] }

  const { data: dataInit, refetch, loading: loadInit } = useQuery<TResContact>(PORTAL_INIT_FOOTER_UPDATE, {
    variables: { footerInfoId: props.data?.id! },
    skip: !props.data?.id || !props.open,
    fetchPolicy: "network-only",

  })

  useEffect(() => {
    if (props.open) {
      refetch({ id: props.data.id })
    }
  }, [props.open])

  const defaultValues = React.useMemo(() => ({
    value: dataInit?.footerInfo?.find((_, idx) => idx === 0)?.value,
  }), [dataInit]);

  return (
    <StyledModal open={props.open}>
      <Fade in={props.open} unmountOnExit>
        <Content>
          <div className="head"><p>Update Data</p><Button color="error" onClick={props.onClickClose}><CloseIcon /></Button></div>
          {loadInit && <div className="loading-wrapper"><FacebookCircularProgress size={50} thickness={4} /></div>}
          <Fade in={props.open && !!dataInit?.footerInfo && !loadInit} unmountOnExit>
            <div>
              <FormData {...props} defaultValues={defaultValues} />
            </div>
          </Fade>
        </Content>
      </Fade>
    </StyledModal>

  );
};

type TFormdata = {
  defaultValues: TUpdateFooter;
  open: boolean;
  data: { id: string | null };
  onClickClose: () => void;
}

const FormData: FC<TFormdata> = ({ open, onClickClose, defaultValues, data }) => {
  const { enqueueSnackbar } = useSnackbar()

  React.useEffect(() => {
    if (open) {
      reset()
    }
  }, [open])


  const { handleSubmit, watch, control, formState, setValue, reset } = useForm<TFormUpdateFooter>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const { isValid } = formState;

  const [updateContact, { data: dataUpdate, error, loading }] = useMutation<TMutationUpdateFooter>(UPDATE_FOOTER_INFO, {
    errorPolicy: "all",
    refetchQueries: [
      { query: FOOTER_INFO }
    ],
    awaitRefetchQueries: true
  })

  React.useEffect(() => {
    if (dataUpdate?.updateFooterInfo) {
      enqueueSnackbar("Data updated successfully", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "left" }, autoHideDuration: 4000 })
      onClickClose()
    }
  }, [dataUpdate])

  
  React.useEffect(() => {
    if (error)
      enqueueSnackbar(error?.message || "Something went wrong", { variant: "error", anchorOrigin: { vertical: "bottom", horizontal: "left" }, autoHideDuration: 4000 })
  }, [error])

  const onSubmit = async (values: TFormUpdateFooter) => {
    try {
      await updateContact({
        variables: {
          data: { ...values, footerInfoId: data.id }
        }
      });
    } catch (error) { }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <div className="input-form">
        <Controller
          name="value"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <InputText
              type="text"
              placeholder="Enter URL here.."
              value={value}
              error={!!error}
              helperText={error?.message!}
              label="Value"
              width="100%"
              onChange={onChange}
              id="url"
              disabled={loading}
            />
          )}
        />
      </div>
      <div className="footer">
        <ButtonComp label="Update" type="submit" variant="contained" startIcon={loading && <FacebookCircularProgress size={20} thickness={3} />} disabled={loading || !isValid} />
        <ButtonComp label="Cancel" variant="outlined" onClick={onClickClose} disabled={loading} />
      </div>
    </Form>
  )
}

export default PopupUpdateFooter

const validationSchema =
  yup.object({
    value: yup.string().required("Required"),
  })

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
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  background: #FFFFFF;
  border: 1px solid #BCC8E7;
  box-sizing: border-box;
  border-radius: 15px;
  padding: 10px;
  gap: 10px;
  > div.loading-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 400px;
  }
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
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  >div.input-form {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 20px;
    border-radius: 5px;
    padding: 10px 20px;
    margin: 0 10px;
    max-height: 80vh;
    overflow-y: auto;
  }
  >div.footer {
    display: flex;
    width: 100%;
    padding: 15px;
    gap: 10px;
    & .MuiButton-root:nth-child(1) {
      width: fit-content;
    }
    & .MuiButton-root:nth-child(2) {
      width: fit-content;
    }
  }
  @media screen and (max-width: 1200px) {
    width: 95vw;
  }
  @media screen and (max-width: 900px) {
    width: 95vw;
  }
  @media screen and (max-width: 600px) {
    width: 98vw;
  }
`;
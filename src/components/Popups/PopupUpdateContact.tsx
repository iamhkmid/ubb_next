import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Fade, Modal } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import ButtonComp from '../elements/Button'
import * as yup from "yup"
import InputText from '../elements/Input/Input'
import { useMutation } from '@apollo/client'
import { FacebookCircularProgress } from "../../components/Loading/LoadingWrapper"
import { useQuery } from '@apollo/client'
import { TContact, TFormUpdateContact, TMutationUpdateContact, TUpdateContact } from '../../types/contact'
import { CONTACTS, PORTAL_INIT_CONTACT_UPDATE, UPDATECONTACT } from '../../graphql/contact.graphql'


type TPopupDelete = {
  open: boolean;
  data: { id: string | null };
  onClickClose: () => void;
  refetch: () => void;
}

const PopupUpdateContact: FC<TPopupDelete> = (props) => {
  type TResContact = { contact: TContact }

  const { data: dataInit, refetch, loading: loadInit } = useQuery<TResContact>(PORTAL_INIT_CONTACT_UPDATE, {
    variables: { contactId: props.data?.id! },
    skip: !props.data?.id || !props.open,
    fetchPolicy: "network-only",

  })

  useEffect(() => {
    if (props.open) {
      refetch({ id: props.data.id })
    }
  }, [props.open])


  const defaultValues = React.useMemo(() => ({
    url: dataInit?.contact?.url,
  }), [dataInit]);

  return (
    <StyledModal open={props.open}>
      <Fade in={props.open} unmountOnExit>
        <Content>
          <div className="head"><p>Update Data</p><Button color="error" onClick={props.onClickClose}><CloseIcon /></Button></div>
          {loadInit && <div className="loading-wrapper"><FacebookCircularProgress size={50} thickness={4}/></div>}
          <Fade in={props.open && !!dataInit?.contact && !loadInit} unmountOnExit>
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
  defaultValues: TUpdateContact;
  open: boolean;
  data: { id: string | null };
  onClickClose: () => void;
}

const FormData: FC<TFormdata> = ({ open, onClickClose, defaultValues, data }) => {


  React.useEffect(() => {
    if (open) {
      reset()
    }
  }, [open])


  const { handleSubmit, watch, control, formState, setValue, reset } = useForm<TFormUpdateContact>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const { isValid } = formState;

  const [updateContact, { data: dataUpdate, error, loading }] = useMutation<TMutationUpdateContact>(UPDATECONTACT, {
    errorPolicy: "all",
    refetchQueries: [
      {query: CONTACTS}
    ], 
    awaitRefetchQueries: true
  })

  React.useEffect(() => {
    if (dataUpdate?.updateContact) {
      onClickClose()
    }
  }, [dataUpdate])

  const onSubmit = async (values: TFormUpdateContact) => {
    try {
      await updateContact({
        variables: {
          data: { ...values, contactId: data.id }
        }
      });
    } catch (error) { }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
          
          <div className="input-form">
            <FormWrapper>
              <div className="section">
                <Controller
                  name="url"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <InputText
                      type="text"
                      placeholder="Enter URL here.."
                      value={value}
                      error={!!error}
                      helperText={error?.message!}
                      label="URL"
                      width="100%"
                      onChange={onChange}
                      id="url"
                      disabled={loading}
                    />
                  )}
                />
              </div>
            </FormWrapper>
          </div>
          <div className="footer">
            <ButtonComp label="Update" type="submit" variant="contained" startIcon={loading && <FacebookCircularProgress size={20} thickness={3} />} disabled={loading || !isValid} />
            <ButtonComp label="Cancel" variant="outlined" onClick={onClickClose} disabled={loading} />
          </div>
        </Form>
  )
}

export default PopupUpdateContact;

const validationSchema =
  yup.object({
    url: yup.string().required("Required"),
  });



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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
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

const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  width: 100%;
  > div.section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

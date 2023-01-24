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
import { TCategory, TDefaultValueUpdateCategory, TFormAddCategory, TMutationUpdateBookCategory } from '../../types/category'
import { BOOKCATEGORIES, PORTAL_INIT_CATEGORY_UPDATE, UPDATEBOOKCATEGORY } from '../../graphql/category.graphql'


type TPopupDelete = {
  open: boolean;
  data: { id: string | null };
  onClickClose: () => void;
}

const PopupUpdateBookCategory: FC<TPopupDelete> = (props) => {
  type TResCategory = { bookCategory: TCategory }

  const { data: dataInit, refetch, loading: loadInit } = useQuery<TResCategory>(PORTAL_INIT_CATEGORY_UPDATE, {
    variables: { categoryId: props.data?.id! },
    skip: !props.data?.id || !props.open,
    fetchPolicy: "network-only",

  })

  useEffect(() => {
    if (props.open) {
      refetch({ categoryId: props.data.id })
    }
  }, [props.open])


  const defaultValues = React.useMemo(() => ({
    name: dataInit?.bookCategory?.name,
  }), [dataInit]);

  return (
    <StyledModal open={props.open}>
      <Fade in={props.open} unmountOnExit>
        <Content>
          <div className="head"><p>Update Data</p><Button color="error" onClick={props.onClickClose}><CloseIcon /></Button></div>
          {loadInit && <div className="loading-wrapper"><FacebookCircularProgress size={50} thickness={4}/></div>}
          <Fade in={props.open && !!dataInit?.bookCategory && !loadInit} unmountOnExit>
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
  defaultValues: TDefaultValueUpdateCategory;
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


  const { handleSubmit, watch, control, formState, setValue, reset } = useForm<TFormAddCategory>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const { isValid } = formState;

  const [updateBookCategory, { data: dataUpdate, error, loading }] = useMutation<TMutationUpdateBookCategory>(UPDATEBOOKCATEGORY, {
    errorPolicy: "all",
    refetchQueries: [
      {query: BOOKCATEGORIES}
    ], 
    awaitRefetchQueries: true
  })

  React.useEffect(() => {
    if (dataUpdate?.updateBookCategory) {
      onClickClose()
    }
  }, [dataUpdate])

  const onSubmit = async (values: TFormAddCategory) => {
    try {
      await updateBookCategory({
        variables: {
          data: { ...values, categoryId: data.id }
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
                  name="name"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <InputText
                      type="text"
                      placeholder="Enter Category here.."
                      value={value}
                      error={!!error}
                      helperText={error?.message!}
                      label="Category"
                      width="100%"
                      onChange={onChange}
                      id="name"
                      disabled={loading}
                    />
                  )}
                />
              </div>
            </FormWrapper>
          </div>
          <div className="footer">
            <ButtonComp label="ADD" type="submit" variant="contained" startIcon={loading && <FacebookCircularProgress size={20} thickness={3} />} disabled={loading || !isValid} />
            <ButtonComp label="Cancel" variant="outlined" onClick={onClickClose} disabled={loading} />
          </div>
        </Form>
  )
}

export default PopupUpdateBookCategory;

const validationSchema =
  yup.object({
    name: yup.string().required("Required"),
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

const InputGroup = styled.div`
  display: flex;
  gap: 15px;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`

const CoverInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > p {
    font-size: 13px;
    font-weight: 500;
    margin: 0;
    line-height: 1;
    color: ${({ theme }) => theme?.colors?.text?.darkGrey}
  }
`
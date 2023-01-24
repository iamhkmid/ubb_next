import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Fade, Modal } from '@mui/material'
import React, { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import ButtonComp from '../elements/Button'
import * as yup from "yup"
import InputText from '../elements/Input/Input'
import { TFormAddCategory, TMutationAddBookCategory, TMutationUpdateBookCategory } from '../../types/category'
import { FacebookCircularProgress } from "../../components/Loading/LoadingWrapper"
import { useMutation } from '@apollo/client'
import { ADDBOOKCATEGORY, UPDATEBOOKCATEGORY } from '../../graphql/category.graphql'
import Category from '../../containers/Portal/Master/Category'

type TPopupDeleteCategory = {
  open: boolean;
  onClickClose: () => void;
  data: {  id: string; name: string; };
  refetch: (p?: any) => void;
}

const PopupUpdateBookCategory: FC<TPopupDeleteCategory> = ({ open, onClickClose, data, refetch }) => {

  React.useEffect(() => {
    if (open) {
      reset()
    }
  }, [open])

  const defaultValues = {
    name: data?.name,
  };


  const { handleSubmit, watch, control, formState, setValue, reset } = useForm<TFormAddCategory>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues
  });
  const { isValid } = formState;

  const [updateBookCategory, { data: datares, error, loading}] = useMutation<TMutationUpdateBookCategory>(UPDATEBOOKCATEGORY, {
    errorPolicy: "all",
    fetchPolicy: 'network-only'
  })


  React.useEffect(() => {
    if (datares?.updateBookCategory) {
      onClickClose()
      refetch()
    }
  }, [datares])

  const onSubmit = async (values: TFormAddCategory) => {
    try {
      await updateBookCategory({
        variables: {
          data: {
            categoryId : data.id,
            name: values.name
          }
        }
      });
    } catch (error) { }
  }


  return (
    <StyledModal open={open}>
      <Fade in={open} unmountOnExit>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="head"><p>Update Category</p><Button color="error" onClick={onClickClose}><CloseIcon /></Button></div>
          <div className="content">
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
            <ButtonComp label="Update" type="submit" variant="contained" startIcon={loading && <FacebookCircularProgress size={20} thickness={3} />} disabled={loading || !isValid} />
            <ButtonComp label="Cancel" variant="outlined" onClick={onClickClose} disabled={loading} />
          </div>
        </Form>
      </Fade>
    </StyledModal>
  );
};



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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
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
      padding-left: 16px;
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
    border-radius: 5px;
  
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
  grid-template-columns: 1fr;
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

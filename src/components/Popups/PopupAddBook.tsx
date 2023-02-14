import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Fade, Modal } from '@mui/material'
import React, { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import ButtonComp from '../elements/Button'
import * as yup from "yup"
import InputText from '../elements/Input/Input'
import FileUploader from '../elements/FileUploader/FileUploader'
import { useMutation, useQuery } from '@apollo/client'
import { TFormAddBook, TMutationAddBook } from '../../types/book'
import { FacebookCircularProgress } from "../../components/Loading/LoadingWrapper"
import { ADDBOOK } from '../../graphql/book.graphql'
import useMutationApi from '../../hooks/useMutation'
import Dropdown from '../elements/Dropdown/Dropdown'
import { BOOKCATEGORIES } from '../../graphql/category.graphql'
import { TQueryBookCategory } from '../../types/category'
import { useSnackbar } from 'notistack'
import PopupAddCategory from './PopupAddCategory'

type TPopupAddBook = {
  open: boolean;
  onClickClose: () => void;
  refetch: (p?: any) => void;
}

type TResUploadFile = {
  statusCode: string;
  data: { id: string; type: string; publicId: string; url: string; secureUrl: string; },
  message: string;
}

const PopupAddBook: FC<TPopupAddBook> = (props) => {

  return (
    <StyledModal open={props.open}>
      <Fade in={props.open}>
        <Content>
          <div className="head"><p>Add Book Data</p><Button color="error" onClick={props.onClickClose}><CloseIcon /></Button></div>
          <FormData {...props} />
        </Content>
      </Fade>
    </StyledModal>
  );
};

type TFormdata = { open: boolean; onClickClose: () => void; refetch: () => void }

const FormData: FC<TFormdata> = ({ open, onClickClose, refetch }) => {
  const [popupAddCategory, setPopupAddCategory] = React.useState(false)

  React.useEffect(() => { if (open) reset() }, [open])
  const { enqueueSnackbar } = useSnackbar()

  const { data: dataCategories, refetch: refetchCategories } = useQuery<TQueryBookCategory>(BOOKCATEGORIES)

  const categoryOptions = React.useMemo(() => dataCategories?.bookCategories?.map((val) => ({ value: val?.id, label: val?.name })), [dataCategories])

  const { data: dataUploadFile, loading: loadUploadFile, mutation, error: errorUploadFile } = useMutationApi<TResUploadFile>({
    url: "/upload/book-image",
    method: "POST"
  })

  const { handleSubmit, watch, control, formState, setValue, reset } = useForm<TFormAddBook>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues
  });

  const [addBook, { data, error, loading }] = useMutation<TMutationAddBook>(ADDBOOK, {
    errorPolicy: "all",
    fetchPolicy: 'network-only'
  })

  React.useEffect(() => {
    if (error)
      enqueueSnackbar(error?.message || "Something went wrong", { variant: "error", anchorOrigin: { vertical: "bottom", horizontal: "left" }, autoHideDuration: 4000 })
  }, [error])

  React.useEffect(() => {
    if (errorUploadFile)
      enqueueSnackbar("Cover failed to upload", { variant: "error", anchorOrigin: { vertical: "bottom", horizontal: "left" }, autoHideDuration: 4000 })
  }, [errorUploadFile])

  React.useEffect(() => {
    if (data && (dataUploadFile || errorUploadFile)) {
      refetch()
      enqueueSnackbar("Book added successfully", { variant: "success", anchorOrigin: { vertical: "bottom", horizontal: "left" }, autoHideDuration: 4000 })
      onClickClose()
    }
  }, [data, dataUploadFile, errorUploadFile])

  const onSubmit = async (values: TFormAddBook) => {
    const { cover, ...rest } = values
    try {
      const dataAddBook = await addBook({ variables: { data: rest } });
      if (dataAddBook.data?.addBook) mutation({
        body: {
          type: "CREATE",
          data: { bookId: dataAddBook.data?.addBook?.id, type: "COVER", file: cover }
        }
      })
    } catch (error) { }
  }

  const onClickClosePCategory = () => {
    setPopupAddCategory(false)
  }

  return (
    <>
      <PopupAddCategory open={popupAddCategory} onClickClose={onClickClosePCategory} refetch={refetchCategories} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-form">
          <FormWrapper>
            <div className="section">
              <Controller
                name="title"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputText
                    type="text"
                    placeholder="Enter Title here.."
                    value={value}
                    error={!!error}
                    helperText={error?.message!}
                    label="Title"
                    width="100%"
                    onChange={onChange}
                    id="title"
                    disabled={loading || loadUploadFile}
                  />
                )}
              />
              <Controller
                name="authorName"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputText
                    type="text"
                    placeholder="Enter Author Name here.."
                    value={value}
                    error={!!error}
                    helperText={error?.message!}
                    label="Author Name"
                    width="100%"
                    onChange={onChange}
                    id="authorName"
                    disabled={loading || loadUploadFile}
                  />
                )}
              />
              <InputGroup className="with-button">
                <Controller
                  name="categoryIds"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <Dropdown
                      placeholder="Choose Categories.."
                      value={value}
                      type="MULTIPLE"
                      error={!!error}
                      helperText={error?.message!}
                      label="Categories"
                      width="100%"
                      onChange={onChange}
                      options={categoryOptions}
                      disabled={loading || loadUploadFile}
                    />
                  )}
                />
                <ButtonComp label={<PlusIcon />} variant="contained" onClick={() => setPopupAddCategory(true)} disabled={loading || loadUploadFile}/>
              </InputGroup>
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputText
                    type="textArea"
                    placeholder="Enter Description here.."
                    value={value}
                    error={!!error}
                    helperText={error?.message!}
                    label="Description"
                    width="100%"
                    onChange={onChange}
                    id="description"
                    disabled={loading || loadUploadFile}
                  />
                )}
              />
              <InputGroup className="default">
                <Controller
                  name="price"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <InputText
                      type="currency"
                      placeholder="Enter Price here.."
                      value={value}
                      error={!!error}
                      helperText={error?.message!}
                      label="Price"
                      width="100%"
                      onChange={onChange}
                      id="price"
                      disabled={loading || loadUploadFile}
                    />
                  )}
                />
                <Controller
                  name="stock"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <InputText
                      type="numeric"
                      placeholder="Enter Number of Pages here.."
                      value={value}
                      error={!!error}
                      helperText={error?.message!}
                      label="Stock"
                      width="100%"
                      onChange={onChange}
                      id="stock"
                      disabled={loading || loadUploadFile}
                    />
                  )}
                />
              </InputGroup>
              <Controller
                name="isbn"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputText
                    type="text"
                    placeholder="Enter ISBN here.."
                    value={value}
                    error={!!error}
                    helperText={error?.message!}
                    label="ISBN"
                    width="100%"
                    onChange={onChange}
                    id="ISBN"
                    disabled={loading || loadUploadFile}
                  />
                )}
              />
            </div>
            <div className="section">
              <Controller
                name="publisher"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <InputText
                    type="text"
                    placeholder="Enter Publisher here.."
                    value={value}
                    error={!!error}
                    helperText={error?.message!}
                    label="Publisher"
                    width="100%"
                    onChange={onChange}
                    id="publisher"
                    disabled={loading || loadUploadFile}
                  />
                )}
              />
              <InputGroup className="default">
                <Controller
                  name="printType"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <InputText
                      type="text"
                      placeholder="Enter Print Type here.."
                      value={value}
                      error={!!error}
                      helperText={error?.message!}
                      label="Print Type"
                      width="100%"
                      onChange={(e) => onChange(e.target.value)}
                      id="printType"
                      disabled={loading || loadUploadFile}
                    />
                  )}
                />
                <Controller
                  name="numberOfPages"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <InputText
                      type="numeric"
                      placeholder="Enter Number of Pages here.."
                      value={value}
                      error={!!error}
                      helperText={error?.message!}
                      label="Number Of Pages"
                      width="100%"
                      onChange={onChange}
                      id="numberOfPages"
                      disabled={loading || loadUploadFile}
                    />
                  )}
                />
              </InputGroup>
              <InputGroup className="default">
                <Controller
                  name="publicationYear"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <InputText
                      type="numeric"
                      placeholder="Enter Publication Year Type here.."
                      value={value}
                      maxLength={4}
                      error={!!error}
                      helperText={error?.message!}
                      label="Publication Year"
                      width="100%"
                      onChange={onChange}
                      id="publicationYear"
                      disabled={loading || loadUploadFile}
                    />
                  )}
                />
              </InputGroup>
              <CoverInput>
                <p>Cover File</p>
                <Controller
                  name="cover"
                  control={control}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <FileUploader
                      width="99.9%"
                      onChange={(e) => onChange(e)}
                      herlperText={error?.message}
                      error={!!error}
                    />
                  )}
                />
              </CoverInput>
            </div>
          </FormWrapper>
        </div>
        <div className="footer">
          <ButtonComp label="Save" type="submit" variant="contained" startIcon={(loading || loadUploadFile) && <FacebookCircularProgress size={20} thickness={3} />} disabled={loading || loadUploadFile} />
          <ButtonComp label="Cancel" variant="outlined" onClick={onClickClose} disabled={loading || loadUploadFile} />
        </div>
      </Form>
    </>
  )
}

export default PopupAddBook;

const validationSchema =
  yup.object({
    title: yup.string().required("Required"),
    authorName: yup.string().required("Required"),
    price: yup.number(),
    stock: yup.number(),
    publisher: yup.string().required("Required"),
    description: yup.string().required("Required"),
    printType: yup.string().required("Required"),
    categoryIds: yup.array().of(yup.string()),
    numberOfPages: yup.number().required("Required"),
    publicationYear: yup.number().required("Required").transform((val) => (isNaN(val) ? undefined : val)).integer(),
    isbn: yup.string().required("Required"),
    cover: yup.string().required("Cover is Required")
  });

const defaultValues = {
  title: "",
  authorName: "",
  price: undefined,
  stock: undefined,
  publisher: "",
  description: "",
  printType: "",
  categoryIds: [] as string[],
  numberOfPages: undefined,
  isbn: "",
  cover: undefined
};

const PlusIcon = () => (<svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 112v288M400 256H112" /></svg>)
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
  &.default {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
  }
  &.with-button {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr auto;
    gap: 10px;
    .MuiButton-root {
      width: fit-content;
      min-width: auto;
      padding: 0px;
      height: 35px;
      aspect-ratio: 1/1;
      border-radius: 100%;
      svg{
        width: 20px;
        >path {
          stroke-width: 45px;
          color: ${({ theme }) => theme?.colors?.primary?.ultrasoft};
        }
      }
    }
    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
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
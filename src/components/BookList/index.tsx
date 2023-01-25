import React from "react"
import { useQuery } from "@apollo/client"
import { Fade, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import ButtonComp from "../elements/Button"
import { useRouter } from "next/router"
import { FC, useMemo, useState } from "react"
import styled from "styled-components"
import { PUBLIC_BOOK_LIST } from "../../graphql/book.graphql"
import { TQueryBookHome } from "../../types/book"
import BookCard from "../BookCard"
import Input from "../elements/Input/Input"
import { FacebookCircularProgress } from "../Loading/LoadingWrapper"
import { PUBLIC_BOOK_CATEGORIES } from "../../graphql/category.graphql"
import { TQueryBookCategory } from "../../types/category"
import Checkbox from "../elements/Checkbox"

type TBookList = {}

const BookList: FC<TBookList> = () => {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [minAmount, setMinAmount] = useState<number | string | undefined>(undefined)
  const [maxAmount, setMaxAmount] = useState<number | string | undefined>(undefined)
  const [categoryIds, setCategoryIds] = React.useState<string[]>([]);

  const onClickCategory = (props: { value: string; label: string; }) => () => {
    if (props.value === "ALL") setCategoryIds([])
    else if (categoryIds.includes(props.value)) setCategoryIds((prevState) => prevState.filter((val) => val !== props.value))
    else setCategoryIds((prevState) => ([...prevState, props.value]))
  };

  const onClickReset = () => {
    setMinAmount("")
    setMaxAmount("")
    setCategoryIds([])
    refetch({ filter: { minAmount: undefined, maxAmount: undefined, categoryIds: undefined } })
  }

  const { data, error, loading, refetch } = useQuery<TQueryBookHome>(PUBLIC_BOOK_LIST, {
    refetchWritePolicy: "overwrite",
    notifyOnNetworkStatusChange: true
  })
  const { data: dataCategories, error: errCategories, loading: loadCategories } = useQuery<TQueryBookCategory>(PUBLIC_BOOK_CATEGORIES, { fetchPolicy: "cache-first" })

  const onClickFilter = () => {
    refetch({ filter: { minAmount: minAmount || undefined, maxAmount: maxAmount || undefined, categoryIds: categoryIds.length ? categoryIds : undefined } })
  }

  const categories = useMemo(() => {
    const initCategories = [{ value: "ALL", label: "Semua Kategori" }]
    return [...initCategories, ...(dataCategories?.bookCategories || [])?.map((val) => ({ value: val.id, label: val.name }))]
  }, [dataCategories?.bookCategories])

  const onClickBook = (slug: string) => {
    router.push({ pathname: '/book/[slug]', query: { slug } })
  }

  const filterBook = data?.books?.filter((val) => `${val.title.toLowerCase()} ${val.authorName.toLowerCase()}`.includes(search.toLowerCase()))

  return (
    <Main id="book-list">
      <Filter>
        <CategoryFilter>
          <p className="title">Daftar Kategori</p>
          <List>
            {categories.map((category) => (
              <ListItem disablePadding key={category.value}>
                <ListItemButton onClick={onClickCategory(category)}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={(categoryIds.length === 0 && category.value === "ALL") || categoryIds.includes(category.value)}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': category.label }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={category.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CategoryFilter>
        <NominalFilter>
          <p className="title">Harga</p>
          <div>
            <Input
              type="currency"
              label="Minimal"
              value={minAmount!}
              width="100%"
              placeholder="20.000"
              onChange={setMinAmount}
            />
            <Input
              type="currency"
              label="Maksimal"
              value={maxAmount!}
              width="100%"
              placeholder="50.000"
              onChange={setMaxAmount}
            />
          </div>
        </NominalFilter>
        <div className="button-apply">
          <ButtonComp label="Reset" variant="outlined" onClick={onClickReset} disabled={!categoryIds.length && !minAmount && !maxAmount} />
          <ButtonComp label="Terapkan" onClick={onClickFilter} />
        </div>
      </Filter>
      <Content>
        <div className="search">
          <Input
            type="text"
            value={search}
            width="500px"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan judul/penulis"
          />
          <ButtonComp label="Cari" onClick={onClickFilter} />
        </div>
        <Line />
        <Fade in={!loading && filterBook?.length! > 0} unmountOnExit>
          <div className="books-wrapper">
            {filterBook?.map((book) => (
              <div key={book.id}>
                <BookCard data={book} onClick={() => onClickBook(book.slug)} />
              </div>
            ))}
          </div>
        </Fade>
        {!loading && filterBook?.length === 0 && <NoData>Buku tidak ditemukan</NoData>}
        <Fade in={loading} unmountOnExit>
          <Loading>
            <FacebookCircularProgress size={60} thickness={5} />
          </Loading>
        </Fade>
      </Content>
    </Main>
  )
}

export default BookList

const Main = styled.div`
  display: flex;
  padding: 110px 60px 60px 60px;
  min-height: calc(100vh - 220px);
  gap: 50px;
  >p.title{
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    margin: 0;
    line-height: 1;
  }
`

const Line = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  height: 3px;
  overflow: hidden;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors?.primary?.ultrasoft};
  ::before {
    content: "";
    position: absolute;
    width: 10%;
    height: 100%;
    left: 0;
    top: 0;
    background: #f02f59;
  }
`

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  position: absolute;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 400px;
  position: relative;
  gap: 40px;
  > div.search {
    display: flex;
    gap: 10px;
    justify-content: center;
    position: relative;
  }
  > div.books-wrapper {
    display: grid;
    padding: 10px 0;
    width: 100%;
    gap: 20px;
    grid-template-columns: repeat( auto-fill, minmax(160px, 1fr) );
  }
`

const NoData = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #384048;
`

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  > div.button-apply {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 8px;
  }
`

const CategoryFilter = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 5px;
  background: #fff;
  height: fit-content;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  > p.title {
    margin: 0;
    line-height: 1;
    font-size: 13px;
    padding: 10px;
    font-weight: 500;
    border-bottom: 1px ${({ theme }) => theme?.colors?.text?.ultraSoft} solid;
  }
  .MuiList-root {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 250px;
    max-height: 250px;
    overflow-y: auto;
  }
  .MuiListItem-root {
    padding: 0 5px;
  }
  .MuiListItemButton-root {
    padding: 5px 10px;
    width: 100%;
  }
  .MuiListItemText-primary {
    font-size: 13px;
  }
  .MuiListItemIcon-root {
    min-width: 30px;
  }
`

const NominalFilter = styled.div`
  display: flex;
  background: #fff;
  flex-direction: column;
  width: 250px;
  padding: 5px;
  height: fit-content;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  > p.title {
    margin: 0;
    line-height: 1;
    font-size: 13px;
    padding: 10px;
    font-weight: 500;
    border-bottom: 1px ${({ theme }) => theme?.colors?.text?.ultraSoft} solid;
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 20px; 
    padding: 20px 15px;
    input {
      height: 40px;
      text-align: end;
      ::placeholder { 
        text-align: end;
      }
      :-ms-input-placeholder {
        text-align: end;
      }
      ::-ms-input-placeholder {
        text-align: end;
      }
    }
  }
`

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>Search</title><path d="M456.69 421.39L362.6 327.3a173.81 173.81 0 0034.84-104.58C397.44 126.38 319.06 48 222.72 48S48 126.38 48 222.72s78.38 174.72 174.72 174.72A173.81 173.81 0 00327.3 362.6l94.09 94.09a25 25 0 0035.3-35.3zM97.92 222.72a124.8 124.8 0 11124.8 124.8 124.95 124.95 0 01-124.8-124.8z" /></svg>
)
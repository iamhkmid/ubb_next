import React, { useEffect } from "react"
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
type TQueryObj = { [key: string]: string | number | undefined }
type TOnChangeFilter = (
  p: { type: "MIN_AMOUNT" | "MAX_AMOUNT"; value: string | number | undefined; } | { type: "CATEGORY" | "SEARCH", value: string; }
) => void

const BookExplore: FC<TBookList> = () => {
  const router = useRouter()
  const [search, setSearch] = useState<string>("")
  const [minAmount, setMinAmount] = useState<number | string | undefined>(undefined)
  const [maxAmount, setMaxAmount] = useState<number | string | undefined>(undefined)
  const [categoryIds, setCategoryIds] = React.useState<string[]>([]);
  const [query, setQuery] = React.useState<TQueryObj>(router.query as TQueryObj)

  const { data, error, loading, refetch } = useQuery<TQueryBookHome>(PUBLIC_BOOK_LIST, {
    refetchWritePolicy: "overwrite",
    notifyOnNetworkStatusChange: true
  })

  const { data: dataCategories, error: errCategories, loading: loadCategories } = useQuery<TQueryBookCategory>(
    PUBLIC_BOOK_CATEGORIES,
    {
      skip: !router.query,
      fetchPolicy: "cache-first",
    }
  )

  const onClickFilter = () => {
    Object.keys(query).forEach(key => {
      if (query[key as string] === undefined) delete query[key];
    });
    router.replace({ query })
  }

  useEffect(() => {
    if (router.query) {
      const categories = ((router.query as TQueryObj)["categories"] as string || "").split("+")
      const filter = {
        categoryIds: (dataCategories?.bookCategories || []).filter((cat) => categories.includes(cat.name)).map((cat) => cat.id),
        minAmount: (router.query as TQueryObj)["min"] ? Number((router.query as TQueryObj)["min"]) : "",
        maxAmount: (router.query as TQueryObj)["max"] ? Number((router.query as TQueryObj)["max"]) : "",
        search: (router.query as TQueryObj)["search"] ? (router.query as TQueryObj)["search"] as string : ""
      }
      setCategoryIds(filter.categoryIds)
      setMinAmount(filter.minAmount)
      setMaxAmount(filter.maxAmount)
      setSearch(filter.search)
      refetch({
        options: {
          minAmount: filter.minAmount || undefined,
          maxAmount: filter.maxAmount || undefined,
          categoryIds: filter.categoryIds.length ? filter.categoryIds : undefined,
          search: filter.search || undefined
        }
      })
    }
  }, [router.query, dataCategories])


  const categories = useMemo(() => {
    const initCategories = [{ value: "ALL", label: "Semua Kategori" }]
    return [...initCategories, ...(dataCategories?.bookCategories || [])?.map((val) => ({ value: val.id, label: val.name }))]
  }, [dataCategories?.bookCategories])

  const onChangeFilter: TOnChangeFilter = (params) => {
    switch (params.type) {
      case "CATEGORY": {
        const categories = dataCategories?.bookCategories || []
        let currCats: string[] = []
        if (params.value === "ALL") currCats = []
        else if (categoryIds.includes(params.value)) currCats = categoryIds.filter((val) => val !== params.value)
        else currCats = [...categoryIds, params.value]
        setCategoryIds(currCats)
        setQuery((prevState) => ({
          ...prevState,
          categories: currCats.length ? categories.filter((cat) => currCats.includes(cat.id)).map((cat) => cat.name).join("+") : undefined
        }))
        break
      }
      case "MIN_AMOUNT": {
        setMinAmount(params.value)
        setQuery((prevState) => ({ ...prevState, min: params.value || undefined }))
        break
      }
      case "MAX_AMOUNT": {
        setMaxAmount(params.value)
        setQuery((prevState) => ({ ...prevState, max: params.value || undefined }))
        break
      }
      case "SEARCH": {
        setSearch(params.value)
        setQuery((prevState) => ({ ...prevState, search: params.value || undefined }))
        break
      }
      default:
        break;
    }
  }

  const onClickReset = () => {
    setMinAmount("")
    setMaxAmount("")
    setCategoryIds([])
    setQuery({})
    router.replace({ query: undefined })
    refetch({ options: { minAmount: undefined, maxAmount: undefined, categoryIds: undefined } })
  }

  const onClickBook = (slug: string) => {
    router.push({ pathname: '/book/[slug]', query: { slug } })
  }

  return (
    <Main id="book-list">
      <Filter>
        <CategoryFilter>
          <p className="title">Daftar Kategori</p>
          <List>
            {categories.map((category) => (
              <ListItem disablePadding key={category.value}>
                <ListItemButton onClick={() => onChangeFilter({ type: "CATEGORY", value: category.value })}>
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
              onChange={(value) => onChangeFilter({ type: "MIN_AMOUNT", value })}
            />
            <Input
              type="currency"
              label="Maksimal"
              value={maxAmount!}
              width="100%"
              placeholder="50.000"
              onChange={(value) => onChangeFilter({ type: "MAX_AMOUNT", value })}
            />
          </div>
        </NominalFilter>
        <div className="button-apply">
          <ButtonComp label="Reset" variant="outlined" onClick={onClickReset} disabled={!Object.keys(router.query || {}).length} />
          <ButtonComp label="Terapkan" onClick={onClickFilter} />
        </div>
      </Filter>
      <Content>
        <div className="search">
          <Input
            type="text"
            value={search}
            width="500px"
            onChange={(e) => onChangeFilter({ type: "SEARCH", value: e.target.value })}
            placeholder="Cari berdasarkan judul/penulis"
          />
          <ButtonComp label="Cari" onClick={onClickFilter} />
        </div>
        <Line />
        <Fade in={!loading && data?.books?.length! > 0} unmountOnExit>
          <div className="books-wrapper">
            {data?.books?.map((book) => (
              <div key={book.id}>
                <BookCard data={book} onClick={() => onClickBook(book.slug)} />
              </div>
            ))}
          </div>
        </Fade>
        {!loading && data?.books?.length === 0 && <NoData>Buku tidak ditemukan</NoData>}
        <Fade in={loading} unmountOnExit>
          <Loading>
            <FacebookCircularProgress size={60} thickness={5} />
          </Loading>
        </Fade>
      </Content>
    </Main>
  )
}

export default BookExplore

const Main = styled.div`
  display: flex;
  padding: 0 60px 60px 60px;
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
  background: ${({ theme }) => theme.colors?.primary?.ultraSoft};
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
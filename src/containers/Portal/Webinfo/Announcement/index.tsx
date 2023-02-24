import React from "react"
import styled from "styled-components"
import { Fade } from "@mui/material"
import { useMutation, useQuery } from "@apollo/client"
import { TBanner, TMutationAddBanner, TMutationDeleteBanner } from "../../../../types/announcement"
import { FacebookCircularProgress } from "../../../../components/Loading/LoadingWrapper"
import { ADDBANNER, DELETEBANNER, PORTAL_BANNERS_LIST } from "../../../../graphql/announcement.graphql"
import BannerPreview from "../../../../components/elements/BannerUploader/BannerPreview"
import BannerUploader from "../../../../components/elements/BannerUploader/BannerUploader"

const Book: React.FC = () => {
  const [loader, setLoader] = React.useState<any>(false)
  type TResBanner = {
    banners: TBanner[]
  }

  const { data: allData, loading, refetch } = useQuery<TResBanner>(PORTAL_BANNERS_LIST)

  const [addBanner, { data, loading: addLoading }] = useMutation<TMutationAddBanner>(ADDBANNER, {
    errorPolicy: "all",
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: PORTAL_BANNERS_LIST },
      'GetImage'
    ]

  })

  const [deleteBanner, { data: dataDelete, loading: deleteLoading }] = useMutation<TMutationDeleteBanner>(DELETEBANNER, {
    errorPolicy: "all",
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: PORTAL_BANNERS_LIST },
      'GetImage'
    ]

  })

  const onDelete = (values: any) => {
    try {
      setLoader(true)
      deleteBanner({
        variables: {
          data: values
        }
      });
      setLoader(false)
    } catch (error) { }
  }

  const onSubmit = (values: any) => {
    setLoader(true)
    try {
      addBanner({
        variables: {
          data: values
        }
      });
      setLoader(false)
    } catch (error) { }
  }

  return (
    <Main>
      <p className="title">Portal - Announncement</p>
      <Upload>
        <Fade in={loading || addLoading || deleteLoading} unmountOnExit>
          <Loading>
            <FacebookCircularProgress size={60} thickness={5} />
          </Loading>
        </Fade>
        {!loading && !addLoading && !deleteLoading && allData?.banners?.map((val) => (
          <div >
            <BannerPreview preview={val.imageUrl} onChange={() => onDelete(val.id)} />
          </div>
        ))}
        {!loading && allData?.banners?.length === 5 ? null :
          <BannerUploader onChange={onSubmit} />}
      </Upload>
    </Main>
  )
}

export default Book

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

const Upload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  left: 0;
  position: absolute;
  background: white;
  z-index: 2;
`
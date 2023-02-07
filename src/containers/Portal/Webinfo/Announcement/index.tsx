import React, { useMemo, useState } from "react"
import styled from "styled-components"
import { Fade } from "@mui/material"
import { useMutation, useQuery } from "@apollo/client"
import { TBanner, TFormAddBanner, TMutationAddBanner, TMutationDeleteBanner } from "../../../../types/announcement"
import { FacebookCircularProgress } from "../../../../components/Loading/LoadingWrapper"
import {  ADDBANNER, DELETEBANNER, PORTAL_BANNERS_LIST } from "../../../../graphql/announcement.graphql"
import BannerPreview from "../../../../components/elements/BannerUploader/BannerPreview"
import BannerUploader from "../../../../components/elements/BannerUploader/BannerUploader"

const Book: React.FC = () => {
  const [loader, setLoader] = React.useState<any>(false)
  type TResBanner = {
    banners: TBanner[]
  }
  

  const { data: allData, loading,  refetch } = useQuery<TResBanner>(PORTAL_BANNERS_LIST) 


  const [addBanner, { data, loading: addLoading}] = useMutation<TMutationAddBanner>(ADDBANNER, {
    errorPolicy: "all",
    fetchPolicy: 'network-only',
    refetchQueries: [
      {query: PORTAL_BANNERS_LIST},
      'GetImage'
    ]
    
  })

  const [deleteBanner, { data: dataDelete, loading: deleteLoading}] = useMutation<TMutationDeleteBanner>(DELETEBANNER, {
    errorPolicy: "all",
    fetchPolicy: 'network-only',
    refetchQueries: [
      {query: PORTAL_BANNERS_LIST},
      'GetImage'
    ]
    
  })



  
  const onDelete =  (values: any) => {
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



  const onSubmit =  (values: any) => {
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

  // const createData = (id: string, no: string, secureUrl: string) => ({ id, no, secureUrl});


  // const dataTable = useMemo(() => {
  //   const rows = data?.announcements?.map((val, idx) => {
  //     return createData(
  //       val?.id,
  //       String(idx + 1),
  //       val?.secureUrl,
  //       <Action>
  //         <Button onClick={(e) => onClickDelete(e, {id: val?.id})}><XIcon /></Button>
  //       </Action>
  //     );
  //   }, []);
  //   return { rows };
  // }, [data]);


  return (
    <Main>
      <p className="title">Portal - Announncement</p>
      <Upload>
      <Fade in={loading || addLoading || deleteLoading } unmountOnExit>
            <Loading>
              <FacebookCircularProgress size={60} thickness={5} />
            </Loading>
      </Fade>
          {!loading && !addLoading && !deleteLoading && allData?.banners?.map((val) => (
            <div >
                 <BannerPreview  preview={val.image} onChange={() => onDelete(val.id)}  />
            </div> 
                      ))}
          
          {!loading && allData?.banners?.length === 5 ? null : 
          <BannerUploader   onChange={onSubmit} />}

           
           
          
        
                  

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

const Action = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0;
  gap: 5px;
  > button.MuiButton-root {
    min-width: auto;
    min-height: auto;
    height: fit-content;
    padding: 5px;
    border-radius: 100%;
    margin: 0;
    
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
  > button.MuiButton-root:nth-child(1) {
    background: ${({ theme }) => theme?.colors?.primary?.default};
  }
  > button.MuiButton-root:nth-child(2) {
    background: ${({ theme }) => theme?.colors?.red?.["07"]};
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
import styled, { css } from "styled-components";

type TMain = {
  error: boolean;
  width: string;
}

export const Main = styled.div<TMain>`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
  justify-content: space-between;
  width: ${({ width }) => width || "440px"};
  gap: 50px;
  height: 200px;
  border-radius: 20px;
  padding: 40px 16px 16px 16px;
  overflow: hidden;
  ${({ theme, error }) => css`
    background-image: ${`url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%23${error ? theme.colors?.stateColor?.red?.medium?.replace("#", "") : theme.colors?.primary?.default?.replace("#", "")}' stroke-width='1' stroke-dasharray='6%2c 4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`};  
  `}
  > input {
    display: none;
  }
  > div.button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 12px;
    > label {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      box-shadow: 0px 3px 10px 3px rgba(94, 158, 255, 0.2);
      border-radius: 25px;
      background: ${({ theme }) => theme.colors?.primary?.default};
      font-weight: 400;
      font-size: 13px;
      padding: 10px 16px;
      cursor: pointer;
      :hover {
        background: ${({ theme }) => theme.colors?.primary?.hard};
      }
      transition: background 0.2s ease;
    }
    > p.info {
      font-weight: 500;
      font-size: 14px;
      margin: 0;
      line-height: 1;
      color: ${({ theme, error }) => error ? theme.colors?.stateColor?.red?.medium : theme.colors?.text?.dark};
    }
  }
  > div.file-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    width: 100%;
    gap: 30px;
    height: min-content;
    > div {
      display: flex;
      justify-content: center;
      > p {
        font-weight: 500;
        font-size: 14px;
        color: ${({ theme }) => theme.colors?.text?.darkGrey};
        margin: 0;
        line-height: 1;
        > span {
          color: ${({ theme }) => theme.colors?.text?.dark};
          font-weight: 600;
        }
      }
    }
  }
  >div.drag-file-element{
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background: #dae9ff56;
    z-index: 1;
  }
  transition: all ease 0.2s;
`;

type TLoading = {
  percent: number;
}

export const Loading = styled.div<TLoading>`
  display: flex;
  height: 8px;
  width: 350px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  ::before {
    display: flex;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: ${({ theme }) => theme.colors?.text?.ultraSoft};
  }
  ::after {
    display: flex;
    content: "";
    position: absolute;
    height: 100%;
    width: ${({ percent }) => `${percent}%`};
    left: 0;
    top: 0;
    background: ${({ theme }) => theme.colors?.primary?.default};
    transition: all ease 0.2s;
  }
`;

export const ImagePreview = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  background: ${({theme})=>theme?.colors?.primary?.ultraSoft};
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border-radius: 17px;
  padding: 10px;
  top: 0;
  bottom: 0;
  margin: auto 0;
  > div {
    display: flex;
    position: relative;
    top: 0;
    bottom: 0;
    margin: auto 0;
    width: 100%;
    height: 100%;
  }
`

export const CloseIcon = styled.div`
  display: flex;
  position: absolute;
  right: 10px;
  cursor: pointer;
  overflow: hidden;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.colors?.primary?.ultraSoft};
  color: ${({ theme }) => theme.colors?.primary?.default};
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 12px 1px rgba(175, 173, 200, 0.2);
  border-radius: 100px;
  width: 25px;
  height: 25px;
  :hover {
    background: ${({ theme }) => theme.colors?.red?.["07"]};
    color: ${({ theme }) => theme.colors?.primary?.ultraSoft};
  }
  transition: .2s all ease;
`
import React from 'react';
import { Backdrop, Fade } from '@mui/material';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Image from 'next/image';

export const FacebookCircularProgress = (props: CircularProgressProps) => {
  return (
    <Box sx={{ position: 'relative', display: "flex", alignItems: "center" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: "#d2cde4"
        }}
        size={props.size}
        thickness={props.thickness}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: "#303f9f",
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={props.size}
        thickness={props.thickness}
        {...props}
      />
    </Box>
  );
}

const LoadingWrapper = ({ open = false }) => {
  return (
    <StyledModal slots={{ backdrop: Backdrop }} open={open}>
      <Fade in={open}>
        <Content>
          <Image src="/icons/ubb_press.png" height={50} width={190} alt="logo" style={{ zIndex: "100" }} />
          <FacebookCircularProgress size={35} thickness={5} />
        </Content>
      </Fade>
    </StyledModal>
  );
};

export default LoadingWrapper

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  .MuiBackdrop-root  {
    background: white;
  } 
  > div {
    outline: none;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  gap: 20px;
  > img {
    margin-bottom: 10px;
  }
`
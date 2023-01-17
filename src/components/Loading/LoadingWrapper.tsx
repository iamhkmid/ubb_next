import React from 'react';
import { Backdrop } from '@mui/material';
import CircularProgress, {
  circularProgressClasses,
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from 'styled-components';

export const FacebookCircularProgress = (props: CircularProgressProps) => {
  return (
    <Box sx={{ position: 'relative' }}>
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
      <div>
        <FacebookCircularProgress size={70} thickness={5}/>
      </div>
    </StyledModal>
  );
};

export default LoadingWrapper

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  .MuiBackdrop-root  {
    background: #e7eaf0d1;
  } 
  span {
    outline: none;
  }
`;
/* eslint-disable no-multiple-empty-lines */
import { Box, Checkbox, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FacebookCircularProgress } from '../Loading/LoadingWrapper';

const TableComponent = ({ dataTable, onChange = () => { }, checkbox = false, maxHeight = "350px", minHeight = "auto", loading }) => {
  const { rows, columns } = dataTable;
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    onChange({ checked });
  }, [checked]);

  useEffect(() => {
    setChecked([]);
  }, [loading]);

  useEffect(() => {
    setChecked(checked?.filter((checkedId) => dataTable?.rows?.some((val) => val?.id === checkedId)));
  }, [dataTable]);

  const onCheckAll = () => {
    if (rows.length === checked.length) {
      setChecked([]);
    } else {
      setChecked(rows.map((val) => val.id));
    }
  };

  const changeChecked = ({ id }) => {
    if (checkbox) {
      if (checked.includes(id)) {
        setChecked(checked?.filter((val) => val !== id));
      } else {
        setChecked([...checked, id]);
      }
    }
  };

  if (loading) {
    return (
      <Main maxHeight={maxHeight} minHeight={minHeight}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {checkbox && (
                  <StyledTableCell width={0}>
                    <StyledCheckbox
                      indeterminate={dataTable?.rows?.length > 0 && checked.length > 0 && rows.length !== checked.length}
                      checked={dataTable?.rows?.length > 0 && rows.length === checked.length}
                      onChange={onCheckAll}
                    />
                  </StyledTableCell>
                )}
                {columns.map((column) => column.display !== "hidden" && (
                  <StyledTableCell key={column.id} width={column.width} align={column.align}>{column.label}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length + (checkbox ? 1 : 0)}>
                  <LoadingWrapper>
                    <FacebookCircularProgress size={50} thickness={5} />
                  </LoadingWrapper>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Main>
    );
  }

  return (
    <Main maxHeight={maxHeight} minHeight={minHeight}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {checkbox && (
                <StyledTableCell width={0}>
                  <StyledCheckbox
                    color="primary"
                    indeterminate={dataTable?.rows?.length > 0 && checked.length > 0 && rows.length !== checked.length}
                    checked={dataTable?.rows?.length > 0 && rows.length === checked.length}
                    onChange={onCheckAll}
                  />
                </StyledTableCell>
              )}
              {columns.map((column) => column.display !== "hidden" && (
                <StyledTableCell key={column.id} width={column.width} align={column.align}>{column.label}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              return (
                <TableRow
                  onClick={() => changeChecked({ id: row.id })}
                  tabIndex={-1}
                  key={row.id}
                  hover
                >
                  {checkbox && (
                    <StyledTableCell>
                      <StyledCheckbox color="primary" checked={checked.includes(row.id)} />
                    </StyledTableCell>
                  )}
                  {columns.map((column) => column.display !== "hidden" && (
                    <StyledTableCell key={column.id}>
                      {row[column.id]}
                    </StyledTableCell>
                  ))}
                </TableRow>
              );
            })}
            {!(rows?.length > 0) && (
              <TableRow>
                <TableCell colSpan={columns.length + (checkbox ? 1 : 0)}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    position="relative"
                    flexDirection="column"
                    alignSelf="center"
                    alignItems="center"
                    p={3}
                    height="100%">
                    <NoData>
                      <p>No Data</p>
                    </NoData>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Main>
  );
};

export default TableComponent;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #BCC8E7;
  border-radius: 8px;
  padding-right: 1px;
  max-height: ${({ maxHeight }) => maxHeight};
  min-height: ${({ minHeight }) => minHeight};
  overflow: hidden;

  .MuiTableContainer-root{
    overflow-y: auto;
    overflow-x: hidden;
  }
  .MuiTableHead-root{
    background: #F8F8FF;
  }
  .MuiTableRow-root.MuiTableRow-hover{
    transition: background 0.2s ease;
    :hover{
      background: ${({ theme }) => theme?.colors?.primary?.ultrasoft};
    }
  }
`;

const StyledTableCell = styled(TableCell)`
  &.MuiTableCell-root.MuiTableCell-head{
    font-weight: 600;
    font-size: 13px;
    color: #727C98;
    padding: 15px 20px;
    padding-right: ${({ paddingRight }) => paddingRight !== undefined ? paddingRight : "20px"};
    margin: 0;
    line-height: 1;
    width: ${({ width }) => width !== undefined ? width : "auto"};
  }
  &.MuiTableCell-root.MuiTableCell-body{
    padding: 6px 20px;
    padding-right: ${({ paddingRight }) => paddingRight !== undefined ? paddingRight : "20px"};
    cursor: pointer;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  &.MuiCheckbox-root{
    color: #BCC8E7;
    height: 20px;
    width: 20px;
  }
  &.Mui-checked{
    color: ${({ theme }) => theme?.colors?.primary?.default};
  }
`;

const NoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 224px;
  gap: 10px;
  >p {
    font-size: 13px;
    font-weight: 400;
    color: #BCC8E7;
  }
  overflow: hidden;
  /* border-bottom: none; */
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px
`
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { axiosEvent } from "../utils/axiosEvent";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
    const [resultArray, setResultArray] = useState([]);

    useEffect(() => {
        const expensesListResp = async () => {
        await axiosEvent.get('devicereport/view/')
        .then(
            response => setResultArray(response.data))
            .catch(err=>console.log(err))
            
        }
        expensesListResp();
    }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>PS NO</StyledTableCell>
            <StyledTableCell align="right">Asset Number</StyledTableCell>
            <StyledTableCell align="right">Date Borrowed</StyledTableCell>
            <StyledTableCell align="right">Date Returned</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resultArray.map((row) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                {row.ps_no}
              </StyledTableCell>
              <StyledTableCell align="right">{row.deviceID}</StyledTableCell>
              <StyledTableCell align="right">{row.dateBorrowed}</StyledTableCell>
              <StyledTableCell align="right">{row.dateReturned}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
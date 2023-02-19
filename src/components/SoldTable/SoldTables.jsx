import React from 'react'
// Set Table
import Grid from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Stack, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function SoldTables() {
        // soldTable Generator Begins //
        const dispatch = useDispatch(); 
        const soldTables = useSelector((store) => store.soldTables)
        const soldCounter = useSelector((store) => store.soldCounterReducer)
        console.log(soldCounter);
        const sumOfSold = soldTables.reduce((accumulator, artPiece) => accumulator + Number(artPiece.price), 0);
        console.log(sumOfSold);
        // soldTable Generator Ends //

        const [value, setValue] = React.useState(dayjs());
        const [endValue, setEndValue] = React.useState(dayjs());
        // Values to Send in the Payload

        const [dateOne, setDateOne] = React.useState(dayjs());
        const [dateTwo, setDateTwo] = React.useState(dayjs());

        // Set the date for the Start Day
        const handleChange = (newValue) => {
          setValue(newValue);
          const date = new Date(newValue)
          const firstDay = date.getDate()
          const firstMonth = date.getMonth()
          const firstYear = date.getFullYear()
          console.log(firstDay, firstMonth, firstYear);
          setDateOne({
            firstDay,
            firstMonth,
            firstYear
          })
          
        };
        // Set the date for the End Day
        const handleEndChange = async(newValue) => {
          setEndValue(newValue);
          const date = new Date(newValue)
          const secondDay = date.getDate()
          const secondMonth = date.getMonth()
          const secondYear = date.getFullYear()
          console.log(secondDay, secondMonth, secondYear);
          
          setDateTwo({
            secondDay,
            secondMonth,
            secondYear
          })
          
          dispatch({ 
            type: 'SAGA_GET_TABLE_DATA',
            payload: {
              dateOne: dateOne,
              dateTwo: {
                secondDay,
                secondMonth,
                secondYear
              }
            }
         });
        };

        useEffect(() => {
          dispatch({
            type: 'SAGA_GET_SOLD_COUNT'
          })
        }, []);
        
        return (
          <>
          <div className="counterTotal">
            <h1>Top Three Galleries</h1>
            {
              soldCounter
                .sort((low, high) => high.count - low.count)
                .slice(0,3)
                .map((count) => (
                  <p key={count.galleryName}>
                    {count.galleryName} has sold: {count.count}
                  </p>
                ))
            }
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label="Start Day"
                inputFormat="MM/DD/YYYY"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="End Day"
                inputFormat="MM/DD/YYYY"
                value={endValue}
                onChange={handleEndChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
        </LocalizationProvider>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Gallery Sold</TableCell>
                <TableCell align="right">Sold</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {soldTables.map((artSold, index) => (
                <TableRow
                  key={artSold.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  
                >
                  <TableCell component="th" scope="row">
                    {artSold.title}
                  </TableCell>
                  <TableCell align="right">{artSold.price}</TableCell>
                  <TableCell align="right">{artSold.description}</TableCell>
                  <TableCell align="right">{artSold.galleryName}</TableCell>
                  <TableCell align="right">{artSold.soldDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell align="right"></TableCell>
                <TableCell align="right">Total Sold:<span>{sumOfSold}</span></TableCell>
                <TableCell align="right"></TableCell>
                {/* Most Gallery Will Need to Be adjusted to show the most Earning Gallery */}
                {/* <TableCell align="right">Most Gallery: <span>{soldTables[1].galleryName}</span></TableCell> */}
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer> 
        </>
        );
}

export default SoldTables;

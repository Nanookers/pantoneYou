import React from 'react'
// Set Table
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
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
          <Grid container spacing={3} sx={{ margin: '5px', justifyContent: 'center' }}>
          <Grid item xs={4} sx={{ ml: '10px' }}>
            <Card sx={{ ml: '10px', borderColor: '#BE3455', borderWidth: '2px', backgroundColor: '#f2eaec' }}>
            <div className="counterTotal" >
            <Typography variant="h4" component="div" sx={{ ml: '10px', mt: '6px' }}> Top Earning Galleries </Typography>
              {
                soldCounter
                  .sort((low, high) => high.count - low.count)
                  .slice(0,3)
                  .map((count) => (
                    <Typography variant="h7" color="text.secondary" sx={{ '& p': { marginLeft: '10px' } }}>
                      <p>{count.galleryName} has sold: {count.count}</p>
                    </Typography>
                  ))
              }
            </div>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} sx={{ margin: '5px' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid>
              <Stack spacing={2}>
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
            </Grid>
        </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9} sx={{ margin: '5px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, backgroundColor: '#f2eaec'}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Gallery Sold</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell align="right"></TableCell>
                <TableCell align="right" style={{ fontSize: '20px' }}>Total Sold: <span >{sumOfSold}</span></TableCell>
                
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer> 
        </Grid>
        </Grid>
        </>
        );
}

export default SoldTables;

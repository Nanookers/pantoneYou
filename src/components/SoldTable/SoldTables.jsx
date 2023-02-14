import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { TableFooter } from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function SoldTables() {

        const dispatch = useDispatch(); 
        const soldTables = useSelector((store) => store.soldTables)

        console.log(soldTables);

        const sumOfSold = soldTables.reduce((accumulator, artPiece) => accumulator + Number(artPiece.price), 0);
        console.log(sumOfSold);

        // Handles populating the table with the relevent data.
        function createData(name, calories, fat, carbs, protein) {
          return { name, calories, fat, carbs, protein };
        }
        
        // Handles the populating the content of the rows. 
        const rows = [
          createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
          createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
          createData('Eclair', 262, 16.0, 24, 6.0),
          createData('Cupcake', 305, 3.7, 67, 4.3),
          createData('Gingerbread', 356, 16.0, 49, 3.9),
        ];
      
        useEffect(() => {
            dispatch({ type: 'SAGA_GET_ART_ACTIVE' });
          }, []);
      
        return (
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
                <TableCell align="right">Total Sold:<span>{sumOfSold}</span></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        );
}

export default SoldTables;

import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function SoldTables() {

        const dispatch = useDispatch(); 
        const soldTables = useSelector((store) => store.soldTables)

        console.log(soldTables);

        const table = soldTables.map((item) => item)
        console.log(table);

        // Handles the generation of the columns, giving names.
        const columns = [
            { id: 'name', label: 'Title', minWidth: 170 },
            { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
            {
              id: 'population',
              label: 'Description',
              minWidth: 170,
              align: 'right',
              format: (value) => value.toLocaleString('en-US'),
            },
            {
              id: 'size',
              label: 'Price',
              minWidth: 170,
              align: 'right',
              format: (value) => value.toLocaleString('en-US'),
            },
            {
              id: 'density',
              label: 'Location',
              minWidth: 170,
              align: 'right',
              format: (value) => value.toFixed(2),
            },
          ];

        // Handles populating the table with the relevent data.
        function createData(name, code, population, size) {
            return { name, code, population, size };
        }
        
        // Handles the populating the content of the rows. 
        const rows = [
            createData('India', 'IN', 1324171354, 3287263),
          ];
    
        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        };

        useEffect(() => {
            dispatch({ type: 'SAGA_GET_ART_ACTIVE' });
          }, []);
      
        return (
          <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      Country
                    </TableCell>
                    <TableCell align="center" colSpan={3}>
                      Details
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align} // I'll have to look into the column variable
                        style={{ top: 57, minWidth: column.minWidth }} 
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        );
}

export default SoldTables;

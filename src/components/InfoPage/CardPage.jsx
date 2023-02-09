import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListArtModal from './ListArtModal';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'


function CardIndividual( {art} ){
    
    const[ open, setOpen ] = useState(false) //for opening the modal
    const dispatch = useDispatch();

    const handleListClick = (event) => {
        // Sets the open state to true, it is passed through the 
        // compnent as a prop so it can be turned.
        setOpen(true)
    }

    // Notes for tomorrow: 
    // Set up sell button.
    // Figure out how to delist sold items from main gallery
    // Figure out how to set ternary for button dissable
    // Selling it also has to timestamp it

    const handleSold = () => {

    }
    
    return (
        <>
        <h1>Card Goes Here</h1>
        <div key={art.id}>
            <img src={art.image} />
            <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
            fullWidth={true}>
                <Button onClick={handleListClick}>List</Button>
                <Button onClick={handleSold}>Sell</Button>
                    <ListArtModal open={open} onClose={() => setOpen(false)} art={art}/>
          </ButtonGroup>

        </div> 
        </>
    )
}

export default CardIndividual;
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListArtModal from './ListArtModal';
import './CardPage.css';

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';

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

    console.log(art.galleryLocation);

    const handleSold = (event) => {
        event.preventDefault
        const location = art.galleryLocation > 0 ? true : false;
        return dispatch({
            type: 'SAGA_PUT_SOLD_STATUS',
            payload: {
                artId: art.id,
                locationSold: art.galleryLocation
            }
        })
    }

    const handleUnlist = (event) => {
        event.preventDefault();
        dispatch({ 
            type: 'SAGA_UNLIST_FROM_GALLERY',
            payload:{
                galleryLocation: null,
                artId: art.id
            }
        });
    }
    
    return (
        <>
        <div key={art.id}>
            <Card sx={{ maxWidth: 400, maxHeight: 510 }}>
                <CardContent>
                    <Typography variant="h4" component="div">
                        {art.title} 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {art.description}
                    </Typography>
                    <CardMedia sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}>
                        <div className="imageSize"> <img src={art.image} /> </div>
                    </CardMedia>
                </CardContent>
                <CardActions>
                    <ButtonGroup
                        fullWidth={true}>
                        <Button onClick={handleListClick} disabled={art.galleryLocation > 0}>List</Button>
                        <Button onClick={handleSold}>Sell</Button>
                        <Button onClick={handleUnlist} disabled={art.galleryLocation === 0}>Unlist</Button>
                        <ListArtModal open={open} onClose={() => setOpen(false)} art={art}/>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </div> 
        </>
    )
}

export default CardIndividual;
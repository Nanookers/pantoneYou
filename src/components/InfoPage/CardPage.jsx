import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    const [disableList, setDisableList] = useState(false); 
    const [disableSold, setDisablesold] = useState(false); 
    const [disableUnlist, setDisableUnlist] = useState(false); 

    const dispatch = useDispatch();

    useEffect(() => {
        art.galleryStatus === true ? setDisableList(true) : setDisableList(false)
        art.galleryStatus === true ? setDisableUnlist(false) : setDisableUnlist(true)
        art.soldStatus === true ? setDisablesold(true) : setDisablesold(false)
    }, []);

    // Send dispatch, and set state of the List buttons
    const handleListClick = (event) => {
        // Sets the open state to true, it is passed through the 
        // compnent as a prop so it can be turned.
        event.preventDefault()
        setDisableList(!disableList);
        setDisableUnlist(!disableUnlist)
        setOpen(true)
    }
    // Send dispatch, and set state of the Sold buttons
    const handleSold = (event) => {
        event.preventDefault()
        // art.galleryLocation is clicking a number
        dispatch({
            type: 'SAGA_PUT_SOLD_STATUS',
            payload: {
                artId: art.id,
                locationSold: art.galleryLocation
            }
        })
        setDisablesold(!disableSold)
    }
    // Send dispatch, and set state of the UnList button
    const handleUnlist = (event) => {
        event.preventDefault();
        dispatch({ 
            type: 'SAGA_UNLIST_FROM_GALLERY',
            payload:{
                galleryLocation: null,
                artId: art.id
            }
        });
        setDisableUnlist(!disableUnlist)
        setDisableList(!disableList);
    }

    const history = useHistory()

    const detailViewClick = () => {
        history.push(`/info/${art.id}`)
        console.log(art.id);
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
                    <CardMedia onClick={detailViewClick} sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}>
                        <div className="imageSize"> <img src={art.image} /> </div>
                    </CardMedia>
                </CardContent>
                <CardActions>
                    <ButtonGroup
                        fullWidth={true}>
                            {/* disabled works with setState to immediately render the button change the ternary keeps the state on reload */}
                            <Button onClick={handleListClick} disabled={disableList}>List</Button>

                            <Button onClick={handleSold} disabled={disableSold}>Sold</Button>
                            
                            <Button onClick={handleUnlist} disabled={disableUnlist}>Unlist</Button>

                        <ListArtModal open={open} onClose={() => setOpen(false)} art={art}/>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </div> 
        </>
    )
}

export default CardIndividual;
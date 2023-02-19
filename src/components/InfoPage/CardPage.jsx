import React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ListArtModal from './ListArtModal';
import SoldArtModal from './SoldArtModal';
import UnlistArt from './UnlistArt';
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
    const[ openSold, setOpenSold ] = useState(false) //for opening the modal
    const[ openUnlist, setOpenUnlist ] = useState(false) //for opening the modal

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
        event.preventDefault()
        setOpen(true)
    }
    // Send dispatch, and set state of the Sold buttons
    const handleSold = (event) => {
        event.preventDefault()
        setOpenSold(true)
        
    }
    // Send dispatch, and set state of the UnList button
    const handleUnlist = (event) => {
        event.preventDefault();
        setOpenUnlist(true)
    }

    const history = useHistory()

    const detailViewClick = () => {
        history.push(`/info/${art.id}`)
        console.log(art.id);
    }
    
    return (
        <>
        <div class="cardForEffect" key={art.id}>
            <Card sx={{ maxWidth: 400, maxHeight: 500 }} >
                    <CardMedia 
                        onClick={detailViewClick} 
                            sx={{ maxWidth: 400, maxHeight: 250}}
                                component="img"
                                    image={art.image} />
                <CardContent sx={{ backgroundColor: '#f2eaec' }}>
                    <Typography variant="h4" component="div" 
                        noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {art.title} 
                    </Typography>

                    <Typography variant="h7" color="text.secondary" 
                        noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            { art.galleryStatus === true ? <span className="active">● </span> : <span className="inactive">● </span>} 
                                { art.galleryStatus === true ? art.galleryName : 'Unlisted' }
                    </Typography>
                </CardContent>
                <CardActions  sx={{ backgroundColor: '#f2eaec' }}>
                    <ButtonGroup 
                        fullWidth={true}>
                            {/* disabled works with setState to immediately render the button change the ternary keeps the state on reload */}
                        <Button onClick={handleListClick} 
                            disabled={art.galleryStatus === true ? true : false }>List</Button>

                        <Button onClick={handleSold} 
                            disabled={art.soldStatus === true ? true : false }>Sell</Button>
                            
                        <Button onClick={handleUnlist} 
                            disabled={art.galleryStatus === true ? false : true }>Unlist</Button>

                        <ListArtModal open={open} onClose={() => setOpen(false)} art={art}  />
                        <SoldArtModal open={openSold} onClose={() => setOpenSold(false)} art={art}  />
                        <UnlistArt open={openUnlist} onClose={() => setOpenUnlist(false)} art={art}  />
                    </ButtonGroup>
                </CardActions>
            </Card>
        </div> 
        </>
    )
}

export default CardIndividual;
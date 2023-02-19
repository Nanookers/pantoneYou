import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EditModal from './EditModalIndividual';
import DeleteInfoModal from './DeleteModal';

import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

const InfoIndividual = () => {

    const[ open, setOpen ] = useState(false) //for opening the modal
    const[ openDelete, setOpenDelete ] = useState(false) //for opening the modal

    const params = useParams();
    const dispatch = useDispatch();

    const singleArt = useSelector((store)  =>  store.singleArtPiece)
    console.log(params.id);
  
  
    useEffect(() => {
        dispatch({
          type: 'FETCH_SINGLE_PIECE_DETAILS',
          payload: params.id 
        })
    }, [params.id])
    
    const handleEdit = (event) => {
      event.preventDefault();
      setOpen(true)
    }

    const handleDelete = () => {
      console.log(params.id);
      setOpenDelete(true);
    }
    
  return (
    <>
      <Card sx={{ maxWidth: 400, maxHeight: 1000 }}>
        <CardMedia 
          sx={{ maxWidth: 400, maxHeight: 1000}}
            component="img"
              image={singleArt.image} />
        <CardContent>
          <Typography variant="h4" component="div" 
            noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {singleArt.title} 
          </Typography>
          <Typography variant="h6" component="div" 
            noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {singleArt.description} 
          </Typography>
          <Typography variant="h6" component="div" 
            noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {singleArt.price} 
          </Typography>

          <Typography variant="h7" color="text.secondary" 
            noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              { singleArt.galleryStatus === true ? <span className="active">● </span> : <span className="inactive">● </span>} 
                { singleArt.galleryStatus === true ? singleArt.galleryName : 'Unlisted' }
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup
            fullWidth={true}>
              <Button onClick={handleEdit} >Edit</Button>
              <Button onClick={handleDelete}>Delete</Button>

              <EditModal open={open} onClose={() => setOpen(false)} singleArt={singleArt} idUpdate={params.id} />
              <DeleteInfoModal open={openDelete} onClose={() => setOpenDelete(false)} idToDelete={params.id} />   
          </ButtonGroup>
        </CardActions>
      </Card>
    </>
  )
}

export default InfoIndividual

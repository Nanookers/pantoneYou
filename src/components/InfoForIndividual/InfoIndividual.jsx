import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

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
import { Grid } from '@mui/material';

const InfoIndividual = () => {

    const[ open, setOpen ] = useState(false) //for opening the modal
    const[ openDelete, setOpenDelete ] = useState(false) //for opening the modal

    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory()

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

    const handleBack = (event) => {
      event.preventDefault();
      history.push('/info')

    }    
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Card sx={{ maxWidth: 400, maxHeight: 1500}}>
          <CardMedia 
            sx={{ maxWidth: 400, maxHeight: 1000}}
              component="img"
                image={singleArt.image} />
          <CardContent sx={{ backgroundColor: '#f2eaec' }}>
            <Typography variant="h5" component="div" 
              noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mb: 1  }}>
                {singleArt.title} 
            </Typography>

            <Typography variant="h7" component="div" 
              noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mb: 1  }}>
                Price: ${singleArt.price} 
            </Typography>

            <Typography variant="body2" color="text.secondary"
              noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mb: 1  }}>
                {singleArt.description} 
            </Typography>

            <Typography variant="h10" component="div" color="text.secondary" 
              noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mb: 1 }}>
                {singleArt.galleryAddress}
            </Typography>

            <Typography variant="h7" color="text.secondary" 
              noWrap sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', mb: 1  }}>
                { singleArt.galleryStatus === true ? <span className="active">● </span> : <span className="inactive">● </span>} 
                  { singleArt.galleryStatus === true ? singleArt.galleryName : 'Unlisted' }
            </Typography>

          </CardContent>
          <CardActions sx={{ backgroundColor: '#f2eaec' }}>
            <ButtonGroup
              fullWidth={true}>
                <Button onClick={handleBack}> Back </Button>
                <Button onClick={handleEdit} >Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
                <EditModal open={open} onClose={() => setOpen(false)} singleArt={singleArt} idUpdate={params.id} />
                <DeleteInfoModal open={openDelete} onClose={() => setOpenDelete(false)} idToDelete={params.id} />   
            </ButtonGroup>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default InfoIndividual

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
      <div className="individualArtCard">
        {<img src={singleArt.image}/>}
        {<p>{singleArt.title}</p>}
        {<p>{singleArt.description}</p>}
        {<p>{singleArt.price}</p>}
        
        <ButtonGroup
            fullWidth={true}>
              {/* disabled works with setState to immediately render the button change the ternary keeps the state on reload */}
              <Button onClick={handleEdit} >Edit</Button>

              <Button onClick={handleDelete}>Delete</Button>

              <EditModal open={open} onClose={() => setOpen(false)} singleArt={singleArt} idUpdate={params.id} />
              <DeleteInfoModal open={openDelete} onClose={() => setOpenDelete(false)} idToDelete={params.id} />
              
          </ButtonGroup>
        </div>
    </>
  )
}

export default InfoIndividual
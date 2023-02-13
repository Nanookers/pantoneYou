import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';


import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'

const EditModal = ( { singleArt, open, onClose, idUpdate } ) => {

    const dispatch = useDispatch();

    // Styles the Modal Box
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    // dispatches to change state (just state)
    const setNewTitle = (event) => {
        dispatch({
            type: 'SET_NEW_TITLE',
            payload: event.target.value
          })
    }
    const setNewDescription = (event) => {
        dispatch({
            type: 'SET_NEW_DESCRIPTION',
            payload: event.target.value
          })
    }
    const setNewPrice = (event) => {
        dispatch({
            type: 'SET_NEW_PRICE',
            payload: event.target.value
          })
    }

    // Shipping dispatch of updated state to Saga
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ 
            type: 'SAGA_UPDATE_ART_INFO',
            payload:{
                artId: idUpdate,
                title: singleArt.title,
                description: singleArt.description,
                price: singleArt.price
            }
        });
        onClose(); 
    }

  return (
    <Modal
        hideBackdrop
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
    >
        <form onSubmit={handleSubmit} >

            <Box sx={{ ...style, width: 500 }}>
            <h2 id="child-modal-title">Update</h2>
                <TextField sx={{width: 500, height: 75 }} 
                    id="standard-basic" 
                        label="Title" 
                            variant="standard" 
                                value={singleArt.title || ''} 
                                    onChange={setNewTitle}
                    />
            <TextField sx={{width: 500, height: 75 }} 
                id="standard-basic" 
                    label="Description" 
                        variant="standard" 
                            value={singleArt.description || ''} 
                                onChange={setNewDescription}
                />
            <TextField sx={{width: 500, height: 75 }} 
                id="standard-basic" 
                        variant="standard" 
                            type="number"
                                label="Price" 
                                    value={singleArt.price|| ''} 
                                        onChange={setNewPrice} 
                />
            <ButtonGroup
                disableElevation
                variant="contained"
                aria-label="Disabled elevation buttons"
                fullWidth={true}>
                <Button onClick={onClose}  variant="outlined" >Close</Button>
                <Button type="submit">Submit</Button>
            </ButtonGroup>
            </Box>
            </form>
    </Modal>
    
  )
}

export default EditModal
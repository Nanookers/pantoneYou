import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';


import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'

const DeleteInfoModal = ( { singleArt, open, onClose, idToDelete } ) => {

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

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ 
            type: 'SAGA_UPDATE_ART_INFO',
            payload:{
                title: singleArt.title,
                description: singleArt.description,
                price: singleArt.price
            }
        });
        onClose(); 
    }
    const handleDelete = (event) => {
        dispatch({
            type: 'DELETE_SINGLE',
            payload: idToDelete
        })
        // push history back to the main gallery
    }
    const handleCancel = (event) => {
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
                <h2 id="child-modal-title">Are You Sure You'd like to Continue?</h2>
                    <ButtonGroup
                    fullWidth={true}>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </ButtonGroup>
            </Box>
            </form>
    </Modal>
    
  )
}

export default DeleteInfoModal
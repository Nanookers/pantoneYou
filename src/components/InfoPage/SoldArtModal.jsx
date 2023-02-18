import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Modal
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'

const SoldArtModal = ({ art, open, onClose }) => {

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

    const dispatch = useDispatch();

    const history = useHistory()
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SAGA_PUT_SOLD_STATUS',
            payload: {
                artId: art.id,
                locationSold: art.galleryLocation
            }
        })
        // History Push needs to go somewhere else
        history.push(`/info`)
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
                <h2 id="child-modal-title">Selling</h2>
                    <p>{art.title}</p>
                    <p>{art.price}</p>
                    <p>Art Gallery Will be added to the query</p>
                    
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

export default SoldArtModal
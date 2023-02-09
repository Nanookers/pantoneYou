import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'

const ListArtModal = ( { open, onClose, art } ) => {

    const [ nameInput , setGalleryName ] = useState('')
    const [ addressInput , setAddress ] = useState('')
    const [ commissionInput , setComission ] = useState()

    const dispatch = useDispatch();

    console.log(nameInput, addressInput, commissionInput);
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

    const handleSubmit = () => {
        
    }

  return (
    <Modal
        hideBackdrop
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
    >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="child-modal-title">List at a Local Gallery</h2>
          <TextField sx={{width: 500, height: 75 }} 
            id="standard-basic" 
                label="Gallery Name" 
                    variant="standard" 
                        value={ nameInput } 
                            onChange={(event) => setGalleryName(event.target.value)}
            />
          <TextField sx={{width: 500, height: 75 }} 
            id="standard-basic" 
                label="Gallery Address" 
                    variant="standard" 
                        value={ addressInput }
                            onChange={(event) => setAddress(event.target.value)}
            />
          <TextField sx={{width: 500, height: 75 }} 
            id="standard-basic" 
                label="Gallery Comission" 
                    variant="standard" 
                        type="number" 
                            value={ commissionInput }
                                onChange={(event) => setComission(event.target.value)}
            />
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
            fullWidth={true}>
            <Button onClick={onClose}  variant="outlined" >Close</Button>
            <Button onSubmit={handleSubmit}>Submit</Button>
          </ButtonGroup>
        </Box>
    </Modal>
    
  )
}

export default ListArtModal
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// Used for Modal
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ButtonGroup from '@mui/material/ButtonGroup'

// For Tabs on Modal
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// For Select Menu

import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const ListArtModal = ( { open, onClose, art } ) => {

    const [ nameInput , setGalleryName ] = useState('')
    const [ addressInput , setAddress ] = useState('')
    const [ commissionInput , setComission ] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch({
        type: 'SAGA_GET_LOCATION'
      })
  }, []);

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
    // Building Interactive tabs inside of the Modal //
    const [tabValue, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      event.preventDefault()
      setValue(newValue);
    };

    // Building Select Wheel inside of the Modal //
    // To select All Ready constructed Gallery Locations //
    const locations = useSelector((store) => store.locationReducer)
    

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };

      function getStyles(name, personName, theme) {
        return {
          fontWeight:
            personName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }

      const theme = useTheme();
      const [personName, setPersonName] = React.useState([]);
    
      const handleSwitchChange = (event) => {
        setPersonName(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

      const handleSelectedGallery = (event) =>{
        event.preventDefault();
        const {
          target: { value },
        } = event;

        dispatch({ 
          type: 'SAGA_PUT_EXISTING_GALLERY',
          payload:{
            locationId: value,
            id: art.id,
          }
        }); 
        onClose()
      }


    // Submitting a new Gallery for Listing //
    const handleSubmitNew = (event) => {
        event.preventDefault();
        dispatch({ 
            type: 'SAGA_POST_GALLERY',
            payload:{
                galleryName: nameInput,
                galleryAddress: addressInput,
                galleryCut: commissionInput,
                artId: art.id
            }
        });

      onClose()
    }
    
  return (
    <Modal
        hideBackdrop
        open={open}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
    >
        <form onSubmit={handleSubmitNew} >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="child-modal-title">List at a Local Gallery</h2>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Select Gallery" value="1" />
                <Tab label="New Gallery" value="2" />

              </TabList>
            </Box>
            <TabPanel value="1">
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleSelectedGallery}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                  >
                    {locations.map((name) => (
                      <MenuItem
                        key={name.id}
                        value={name.id}
                        style={getStyles(name, personName, theme)}
                      >
                        {name.galleryName}
                      </MenuItem>
                    ))}
                  </Select>
              </FormControl>
            </TabPanel>
            <TabPanel value="2">
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
                              onChange={(event) => setComission(event.target.value)}
              />
              <ButtonGroup
                disableElevation
                  variant="contained"
                    aria-label="Disabled elevation buttons"
                      fullWidth={true}>
                <Button onClick={onClose}  variant="outlined" >Close</Button>
                <Button type="submit">Submit</Button>
              </ButtonGroup>
            </TabPanel>
          </TabContext>
        </Box>
        </form>
    </Modal>
    
  )
}

export default ListArtModal
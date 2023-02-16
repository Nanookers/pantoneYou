import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardIndividual from './CardPage';
import './InfoPage.css'
// For Tabs 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box'

function InfoPage() {
  
  const [tabValue, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
  };

  const allArt = useSelector((store) => store.allArtReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'SAGA_CLEAR_ART' });
    dispatch({ type: 'SAGA_GET_ART' });
  }, []);

  
  return (
    <>
     <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="All Artwork" value="1" />
                <Tab label="Art In Galleries" value="2" />
                <Tab label="Unsold Artwork" value="3" />
                <Tab label="Unlisted Artwork" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {
                allArt.map((art) => {
                  return (<CardIndividual art={art} key={art.id} />)  
                })
              }
            </TabPanel>
            <TabPanel value="2">
            {
              allArt
                .filter((art) => art.galleryStatus === true) 
                .map((art) => <CardIndividual art={art} key={art.id} />) 
            }
              
            </TabPanel>
            <TabPanel value="3">
            {
              allArt
                .filter((art) => art.soldStatus === false) 
                .map((art) => <CardIndividual art={art} key={art.id} />) 
            }
            </TabPanel>
            <TabPanel value="4">
            {
              allArt
                .filter((art) => art.galleryStatus === false) 
                .map((art) => <CardIndividual art={art} key={art.id} />) 
            }
            </TabPanel>
          </TabContext>
    </>
  );
}

export default InfoPage;

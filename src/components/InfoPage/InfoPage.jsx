import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardIndividual from './CardPage';
import UserUpload from '../UserUpload/UserUpload'
import './InfoPage.css'
// For Tabs 
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box'

// Inputs for Search Bar
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

  // This is the function that runs the search by title
  const [searchValue, setSearchValue] = useState('')
  
  // For the search function. toLowerCase removes case sensitive issues. 
  const searchForTitle = allArt.filter((art) => art.title.toLowerCase().includes(searchValue.toLowerCase()))
  console.log(searchForTitle);

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <UserUpload />
    </Box>
      <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
                <Tab label="All Artwork" value="1" />
                <Tab label="Art In Galleries" value="2" />
                <Tab label="Unsold Artwork" value="3" />
                <Tab label="Unlisted Artwork" value="4" />
                <Tab label="Search Art" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">
            <Grid container spacing={4}>
              {
                allArt.map((art) => {
                  return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={art.id}>
                  <CardIndividual art={art} key={art.id} />
                </Grid>
                  )   
                })
              }
            </Grid>
            </TabPanel>
            <TabPanel value="2">
          <Grid container spacing={4}>
            {
              allArt
                .filter((art) => art.galleryStatus === true) 
                .map((art) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={art.id}>
                    <CardIndividual art={art} key={art.id} />
                  </Grid>
                )) 
            }
          </Grid>
        </TabPanel>
        <TabPanel value="3">
          <Grid container spacing={4}>
            {
              allArt
                .filter((art) => art.soldStatus === false) 
                .map((art) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={art.id}>
                    <CardIndividual art={art} key={art.id} />
                  </Grid>
                )) 
            }
          </Grid>
        </TabPanel>
        <TabPanel value="4">
          <Grid container spacing={4}>
            {
              allArt
                .filter((art) => art.galleryStatus === false) 
                .map((art) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={art.id}>
                    <CardIndividual art={art} key={art.id} />
                  </Grid>
                )) 
            }
          </Grid>
        </TabPanel>
        <TabPanel value="5">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4} xl={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <TextField id="standard-basic-1" label="Search" variant="standard" type="text" value={searchValue} 
                onChange={(event) => setSearchValue(event.target.value)} style={{ margin: 0, padding: 0, width: '100%' }} />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            {
              searchForTitle.map((art) => {
                return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={art.id}>
                <CardIndividual art={art} key={art.id} />
              </Grid>
                )   
              })
            }
          </Grid>
        </TabPanel>
      </TabContext>
    </>
  );
}

export default InfoPage;

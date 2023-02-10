import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardIndividual from './CardPage';

import './InfoPage.css'

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function InfoPage() {

  const dispatch = useDispatch();

  const [renderAllState, setGalleryState] = useState({
    all: true,
    unListed: false,
    // unsold: false,
    // activePieces: false,
  })

  const allArt = useSelector((store) => store.allArtReducer);
  const unlistedFilter = useSelector((store) => store.filterUnlistedArt);
  const unsoldFilter = useSelector((store) => store.filterUnsoldArt);
  

  useEffect(() => {
    dispatch({ type: 'SAGA_GET_ART' });
    dispatch({type: 'SAGA_GET_ART_UNSOLD'})
  }, []);

  const toggleAll = () => setGalleryState(!renderAllState.all)
  const toggleUnlisted = () => setUnlistedGalleryState(!renderUnlisted.unlisted)
  
  // Handles the toggle for All Features. 
  const handleToggleAll = () => {
    setGalleryState((prevState) => ({
      ...prevState,
      all: !prevState.all,
      unListed: false
    }))
  };
  
  // Handles the toggle for Unlisted Art
  const handleToggleUnlisted = () => {
    dispatch({ type: 'SAGA_GET_ART_UNLISTED' });
    setGalleryState((prevState) => ({
      ...prevState,
      all: false,
      unListed: !prevState.unListed,
    }))
  };
  




  
  return (
    <>
                  <FormGroup>
                    {/* <FormControlLabel
                        control={
                        <Checkbox  onChange={handleChange} checked={unsold} name="unsold"/>
                        }
                        label="Unsold Pieces"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox  onChange={handleChange} checked={activePieces} name="activePieces" />
                        }
                        label="Pieces In Galleries"
                    /> */}
                    <FormControlLabel
                        control={
                        <Checkbox  onChange={handleToggleUnlisted} checked={renderAllState.unListed} name="unListed"/>
                        }
                        label="Unlisted Pieces"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox  onChange={handleToggleAll} checked={renderAllState.all} name="all"/>
                        }
                        label="All Art"
                    />
                </FormGroup>
    <div className="container">
      {/* This Renders All Art  Perhaps set this as the default and remove the check*/}
      {
        renderAllState.all !== false ? (allArt.map((art) => { 
          return (<CardIndividual art={art} key={art.id} />)  
        })) : <h1></h1>
      }
      {/* This Renders Unlisted Art */}
      {
        renderAllState.unListed !== false ? (unlistedFilter.map((art) => { 
          return (<CardIndividual art={art} key={art.id} />)  
        })) : <h1></h1>
      }
    </div>
    </>
  );
}

export default InfoPage;

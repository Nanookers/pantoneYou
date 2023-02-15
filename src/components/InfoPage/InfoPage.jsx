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
  
  // Render the Gallery based on which box is checked.
  const [renderAllState, setGalleryState] = useState({
    all: false,
    unListed: false,
    unsold: false,
    activePieces: false,
  })

  const allArt = useSelector((store) => store.allArtReducer);
  const unsoldFilter = useSelector((store) => store.filterUnsoldArt);
  const unlistedFilter = useSelector((store) => store.filterUnlistedArt);
  const listedArt = useSelector((store) => store.filteredActiveStatus);

  console.log(listedArt);

  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  // Handles the toggle for All Features. 
  const handleToggleAll = () => {
    setGalleryState((prevState) => ({
      ...prevState,
      all: !prevState.all,
      unListed: false,
      unsold: false,
      activePieces: false
    }))
    dispatch({ type: 'SAGA_GET_ART' });
  };
  
  // Handles the toggle for Unlisted Art
  const handleToggleUnlisted = () => {
    setGalleryState((prevState) => ({
      ...prevState,
      all: false,
      unListed: !prevState.unListed,
      unsold: false,
      activePieces: false
    }))
    dispatch({ type: 'SAGA_GET_ART_UNLISTED' });
  };

  // Handles the toggle for unsold Art
  const handleToggleUnsold = () => {

    setGalleryState((prevState) => ({
      ...prevState,
      all: false,
      unListed: false,
      unsold: !prevState.unsold,
      activePieces: false
    }))
    dispatch({type: 'SAGA_GET_ART_UNSOLD'});
  };

  // Handles the toggle for Active art
  const handleToggleActiveArt = () => {

    setGalleryState((prevState) => ({
      ...prevState,
      all: false,
      unListed: false,
      unsold: false,
      activePieces: !prevState.unsold,
    }))

    dispatch({type: 'SAGA_GET_ART_ACTIVE'});
  };
  
  return (
    <>
                  <FormGroup>
                    <FormControlLabel
                        control={
                        <Checkbox  onChange={handleToggleUnsold} checked={renderAllState.unsold} name="unsold"/>
                        }
                        label="Unsold Pieces"
                    />
                    <FormControlLabel
                        control={
                        <Checkbox  onChange={handleToggleActiveArt} checked={renderAllState.activePieces} name="activePieces" />
                        }
                        label="Pieces In Galleries"
                    />
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
        })) : null
      }
      {/* This Renders Unlisted Art */}
      {
        renderAllState.unListed !== false ? (unlistedFilter.map((art) => { 
          return (<CardIndividual art={art} key={art.id} />)  
        })) : null
      }
      {/* This Renders Unsold Art */}
      {
        renderAllState.unsold !== false ? (unsoldFilter.map((art) => { 
          return (<CardIndividual art={art} key={art.id} />)  
        })) : null
      }
      {/* This Renders active Art */}
      {
        renderAllState.activePieces !== false ? (listedArt.map((art) => { 
          return (<CardIndividual art={art} key={art.id} />)  
        })) : null
      }
    </div>
    </>
  );
}

export default InfoPage;

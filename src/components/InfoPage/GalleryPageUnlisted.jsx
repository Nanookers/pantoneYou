import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardIndividual from './CardPage';

import './InfoPage.css'

function GalleryPageUnlisted() {

  const dispatch = useDispatch();

  const allArt = useSelector((store) => store.allArtReducer);
 
  
  useEffect(() => {
    dispatch({ type: 'SAGA_GET_ART' });
  }, []);

  
  return (
    <>
    <div className="container">
    {
        allArt
            .filter((art) => art.soldStatus === false)
            .map((art) => {
            return (
                <CardIndividual art={art} key={art.id} />
            );
            })
    }
    </div>
    </>
  );
}

export default GalleryPageUnlisted;

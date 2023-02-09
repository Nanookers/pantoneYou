import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardIndividual from './CardPage';


function InfoPage() {

  const dispatch = useDispatch();
  const allArt = useSelector((store) => store.allArtReducer);
  console.log(allArt);
  
  useEffect(() => {
    dispatch({ type: 'SAGA_GET_ART' });
  }, []);



  return (
    <div className="container">
      <p>Info Page</p>
      {
        allArt.map((art) => {
          return(
            <CardIndividual art={art} key={art.id} />
          )
        })
      }
    </div>
  );
}

export default InfoPage;

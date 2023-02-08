import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


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
    </div>
  );
}

export default InfoPage;

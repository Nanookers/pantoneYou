import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const InfoIndividual = () => {

    const params = useParams();
    console.log('params:', params);
    const dispatch = useDispatch();
  
    useEffect(() => {
        dispatch({
          type: 'FETCH_SINGLE_PIECE_DETAILS',
          payload: params.id 
        })
      }, [params.id])

  return (
    <>
    </>
  )
}

export default InfoIndividual
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function CardIndividual( {art} ){

    const dispatch = useDispatch();

    // On click, appear pop up to submit new information.
    // dispatch information together.
    // On backend, send the 

    const handleListClick = (event) => {
        event.preventDefault()
        console.log(art.id);
      }
    
    return (
        <>
        <h1>Card Goes Here</h1>
            <div key={art.id}>
                <img src={art.image} />
                <button onClick={handleListClick}>List</button>
        </div> 
        </>
    )
}

export default CardIndividual;
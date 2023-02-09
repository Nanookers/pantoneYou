import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListArtModal from './ListArtModal';


function CardIndividual( {art} ){
    
    const[ open, setOpen ] = useState(false) //for opening the modal
    const dispatch = useDispatch();

    // On click, appear pop up to submit new information.
    // dispatch information together.
    // On backend, send the 

    const handleListClick = (event) => {
        setOpen(true)
    }
    
    return (
        <>
        <h1>Card Goes Here</h1>
        <div key={art.id}>
            <img src={art.image} />
            <button onClick={handleListClick}>List</button>
            <ListArtModal open ={open} onClose = {() => setOpen(false)} art={art}/>
        </div> 
        </>
    )
}

export default CardIndividual;
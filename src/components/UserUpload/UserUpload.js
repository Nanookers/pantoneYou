import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';



function UserUpload() {
  
  const dispatch = useDispatch();
  
  const [ fileInput , setFileInput ] = useState('')
  const [ titleInput , setTitleInput ] = useState('')
  const [ priceInput , setPriceInput ] = useState(0)
  const [ descriptionInput , setdescriptionInput ] = useState('')
  
  
  
  useEffect(() => {
    // Fetch all  movies
    dispatch({ type: 'GET_FILE' });
  }, []); 
  
  const onFileChange = (event) => {
       
    // Update the state
    setFileInput({ selectedFile: event.target.files[0] });
   
  };

  
  const handleUpload = (event) =>{
    event.preventDefault();
    
    console.log(fileInput, titleInput, priceInput, descriptionInput );
    dispatch({
      type: 'SAGA_ADD_NEW_ART',
      payload: {
        fileInput,
        title: titleInput,
        price: priceInput,
        description: descriptionInput
      }

    })
    setFileInput('')
    setTitleInput('')
    setPriceInput(0)
    setdescriptionInput('')
  }
    return (
      <div className="container">
          <form onSubmit={handleUpload}>
            <TextField id="standard-basic" label="Title" 
              variant="standard" type="text"  value={titleInput} 
                onChange={(event) => setTitleInput(event.target.value)}/>

            <TextField id="standard-basic" label="Price" 
              variant="standard" type="number"  value={priceInput === 0 ? '' : priceInput} 
                onChange={(event) => setPriceInput(event.target.value)} />

            <TextField id="standard-basic" label="Description" 
              variant="standard" type="text"  value={descriptionInput}  
                onChange={(event) => setdescriptionInput(event.target.value)} />

            <Button variant="contained" component="label" onChange={onFileChange}>
                Upload File <input type="file" hidden />
            </Button>
            <Button variant="contained" type='submit'>Submit</Button>
          </form>
        
      </div>
    );
  }

export default UserUpload;

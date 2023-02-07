

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function UserUpload() {
  
  const dispatch = useDispatch();
  let images = useSelector((store) => store.imagesReducer)
  
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

   console.log(fileInput.selectedFile)
    // console.log('*********', fileInput)
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
  }
    return (
      <div className="container">
        <p>UplaodPage</p>
        <form onSubmit={handleUpload}>

          <input type="file" 
            placeholder='Upload File' 
                onChange={onFileChange}
          />
          <input type="text" 
            placeholder='Title'
                value={titleInput}
                    onChange={(event) => setTitleInput(event.target.value)}
          />
          <input type="number" 
            placeholder='Price' 
                 value={priceInput}
                    onChange={(event) => setPriceInput(event.target.value)}
          />
          <input type="text" 
            placeholder='Description'
                value={descriptionInput} 
                    onChange={(event) => setdescriptionInput(event.target.value)}
          />

          <button type='submit'>Submit</button>
        </form>
        
      </div>
    );
  }

export default UserUpload;

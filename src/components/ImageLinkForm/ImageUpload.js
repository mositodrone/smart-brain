import React from 'react'

const FileData = (selectedImage, OnUploadSubmit, onFileChange) => { 
      if (selectedImage) { 
        return ( 
        <div className="br3 ba b shadow-5 " style={{display: 'inlineBlock'}}>
      <p className='f3'>
        {'Upload your picture to try and chack the faces'}
      </p> 
          <label for="myfile">Select a file:</label>
           <input type="file" id="myfile" name="myfile" onChange={onFileChange}/>
            <h2>File Details:</h2> 
            <p>File Name: {selectedImage.name}</p> 
            <p>File Type: {selectedImage.type}</p> 
  {/*          <p> 
              Last Modified:{" "} 
              {selectedImage.lastModifiedDate.toDateString()} 
            </p> */}   
            <button onClick={OnUploadSubmit}/>
          </div>  
        ); 
      } else { 
        return ( 
          <div> 
            <br /> 
            <h4>Choose before Pressing the Upload button</h4> 
          </div> 
        ); 
      } 
    }; 

export default FileData
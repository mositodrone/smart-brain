import React from 'react'

 maxSelectFile=(event)=>{
    let files = event.target.files // create file object
        if (files.length > 1) { 
           const msg = 'Only 1 images can be uploaded at a time'
           event.target.value = null // discard selected file
           console.log(msg)
          return false;
 
      }
    return true;
 
 }

 checkMimeType=(event)=>{
    //getting file object
    let files = event.target.files 
    //define message container
    let err = ''
    // list allow mime type
   const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    for(var x = 0; x<files.length; x++) {
     // compare file type find doesn't matach
         if (types.every(type => files[x].type !== type)) {
         // create error message and assign to container   
         err += files[x].type+' is not a supported format\n';
       }
     };
  
   if (err !== '') { // if message not same old that mean has error 
        event.target.value = null // discard selected file
        console.log(err)
         return false; 
    }
   return true;
  
  }

 checkFileSize=(event)=>{
    let files = event.target.files
    let size = 15000 
    let err = ""; 
    for(var x = 0; x<files.length; x++) {
    if (files[x].size > size) {
     err += files[x].type+'is too large, please pick a smaller file\n';
   }
 };
 if (err !== '') {
    event.target.value = null
    console.log(err)
    return false
}

return true;

}

module.exports = {
   checkFileSize,
   checkMimeType,
   maxSelectFile
}
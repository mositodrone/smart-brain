import React from 'react';
import './FaceRecognition.css';

// {require(`${selectedImage}`)}
// src={require(`${ selectedImage }`)}

const FaceRecognition = ({imgAlt, imageUrl, box, selectedImage }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt={imgAlt} src={selectedImage} width='400px' height='auto'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
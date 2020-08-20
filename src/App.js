import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
// import ImgComp from './components/imgComp/imgComp';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import axios from 'axios';
import './App.css';
// const imgValid = './components/imgValidation/imgValidation' 
// import FileData from './components/ImageLinkForm/ImageUpload';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  loading: true,
  uploading: false,
  selectedFile:[],
  imgAlt: "blank",
  images: [],
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}  

// const maxSelectFile=(event)=>{
//     let files = event.target.files // create file object
//         if (files.length > 1) { 
//            const msg = 'Only 1 images can be uploaded at a time'
//            event.target.value = null // discard selected file
//            console.log(msg)
//           return false;
 
//       }
//     return true;
 
// }

// const toastColor = { 
//   background: '#505050', 
//   text: '#fff' 
// }

     
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

// imgLoader = (selectedImage) => {
//   if (this.state.selectedFile = !null){
//     this.setState({selectedImage: " "}) 
//   } else {
//     this.setState({selectedFile: './blank.png'})
//   }
// }
  
  fileSelectedHandler = async event => {
  // if(maxSelectFile()){
    this.setState({
      selectedFile: await event.target.files[0],
      imgAlt: this.state.selectedFile.name,
      loaded: 0,
    })
  console.log(this.state.selectedFile)
 }
// }
  fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('file', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('http://localhost:3201/imageUpload',fd, { // receive two parameter endpoint url ,form data 
    UploadProgress: progressEvent => {
      console.log('Upload Progress' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%' )
    }
  })
  .then(res => { // then print response status
    console.log(res.statusText)
  })
}
  
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
//   onFileChange = event => { 
//    // Update the state 
//       this.setState({selectedImage: event.target.files[0]}); 
// }; 

//checks through image address
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://hidden-wave-38166.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://hidden-wave-38166.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
            console.log(response) 
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

// //checks uploaded image
// // https://hidden-wave-38166.herokuapp.com
//   OnUploadSubmit = () => {
//      this.setState({imageUpload: this.state.selectedImage, 
//                     imageName:   this.state.selectedImage.name});
//       fetch('http://localhost:3200/selectedImage', {
//         method: 'post',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//           image: this.state.selectedImage
//         })
//       })
//       .then(response => response.json())
//       .then(response => {
//         if (response) {
//           fetch('https://hidden-wave-38166.herokuapp.com/image', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               id: this.state.user.id
//             })
//           })
//             .then(response => response.json())
//             .then(count => {
//               this.setState(Object.assign(this.state.user, { entries: count}))
//             })
//             .catch(console.log)
//             console.log(response) 
//         }
//         this.displayFaceBox(this.calculateFaceLocation(response))
//       })
//       .catch(err => console.log(err));
//       console.log(this.state.selectedImage);
//   }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <h1>OR</h1>
            <h1>Upload one from your Device</h1>  
              <input style={{display: "none"}} type="file" id='image' onChange={this.fileSelectedHandler.bind(this)}ref={fileInput => this.fileInput = fileInput}/>
              <button className='btn' onClick={() => this.fileInput.click()}>Pick File</button>
              <button className='btn' onClick={this.fileUploadHandler.bind(this)}>Detect Face</button>
             { 
                 /* <ImgComp />
                  <FileData onFileChange={this.onFileChange}
                             OnUploadSubmit={this.OnUploadSubmit}
                             selectedImage={selectedImage}
                  */ 
            } 
              <FaceRecognition box={box} imageUrl={imageUrl} selectedImage={this.state.selectedFile}/>  
           </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;

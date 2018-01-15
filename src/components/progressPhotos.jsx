import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../actions/example.jsx'
import axios from 'axios'

class Progress extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id: this.props.id,
        album : []
      }
      this.handleUpload = this.handleUpload.bind(this)
      this.getPhotos = this.getPhotos.bind(this)
  }

  componentDidMount(){
    console.log('hiya1')
    this.getPhotos()
  }

  getPhotos() {
    console.log('hiya2')
    function _arrayBufferToBase64( buffer ) {
          var binary = '';
          var bytes = new Uint8Array( buffer );
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
          }
             return window.btoa( binary );
          }
    axios.post('/server/photoRequest', {user: this.state.id}).then((data) => {
      console.log('heres your shit', data.data)
      var alb = data.data.map((val) => {
        return _arrayBufferToBase64(val.pic.data)
      })
      this.setState({album: alb}, () => {
        console.log('did my state change??/', this.state)
      })
    })
  }

  handleUpload(){
    var file = document.getElementById('file').files;
    if (file) {
      var formData = new FormData();
      formData.append("image", file[0]);
      formData.append('user', this.state.id);
        //  getAsText(file);
        // alert("Name: " + file.name + "\n" + "Last Modified Date :" + file.lastModifiedDate);
        axios.post('/server/pic', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((data) => {
          console.log('test')
          // var testJpg = data.data.image.data.data
          // var image = _arrayBufferToBase64(testJpg)
          // console.log(
          //   'image', image)
          // document.getElementById("myimage").src = 'data:image/png;base64,'+image;
          this.getPhotos()
        })
    }
  }

  render() {
    if(this.state.album.length < 1){
    return(
    <div style={{backgroundColor:'rgba(0,0,0,.3)', fontFamily: 'Sans-Serif'}}> <h2 style={{color:'white'}}>Add Proof to Your Accomplishments</h2>

<form method="POST" action="/server/pic" encType="multipart/form-data" target='_self'>
 <input type='file' id='file' name='file'/>
 <button type='button' className="btn btn-lg" onClick={this.handleUpload}>Submit</button>
</form>

<img src='https://ramblinginkasaurus.files.wordpress.com/2015/09/runningstickfigure.gif' />

    </div>
    )
    } else{
      return(
      <div style={{backgroundColor:'rgba(0,0,0,.3)', fontFamily: 'Sans-Serif'}}> <h2 style={{color:'white'}}>Add Proof to Your Accomplishments</h2>

<form method="POST" action="/server/pic" encType="multipart/form-data" target='_self'>
 <input type='file' id='file' name='file'/>
 <button type='button' className="btn btn-lg" onClick={this.handleUpload}>Submit</button>
</form>

<div className='container' style={{display: 'flex', flexDirection:'row'}}>
{this.state.album.map((val) => {
  return (<img style={{height:'250px', width:'250px', padding:'5px', backgroundColor:'rgba(0,0,0,.3)'}}src={'data:image/png;base64,'+val} id='myimage' />)
})}

</div>


    </div>

        )
    }
  }


}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    id: store.auth.auth,
    user: store.example.user
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Progress));
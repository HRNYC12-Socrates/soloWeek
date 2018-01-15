import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';

class Measure extends React.Component {
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        heightFeet: '',
        heightInches: '',
        weight: '',
        waist: '',
        hip: '',
        neck: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.calculateStats = this.calculateStats.bind(this)
  }

  handleChange (e){
    e.persist()
    console.log(e.target, e.target.id, e.target.value)
    var decorator = () => {
      var obj = {}
      obj[e.target.id] = e.target.value
      return obj
    }
    this.setState(decorator)
  }

  // showResults() {
  //   var myElement = document.querySelector("#results")
  // }

  calculateStats(){
    var date = new Date()
    console.log('state', this.state, date)
    var height = Number(this.state.heightFeet)*12 + Number(this.state.heightInches)
    var bfPercent = 495/(1.29579-.35004 * Math.log10(Number(this.state.waist)*2.54 + Number(this.state.hip)*2.54 - Number(this.state.neck)*2.54) + .22100*Math.log10(height*2.54)) - 450
    console.log('height: ', height, 'bfPercent: ', bfPercent)
    var fatMass = Number(this.state.weight)*(bfPercent/100)
    var leanMass = Number(this.state.weight) - fatMass
    var payload = {
      bfPercent: bfPercent,
      fatMass: fatMass,
      leanMass: leanMass
    }
    this.setState(payload, () => {
      var send = {
        user: this.state.id,
        payload: payload
      }
      axios.post('/server/measure', send)
    })
  }

  render() {
    if(!this.state.bfPercent){
      return(
    <div style={{backgroundColor:'rgba(0,0,0,.3)', fontFamily: 'Sans-Serif'}}>

    <div style={{fontFamily: 'Sans-Serif', color:'white'}}>Height: <input onChange={this.handleChange} value={this.state.heightFeet} id='heightFeet' placeholder='feet'/> feet <input onChange={this.handleChange} value={this.state.heightInches} id='heightInches' placeholder='inches' /> inches </div> 
    <div style={{fontFamily: 'Sans-Serif', color:'white'}}>Weight: <input onChange={this.handleChange} value={this.state.weight} id='weight' placeholder='Weight' /> lbs </div> 
    <div style={{fontFamily: 'Sans-Serif', color:'white'}}>Waist(at narrowest): <input onChange={this.handleChange} value={this.state.waist} id='waist' placeholder='Waist' /> inches </div>
    <div style={{fontFamily: 'Sans-Serif', color:'white'}}>Hip(at widest): <input onChange={this.handleChange} value={this.state.hip} id='hip' placeholder='Hip' /> inches</div>
    <div style={{fontFamily: 'Sans-Serif', color:'white'}}>Neck(at narrowest): <input onChange={this.handleChange} value={this.state.neck} id='neck' placeholder='Neck' /> inches</div>
    <div style={{fontFamily: 'Sans-Serif'}}><button onClick={this.calculateStats} className="btn btn-lg btn-block" type='button' style={{fontFamily: 'Sans-Serif'}}>Submit</button></div>

    </div>
      )
    } else{
      return(    

    <div style={{backgroundColor:'rgba(0,0,0,.3)', fontFamily: 'Sans-Serif'}}>

    <div style={{fontFamily: 'Sans-Serif', color:'white'}}>Height: <input onChange={this.handleChange} value={this.state.heightFeet} id='heightFeet' placeholder='feet'/> feet <input onChange={this.handleChange} value={this.state.heightInches} id='heightInches' placeholder='inches' /> inches </div> 
    <div style={{fontFamily: 'Sans-Serif', color:'white'}}>Weight: <input onChange={this.handleChange} value={this.state.weight} id='weight' placeholder='Weight' /> lbs </div> 
    <div style={{fontFamily: 'Sans-Serif', color:'white'}}>Waist(at narrowest): <input onChange={this.handleChange} value={this.state.waist} id='waist' placeholder='Waist' /> inches </div>
    <div style={{fontFamily: 'Sans-Serif', color:'white'}}>Hip(at widest): <input onChange={this.handleChange} value={this.state.hip} id='hip' placeholder='Hip' /> inches</div>
    <div style={{fontFamily: 'Sans-Serif', color:'white'}}>Neck(at narrowest): <input onChange={this.handleChange} value={this.state.neck} id='neck' placeholder='Neck' /> inches</div>
    <div style={{fontFamily: 'Sans-Serif'}}><button onClick={this.calculateStats} className="btn btn-lg btn-block" type='button' style={{fontFamily: 'Sans-Serif'}}>Submit</button></div>
    <div id='results' style={{fontFamily: 'Sans-Serif', color:'white', padding:'100px'}}>
    <div style={{color:'white', fontFamily: 'Sans-Serif', textAlign:'center'}}> Body Fat: {this.state.bfPercent.toFixed(2)}% </div>
    <div style={{color:'white', fontFamily: 'Sans-Serif', textAlign:'center'}}> Fat Mass: {this.state.fatMass.toFixed(2)} (lbs) </div>
    <div style={{color:'white', fontFamily: 'Sans-Serif', textAlign:'center'}}> Lean Mass: {this.state.leanMass.toFixed(2)} (lbs) </div>
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
    user: store.auth.username,
    goals: store.auth.goals
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Measure));
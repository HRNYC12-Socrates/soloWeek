import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import reactDragula from 'react-dragula';
import dragula from 'dragula';
import axios from 'axios';

class Week extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null,
        monday: this.props.monday || ['5'],
        tuesday: this.props.tuesday || ['5'],
        wednesday: this.props.wednesday || ['5'],
        thursday: this.props.thursday || ['5'],
        friday: this.props.friday || ['5'],
        saturday: this.props.saturday || ['5'],
        sunday: this.props.sunday || ['5']
      }
      this.handleMoving = this.handleMoving.bind(this)
      this.saveWeek = this.saveWeek.bind(this)
  }

  handleMoving (el, target, old) {
  	console.log('is targ what we think it is??', old.id, this.state)
  	var targ = target.id
  	var old = old.id
  	var firstAddition = () => {
  		console.log('this', this)
  	  var obj = {};
  	  obj[targ] = [el.value]
  	  return obj
    }
    var addition = () => {
    	var obj = {}
    	obj[targ] = this.state[targ].concat([el.value])
    	return obj
    }

  	if(this.state[targ][0] === '5'){
  	   this.setState(firstAddition)
  	} else{
  		this.setState(addition)
  	}
  	var backToRestDay = () => {
  		var obj = {}
  		obj[old] = ['5']
  		return obj
  	}
  	var removeWorkout = () => {
  		var obj = {}
  		var temp = this.state[old].indexOf(el.value)
  		obj[old] = this.state[old].splice(temp, 1)
  	}
  	if(this.state[old]){
  		var length = this.state[old].length
  		if(length === 1){
  			this.setState(backToRestDay)
  		} else{
  			this.setState(removeWorkout)
  		}
  	}
  }



//   inputChangeHandler : function (event) {
//     var stateObject = function() {
//       returnObj = {};
//       returnObj[this.target.id] = this.target.value;
//          return returnObj;
//     }.bind(event)();

//     this.setState( stateObject );    
// },





  componentDidMount() {
  	var that = this
  	dragula([document.getElementById('saturday'), document.getElementById('friday'), document.getElementById('monday'), document.getElementById('sunday'), document.getElementById('thursday'), document.getElementById('wednesday'), document.getElementById('tuesday'), document.getElementById('Workouts')])
  .on('drag', function (el) {
    el.className = el.className.replace('ex-moved', '');
  }).on('drop', function (el, target, old) {
  	that.handleMoving(el, target, old)
    el.className += ' ex-moved';
  }).on('over', function (el, container) {
    container.className += ' ex-over';
  }).on('out', function (el, container) {
    container.className = container.className.replace('ex-over', '');
  });
    // var container = ReactDOM.findDOMNode(this);
    // reactDragula([container]);
  }

  saveWeek () {
  	console.log('inside save week')
  	var payload = {
  		user: this.state.id,
  		monday: this.state.monday,
  		tuesday: this.state.tuesday,
  		wednesday: this.state.wednesday,
  		thursday: this.state.thursday,
  		friday: this.state.friday,
  		saturday: this.state.saturday,
  		sunday: this.state.sunday
  	}

  	axios.post('/server/saveWeek', payload).then((result) => {
  		console.log(result)
  	})
  }

  render() {

  	console.log('WERE RENDERING SHITT', this.state)
  	return (
  		<div>
  		<div>
  		<div className='container' ><button type='button' onClick={this.saveWeek} style={{backgroundColor:'rgba(0,0,0,.5)', fontFamily: 'Sans-Serif', float:'right'}}><h3 style={{color:'white', float:'right'}}>Save!</h3></button></div>
  		<h1 style={{color:'white', textAlign:'center'}}>Weekly Planner</h1>
  		<div id='Workouts' style={{display: 'flex', flexDirection:'row'}}>
  		<button value='1' className="btn btn-lg" type='button' style={{backgroundColor:'rgba(0,0,0,.3)', fontFamily: 'Sans-Serif', float:'left'}}><h4 style={{color:'white'}}>Chest and Back</h4></button>
        <button value='3' className="btn btn-lg" type='button' style={{backgroundColor:'rgba(0,0,0,.3)', fontFamily: 'Sans-Serif', float:'left'}}><h4 style={{color:'white'}}>Legs</h4></button>
        <button value='2' className="btn btn-lg" type='button' style={{backgroundColor:'rgba(0,0,0,.3)', fontFamily: 'Sans-Serif', float:'left'}}><h4 style={{color:'white'}}>Shoulders and Arms</h4></button>
        <button value='4' className="btn btn-lg" type='button' style={{backgroundColor:'rgba(0,0,0,.3)', fontFamily: 'Sans-Serif', float:'left'}}><h4 style={{color:'white'}}>Cardio</h4></button>
  		</div>
  		</div>

  		<div style={{display: 'flex', flexDirection:'row'}}> 

  		<div id='sunday' value='sunday' className='container' style={{maxWidth:'25%', padding:'50px', border:'5px solid #cecece'}}> <h2 style={{color:'white', textAlign:'center', padding:'50px'}}>Sunday</h2>
  		</div>
  		<div id='monday' value='monday' className='container' style={{maxWidth:'25%', border:'5px solid #cecece', padding:'50px'}}> <h2 style={{color:'white', textAlign:'center', padding:'50px'}}>Monday</h2>
  		</div>
  		 <div id='tuesday' value='tuesday' className='container' style={{maxWidth:'25%', border:'5px solid #cecece', padding:'50px'}}> <h2 style={{color:'white', textAlign:'center', padding:'50px'}}>Tuesday</h2>
  		</div>
  		<div id='wednesday' value='wednesday' className='container' style={{maxWidth:'25%', border:'5px solid #cecece', padding:'50px'}}> <h2 style={{color:'white', textAlign:'center', padding:'50px'}}>Wednesday</h2>
  		</div>

  		  		</div>

  		<div style={{display: 'flex', flexDirection:'row'}}> 


  		<div id='thursday' value='thursday' className='container' style={{maxWidth:'34%', border:'5px solid #cecece', padding:'50px'}}> <h2 style={{color:'white', padding:'50px', textAlign:'center'}}>Thursday</h2>
  		</div>
  		<div id='friday' value='friday' className='container' style={{maxWidth:'34%', border:'5px solid #cecece', padding:'50px'}}> <h2 style={{color:'white', padding:'50px', textAlign:'center'}}>Friday</h2>
  		</div>
  		<div id='saturday' value='saturday' className='container' style={{maxWidth:'34%', border:'5px solid #cecece', padding:'50px'}}> <h2 style={{color:'white', padding:'50px', textAlign:'center'}}>Saturday</h2>
  		</div>
  		</div>

  		</div>)
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
)(Week));
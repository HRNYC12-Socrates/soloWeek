import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios';

class Person extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null,
        workout: {
        	NoData: {
        		sets: 0,
        		reps: 0
        	}
        },
        workoutName: ''
      }
  }


  //oo boy we have some intense stuff here to do display wise
  componentDidMount () {
  	var days = {
  		0: 'sunday',
  		1: 'monday',
  		2: 'tuesday',
  		3: 'wednesday',
  		4: 'thursday',
  		5: 'friday',
  		6: 'saturday'
  	}
  	var date = new Date();
  	var n = date.getDay();
  	var today = days[n]

  	var payload = {
  		user: this.state.id,
  		day: today
  	}


  	axios.post('/server/todaysWorkout', payload).then((data) =>{
  		this.setState({
  			workoutName: data.data.name,
  			workout: data.data.payload
  		})
  	})
  }

  render() {
  	return (
  	  <div>
  	    <div className='container' style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.3)', color:'white', textAlign:'center'}}> <h2> 
  	    {this.state.goals.map((val) => {
  	    	console.log('valll', val)
  	    	return(<div className='container' style={{display: 'table-cell', textAlign:'left', borderColor:'rgba(200,200,200, 0.8)'}}> {val} </div>)
  	    })} 
  	    </h2> </div>
  	    <div className='container' style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.3)', color:'white', textAlign:'left'}}> <h1> Welcome {this.state.username} ! Here is your workout for the day:</h1>
  	    <div style={{textAlign:'center'}}> <h2 style={{color:'white', float:'center'}}>{this.state.workoutName}</h2></div>
  	    <div style={{backgroundColor: 'rgba(0,0,0)'}}>
  	    {Object.keys(this.state.workout).map((key, index) => {
  	    	return(
  	    		<div style={{color:'white', textAlign:'center'}}>
  	    		{key} for {this.state.workout[key].sets} sets of {this.state.workout[key].reps}
  	    		</div>
  	    		)
  	    })}
  	    </div>
  	    </div>

  	  </div>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    id: store.auth.auth,
    user: store.auth.user,
    goals: store.auth.goals
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Person));
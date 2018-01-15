import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../actions/example.jsx'
import axios from 'axios'
import Questionaire from './goalsQuestionaire.jsx'
import Person from './personal.jsx'

class Profile extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id : this.props.id || null,
        username : this.props.user || null,
        goals : this.props.goals || null
      }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({goals: nextProps.goals})
  }

  render() {
    if(!this.state.goals){
      //quesitonaire component
      return(
        <div> <Questionaire /> </div>
      )
    } else{
      return(
        <div> <Person /> </div>
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
)(Profile));
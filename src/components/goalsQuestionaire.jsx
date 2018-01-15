import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import axios from 'axios'
import Question from './question.jsx'
import submitGoals from '../actions/goals.jsx'
import c3 from 'c3';

class Questionaire extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        list : [['Tell Us About Your Fitness Goals', 'Continue'],['Strength or Aesthetics', 'Strength', 'Aesthetics'], ['Bulk Up or Trim Down', 'Bulk Up', 'Trim Down']],
        index : 0,
        goals: []
      }
      this.nextQuestion = this.nextQuestion.bind(this)
  }

  nextQuestion(e) {
    if(this.state.index < this.state.list.length-1){
      this.setState({index: this.state.index+1, goals: this.state.goals.concat([e.target.value])})
    } else{
      this.setState({goals: this.state.goals.concat([e.target.value])}, () => {
        axios.post('/server/goals', [this.props.auth, this.state.goals.slice(1)]).then(() => {this.props.dispatch(submitGoals(this.state.goals.slice(1)))})
      })

    }
  }

  render() {
    return(
    <div> <Question q={this.state.list[this.state.index]} click={this.nextQuestion} /> </div>
    )
  }


}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    auth: store.auth.auth
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Questionaire));
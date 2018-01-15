import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../actions/example.jsx'
import axios from 'axios'
import auth from '../actions/authorize.jsx'

class newUser extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        username : '',
        password : ''
      }
      this.onPasswordChange = this.onPasswordChange.bind(this);
      this.onUsernameChange = this.onUsernameChange.bind(this);
      this.handleButtonClick = this.handleButtonClick.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps)
    //need to basically set props here which is anmnoying
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  onUsernameChange(e) {
    this.setState({
      username : e.target.value
    })
  }

  handleButtonClick(){
    var payload = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('/server/signup', payload).then((response) =>{
      if(response.data){
        this.props.history.push('/')
      } else{
        this.props.history.push('/')
      }
    })
  }
  

  render() {
    console.log('heres the state', this.state, this.props)
    return (
      <div className="container" style={{backgroundColor:'rgba(0,0,0,0.2)', textAlign:'center', maxWidth: '30%'}}>
      <h1 style={{fontFamily: 'Sans-Serif', color:'white'}}> Join The Movement </h1>
        <input onChange={this.onUsernameChange} placeholder="Username" value={this.state.username} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
        <input onChange={this.onPasswordChange} placeholder='Password' type='password' value={this.state.password} style={{backgroundColor:'rgba(255,255,255,0.6)', fontFamily: 'Sans-Serif'}} />
        <button onClick={this.handleButtonClick} className="btn btn-lg btn-block" type='button' style={{backgroundColor:'rgba(255,255,255,0.4)', fontFamily: 'Sans-Serif'}}>
          <span className="glyphicon glyphicon-search">Enter</span>
        </button>
      </div>
    )
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    foo: store.example.foo,
    user: store.example.user
  };
};

export default withRouter(connect(
  mapStoreToProps
)(newUser));
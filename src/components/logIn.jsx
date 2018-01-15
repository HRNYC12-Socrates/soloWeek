console.log('Hello World!');
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../actions/example.jsx'
import axios from 'axios'
import auth from '../actions/authorize.jsx'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';


//login
class LogIn extends React.Component{
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

  componentDidMount() {
    //runs only once we can set a general init dispatch/action here
    // this.props.dispatch(ChangeUser('Jason'))
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

    this.props.dispatch(ChangeUser(payload))

    axios.post('/server/userLogIn', payload).then((response) =>{
      console.log('got back :', response)
      if(response.data){
        this.props.dispatch(auth(response.data))
      } else{
        this.props.history.push('/signUp')  
      }

    }).catch((err) => {
      throw err
    })

  }

  render() {
    console.log('heres the state', this.state, this.props)
    return (
      <div className="container" style={{backgroundColor:'rgba(0,0,0,0.2)', textAlign:'center', maxWidth: '30%'}}>
      <h1 style={{fontFamily: 'Sans-Serif', color:'white'}}> Who Are You? </h1>
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
    user: store.example.user,
    password: store.example.password
  };
};

export default withRouter(connect(
  mapStoreToProps
)(LogIn));




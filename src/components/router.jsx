import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LogIn from './logIn.jsx';
import newUser from './newUser.jsx';
import Profile from './profile.jsx';
import Weekly from './week.jsx';
import Analytics from './analytics.jsx'
import Measure from './measurements.jsx';
import Progress from './progressPhotos.jsx';
import Logout from '../actions/userLogout.jsx'
import {
  HashRouter as Router,
  Route,
  Link
 } from 'react-router-dom';

class Header extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        auth: this.props.auth
      }
      this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps (nextProps){
    console.log('inside header', nextProps)
    if(!this.state.auth){
    this.setState({auth: nextProps.auth})
    }
  }

    handleClick() {
      console.log('dafuq', this.props)
      this.props.dispatch(Logout())
      this.setState({auth:null}, this.props.history.push('/'))
    }

  render() {
    if(!this.state.auth){
    return(
      <div stlye={{backgroundColor: 'rgba(0,0,0, 0.9)'}}>
        <div style={{textAlign:'left', backgroundColor: 'rgba(0,0,0, 0.3)'}}>
        <ul>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to="/">Log In!</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/signUp'>Signup</Link></button>
        </ul>
        </div>

        <hr/>

        <Route exact path='/' component={LogIn}/>
        <Route exact path='/signUp' component={newUser}/>

      </div>
      ) } else{
      return (
              <div>
        <div style={{textAlign:'left', backgroundColor: 'rgba(0,0,0, 0.2)'}}>
        <ul>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to="/">Profile</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/analytics'>Analytics</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/measurements'>Measurements</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/progress'>Progress Photos</Link></button>
        <button className="btn btn-secondary btn-lg" style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}><Link style={{color:'white'}} to='/weekly'>Your Week</Link></button>
        <button className="btn btn-secondary btn-lg" onClick={this.handleClick} style={{fontFamily: 'Sans-Serif', backgroundColor: 'rgba(0,0,0, 0.2)'}}>Log out</button>
        </ul>
        </div>

        <hr/>

        <Route exact path='/' component={Profile}/>
        <Route exact path='/weekly' component={Weekly}/>
        <Route exact path='/measurements' component={Measure}/>
        <Route exact path='/analytics' component={Analytics}/>
        <Route exact path='/progress' component={Progress}/>
      </div>
        )
    }
  }
}

const mapStoreToProps = (store) => {
  console.log('store', store);
  return {
    auth: store.auth.auth,
  };
};

export default withRouter(connect(
  mapStoreToProps
)(Header));
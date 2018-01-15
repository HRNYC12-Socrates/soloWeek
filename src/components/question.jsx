import React from 'react';
import ReactDOM from 'react-dom';

const question = function(props){
  return (
    <div className='container' style={{backgroundColor: 'rgba(0,0,0, 0.2)', textAlign:'center', maxWidth:'50%'}}>
    <div className='container' style={{color:'white'}}>
    <h1> {props.q[0]} </h1>
    <button type="button" className="btn btn-lg btn-block" onClick={props.click} value={props.q[1]}>{props.q[1]}</button>
    <button type="button" className="btn btn-lg btn-block" onClick={props.click} value={props.q[2]}>{props.q[2]}</button>
    </div>

    </div>
  )
}

export default question
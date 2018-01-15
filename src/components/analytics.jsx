import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ChangeUser from '../actions/example.jsx'
import axios from 'axios'
import c3 from 'c3';



class Analytics extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        id: this.props.id
      }
      this.updateGraph = this.updateGraph.bind(this)
  }

  componentDidMount () {
    // axios.post('/server/graphData', {user: this.state.id}).then((response) => {
    //   console.log(response)
    this.updateGraph()
    // })
  }

  updateGraph() {
    var chart = c3.generate({
    bindto: '#chart',
    data: {
        x: 'x',
        columns: [
            ['x', 1, 7, 14, 21, 28, 35],
            ['FatMass', 30, 27, 25, 24, 22, 20],
            ['LeanMass', 165, 166, 170, 173, 178, 182]
        ],
        types: {
          FatMass: 'area',
          LeanMass: 'area'
          // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
        },
        groups: [['FatMass', 'LeanMass']]
    }
});

    var chart2 = c3.generate({
    bindto: '#chart2',
    data: {
        x: 'x',
        columns: [
            ['x', 1, 7, 14, 21, 28, 35],
            ['bf%', 25, 24, 22, 20, 18, 15],
        ]
    }
});
  }

  render() {
    return(<div>
      <div style={{padding:'25px', backgroundColor:'rgba(0,0,0,.3)'}}>
      <h1 style={{color:'white', textAlign:'center', fontFamily: 'Sans-Serif'}}> Body Composition </h1>
    <div id='chart' style={{backgroundColor:'rgba(256,256,256,.7)', fontFamily: 'Sans-Serif', color:'white'}}> </div>
    </div>
    <div style={{padding:'25px', backgroundColor:'rgba(0,0,0,.3)'}}>
    <h1 style={{color:'white', textAlign:'center', fontFamily: 'Sans-Serif'}}> Body Fat Percentage </h1>
    <div id='chart2' style={{backgroundColor:'rgba(256,256,256,.7)', fontFamily: 'Sans-Serif', color:'white'}}> </div>
    </div>
    </div>
    )
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
)(Analytics));
import { combineReducers} from 'redux'

import example from './example.jsx'
import { routerReducer } from 'react-router-redux';
import auth from './authorize.jsx'


export default combineReducers({
	example,
	auth,
	routing: routerReducer
})
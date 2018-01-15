import { applyMiddleware, createStore } from "redux";
//MiddleWares
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
//Reducers
import reducer from "./reducers/index.jsx";

const middleWare = applyMiddleware(promise(), thunk)

//need a router reducer


export default createStore(reducer, middleWare)
import {combineReducers, createStore} from "redux"
import UserReducer from "./reducer";

const reducers = combineReducers ({UserReducer})

const store = createStore(reducers);

export default store;
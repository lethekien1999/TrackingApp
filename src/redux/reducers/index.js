import {combineReducers} from 'redux';
import recordReducer from './record.reducers'
import mapTypeReducer from "./maptype.reducers";

export default combineReducers({
    record:recordReducer,
    mapType:mapTypeReducer
});

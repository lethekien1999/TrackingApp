import { Alert } from 'react-native'
import {record} from '../../ulti/const'
const default_state={
    time:1,
    km:2,
}

export default reducer = (state=default_state,action)=>{
	switch(action.type){
        case record.KM:
            state = {...state,km:action.payload}
            return state;
        case record.TIME:
            state = {...state,time:action.payload}
            return state;
        default:
            return state;
    }
}
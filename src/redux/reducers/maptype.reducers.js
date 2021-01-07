import {mapType} from '../../ulti/const'
import { Alert } from 'react-native'

const default_state='standard'

export default reducer = (state=default_state,action)=>{
	switch(action.type){
        case mapType.SWITCHTYPE:
            if(state=="standard"){
                state="satellite"
            }else if(state=="satellite") {
                state="hybrid"
            } else if(state=="hybrid") {
                state="terrain"
            } else if(state=="terrain") {
                state="none"
            } else if(state=="none") {
                state="standard"
            }
            return state;
        default:
            return state;
    }
}
import {record}from '../../ulti/const'


export const setDis=(data)=>{
	return {
		type:record.KM,
		payload:data
	}
}

export const setTime=()=>{
	return {
		type:record.TIME,
	}
}

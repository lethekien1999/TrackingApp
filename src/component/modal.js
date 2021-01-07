import React, { Component } from 'react'
import {View, Text, Modal,TouchableOpacity,TouchableWithoutFeedback} from 'react-native'

export default class ModalRecord extends Component {
    constructor(props){
		super(props)
		this.state={
			show:false
		}
	}

	open=()=>{
		this.setState({
			show:true
		})
	}

	close=()=>{
		this.setState({
			show:false
		})
	}
  
    render(){
		return (
			<Modal 
				animationType="fade"
				transparent={true}
				visible={this.state.show}
				onRequestClose={() => {this.close()}}>

				<TouchableOpacity 
					style={{
						position:'absolute',top:0,right:0,
						width:'100%',height:'100%',backgroundColor: 'rgba(0, 0, 0, 0.0)'}} 
					activeOpacity={1} 
					onPress={() => {this.close()}} >

					<TouchableWithoutFeedback>

						<View 
							style={{
								position:'absolute',bottom:70,
								right:70,backgroundColor:'rgba(0,0,0,0)'}}>
							{this.props.content_view}
						</View>

					</TouchableWithoutFeedback>

				</TouchableOpacity>   

			</Modal>
		)
	}
}


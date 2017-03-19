import Type from "./type";
import React from 'react';

export default class Types extends React.Component{
	render(){
		let {types,activeTypes,onTypeClick,notes} = this.props
		// console.log('types')
		// console.log(types)
		let type = types && activeTypes?
		types.map((type,index) =>{
			let className = activeTypes.indexOf(type)<0?'type-btn':'type-btn active'
			return <Type 
				key={index}
				type ={type}
				className = {className}
				onClick = {()=>onTypeClick(type,this.props)} 
			/>
		})
		:
		'请稍等'
		return(
			<div className='type-wrap'>
				{type}
			</div>
		)
	}
}

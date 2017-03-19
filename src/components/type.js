import React from 'react';

export default class Type extends React.Component{
	render(){
		let {onClick,className,type} = this.props
		return(
			<button
				onClick = {onClick}
				className={className}>
				{type}
			</button>
		)
	}
}
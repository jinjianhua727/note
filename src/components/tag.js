import React from 'react';

export default class Tag extends React.Component{
	render(){
		let {onClick,className,tag} = this.props
		return(
			<button
				onClick = {onClick}
				className={className}>
				{tag}
			</button>
		)
	}
}
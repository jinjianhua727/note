var React = require('react')
import PCHeader from './PC_header'


export default class PCIndex extends React.Component{
	render(){
		return (
			<div>
				<PCHeader types={['js','h5','react']}/>
				PCIndex
			</div>
		)
	}
}
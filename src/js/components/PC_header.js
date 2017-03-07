var React = require('react')
import CommonType from './common_type';
export default class PCHeader extends React.Component{
	componentDidMount(){
		// console.log(this.props)
	}
	render(){

		return (
			<div className="header">
				<CommonType ref='common_type' types={this.props.types}/>
			</div>
		)
	}
}
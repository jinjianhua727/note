var React = require('react')
import PCHeader from './PC_header'
import $ from 'jquery';

export default class PCIndex extends React.Component{
	constructor(){
		super()
		this.state = {
			notes : [],
			types :[],
			tags : []
		}
	}
	componentDidMount(){
		$.get('../../data.js')
		.fail(function (e) {
			console.log(e)
		})
		.done(function (data) {
			// console.log(notes)
			let types = this.state.types,
			tags = this.state.tags
			this.state.notes = notes
			notes.forEach(function (value,index) {
				let tagArr = value.tags.split(' ')
				if (tagArr.length>=0) {
					tagArr.forEach(function (tag) {
						if (tags.indexOf(tag)<0) {
							tags.push(tag)
						}
					})
				}
				if (types.indexOf(value.type)<0) {
					types.push(value.type)
				}
			})
			console.log(types)
			console.log(tags)
			this.refs
			.pc_header
			.refs
			.common_type
			.getTypes(types)
		}.bind(this))
	}
	render(){
		return (
			<div>
				<PCHeader ref='pc_header' types={this.state.types}/>
				PCIndex
			</div>
		)
	}
}
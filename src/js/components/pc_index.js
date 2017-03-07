var React = require('react')
import PCHeader from './PC_header'
import PCBlogList from './PC_blogList'
import CommonTag from './common_tag'
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
		$.get('../../data.json')
		.fail(function (e) {
			console.log(e)
		})
		.done(function (data) {
			// console.log(notes)
			let types = this.state.types,
			tags = this.state.tags,
			notes = data;
			
			notes = notes.sort(function (a,b) {
				return parseInt(b.id) - parseInt(a.id);
			})
			notes.forEach((value,index)=>{
				value.type = value.type.toLowerCase()
				value.tags = value.tags.toLowerCase()
				if (value.hot) {
					notes.splice(index,1)
					notes.unshift(value)
				}
			})
			
			notes.forEach(function (value,index) {
				let tagArr = value.tags.split(' ')
				if (tagArr.length>=0) {
					tagArr.forEach(function (tag) {
						tag = tag.toLowerCase()
						if (tags.indexOf(tag)<0) {
							tags.push(tag)
						}
					})
				}
				let type = value.type.toLowerCase()
				if (types.indexOf(type)<0) {
					types.push(type)
				}
			})
			this.state.notes = notes
			types.unshift('all')
			this.refs
			.pc_header
			.refs
			.common_type
			.getTypes(types)

			this.refs
			.blog_list
			.getNotes(this.state.notes)

			this.refs
			.common_tag
			.getTags(tags)
		}.bind(this))
	}
	switchBlog(activeType){
		this.refs.blog_list.switchNotes(activeType)
	}
	switchNotesByTag(activeTag){
		this.refs.blog_list.switchNotesByTag(activeTag)
	}
	switchTagByType(type){
		var activeTag = []
		this.state.notes.forEach((value)=>{
			if (value.type === type) {
				var tagArr = value.tags.split(' ');
				tagArr.forEach((tag)=>{
					if (activeTag.indexOf(tag)<0) {
						activeTag.push(tag)
					}
				})
			}
			
		})
		this.refs.common_tag.switchTagByType(activeTag)
	}
	switchTypeActiveTag(tag){
		var activeType = []
		this.state.notes.forEach((value)=>{
			var tagArr = value.tags.split(' ');
			tagArr.forEach((singleTag)=>{
				if (singleTag === tag) {
					activeType.push(value.type)
				}
			})
			
		})
		this.refs.pc_header
		.refs.common_type
		.switchTypeActiveTag(activeType)
	}
	render(){
		return (
			<div className="index-root">
				<PCHeader ref='pc_header' switchTagByType={this.switchTagByType.bind(this)} switchBlog={this.switchBlog.bind(this)} types={this.state.types}/>
				<div className='pc_content'>
					<PCBlogList ref='blog_list' notes={this.state.notes} />
					<CommonTag ref='common_tag' switchTypeActiveTag={this.switchTypeActiveTag.bind(this)} switchNotesByTag={this.switchNotesByTag.bind(this)} />
				</div>
				
			</div>
		)
	}
}
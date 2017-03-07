var React = require('react')
import {Router, Route, Link, browserHistory} from 'react-router'
export default class PCBlogList extends React.Component{
	constructor(){
		super()
		this.state = {
			active:['all'],
			activeById : [],
			notes : []
		}
		
	}
	getNotes(notes){
		console.log('getNotes')
		this.setState({
			notes : notes
		})
	}
	switchNotes(activeType){
		this.setState({
			activeById : [],
			active:activeType
		})
		console.log('activeType')
	}
	switchNotesByTag(activeTag){
		let activeById = []
		this.state.notes.forEach((value,index)=>{
			var tags = value.tags.toLowerCase()
			if (tags.indexOf(activeTag) >= 0) {
				var id = value.id
				activeById.push(id)
				this.setState({
					activeById : activeById
				})
			}
		})
		
	}
	render(){
		let notes = this.state.notes
		let showNoteHtml = notes.length>0
		?
		notes.map(function (value,index) {
			let className = ''
			if (this.state.activeById.length != 0) {
				className = (this.state.activeById.indexOf(value.id)>=0)?'active':''
			}else {
				className = (this.state.active.indexOf(value.type) >= 0 || this.state.active[0] === 'all') ? 'active' :''
			}
			return <li data-type={value.type} data-id={value.id} data-tags={value.tags} className={className}>
				<h3 className='blog-title'>
					<Link to={`details/${value.id}`}>
						{value.name}
					</Link>
				</h3>
				<p className='blog-description'>简介：{value.description}</p>
				<div className='blog-mark'>
					<span>发表于：{value.time}</span>，
					<span>分类：{value.type}</span>，
					<span>标签：{value.tags}</span>
				</div>
			</li>
		}.bind(this)) 
		:
		'正在加载中'
		let showNote = <ul className='blog-list'>{showNoteHtml}</ul>
		return (
			<div className='blog-list-wrap'>
				{showNote}
			</div>
		)
	}
}
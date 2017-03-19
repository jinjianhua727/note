import Tag from "./tag";
import React from 'react';

export default class Tags extends React.Component{
	render(){
		let {tags,activeTags,onTagClick,notes} = this.props
		// console.log('tags')
		// console.log(tags)
		let tag = tags && activeTags?
		tags.map((tag,index) =>{
			let className = activeTags.indexOf(tag)<0?'tag-btn':'tag-btn active'
			return <Tag 
				key={index}
				tag ={tag}
				className = {className}
				onClick = {()=>onTagClick(tag,this.props)} 
			/>
		})
		:
		'请稍等'
		return(
			<div className='tag-wrap'>
				<p>标签：</p>
				{tag}
			</div>
		)
	}
}

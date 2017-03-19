import React from 'react';
import {Router, Route, Link, browserHistory} from 'react-router'
export default class ListItem extends React.Component{
	render(){
		let {name,id,type,origin,description,time,tags} = this.props
		return(
			<li data-type={type} data-id={id} data-tags={tags} className="active">
				<h3 className='blog-title'>
					<Link to={`details/${id}`}>
						{name}
					</Link>
				</h3>
				<p className='blog-description'>简介：{description}</p>
				<div className='blog-mark'>
					<span>发表于：{time}</span>，
					<span>分类：{type}</span>，
					<span>标签：{tags}</span>
				</div>
			</li>
		)
	}
}
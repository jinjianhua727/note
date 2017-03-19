
import React from 'react';
import { fetchPostsIfNeeded } from '../actions/index'
import { connect } from "react-redux";
import ListItem from "./listItem"

// import FilterNote from "../containers/filterNote"

class List extends React.Component{
	componentDidMount(){
    	fetchPostsIfNeeded()
	}
	render(){
		let notes = this.props.notes
        // console.log('notes')
        // console.log(notes)
        let list = notes?
        notes.map((data,index) =>{
         return <ListItem key={index} {...data}/>
        })
        :
        '请稍等';
		return(
			<div className='blog-list-wrap'>
                <ul className="blog-list">
				    {list}
                </ul>
			</div>
		)
	}
}
const notes = state => {
    // console.log('state')
    // console.log(state)
    return {
        notes: state.notes.activeNotes
    }
}

export default connect(
    notes, 
    fetchPostsIfNeeded
)(List)
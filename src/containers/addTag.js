import { connect } from "react-redux";
import React from 'react';
import Tags from "../components/Tags"
import { setVisibility } from "../actions/index"

//第二个参数表示组件自身的props
const mapStateToProps = (state) => {

	return {
		tags: state.notes.tags,
		activeTypes:state.notes.activeTypes,
		notes:state.notes.notes,
		activeNotes : state.notes.activeNotes,
		activeTags : state.notes.activeTags
	}
}

const mapDispatchToProps = (dispatch) => {
	// console.log(ownProps)
	return {
		onTagClick: (tag,props)=>{
			// console.log('onTagClick')
			// console.log(tag)
			// console.log(props)
			let {notes} = props
			let activeNotes=[];
			let activeTypes=[];
			let activeTags=[tag];
			notes.forEach(function (note) {
				let tags = note.tags.toLowerCase().split(' ')
				if (tags.indexOf(tag)>=0) {
					activeNotes.push(note)
				}
			})
			activeNotes.forEach(function (value) {
				if (activeTypes.indexOf(value.type)<0) {
					activeTypes.push(value.type.toLowerCase())
				}
				// let tags = value.tags.toLowerCase().split(' ')
				// tags.forEach(function (tag) {
				// 	if (activeTags.indexOf(tag)<0) {
				// 		activeTags.push(tag)
				// 	}
				// })
			})
			dispatch(setVisibility(activeNotes,activeTypes,activeTags))
		}
	}
}

const AddTag = connect(
	mapStateToProps,
	mapDispatchToProps
)(Tags);

export default AddTag;
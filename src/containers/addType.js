import { connect } from "react-redux";
import React from 'react';
import Types from "../components/Types"
import { setVisibility } from "../actions/index"

const mapStateToProps = (state) => {

	return {
		types: state.notes.types,
		activeTypes:state.notes.activeTypes,
		notes:state.notes.notes,
		activeNotes : state.notes.activeNotes,
		activeTags : state.notes.activeTags
	}
}

const mapDispatchToProps = (dispatch) => {
	// console.log(ownProps)
	return {
		onTypeClick: (type,props)=>{
			// console.log(type)
			// console.log(props)
			let {notes} = props
			let activeNotes=[];
			let activeTypes=[type];
			let activeTags=[];
			notes.forEach(function (note) {
				if (note.type.toLowerCase() === type) {
					activeNotes.push(note)
				}
			})
			activeNotes.forEach(function (value) {
				// if (activeTypes.indexOf(value.type)<0) {
				// 	activeTypes.push(value.type.toLowerCase())
				// }
				let tags = value.tags.toLowerCase().split(' ')
				tags.forEach(function (tag) {
					if (activeTags.indexOf(tag)<0) {
						activeTags.push(tag)
					}
				})
			})
			dispatch(setVisibility(activeNotes,activeTypes,activeTags))
		}
	}
}

const AddType = connect(
	mapStateToProps,
	mapDispatchToProps
)(Types);

export default AddType;
import React from 'react';
import { connect } from 'react-redux';
import ListItem from "../components/listItem"
import { setVisibility } from '../actions';

//第二个参数表示组件自身的props
const mapStateToProps = (state) => {
	return {
		active: ownProps.filter.sort().toString() === state.visibilityFilter.sort().toString()
	}
}

const mapDispatchProps = (dispatch, ownProps) => {
	return {
		onClick: ()=>{
			dispatch(setVisibility(ownProps.filter))
		}
	}
}

const FilterNote = connect(
	mapStateToProps,
	mapDispatchProps
)(ListItem);

export default FilterNote;
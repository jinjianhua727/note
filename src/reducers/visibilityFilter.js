const visibilityFilter = (state={}, action) =>{
	switch(action.type){
		case 'SET_VISIBILITY':
			return Object.assign({}, state, {
				activeNotes : action.activeNotes,
				activeTypes : action.activeTypes,
				activeTags : action.activeTags
			} )
		default:
		 	return state;
	}
}

export default visibilityFilter;
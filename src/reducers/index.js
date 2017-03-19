// import visibilityFilter from './visibilityFilter';
import notes from './notes';
import { combineReducers } from 'redux';

const noteApp = combineReducers({
	// visibilityFilter,
	notes
});

export default noteApp;
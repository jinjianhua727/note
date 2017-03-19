export const setVisibility = (activeNotes,activeTypes,activeTags) =>{
    // console.log(activeNotes)
	return {
		type:"SET_VISIBILITY",
		activeNotes:activeNotes,
        activeTypes:activeTypes,
        activeTags:activeTags
	}
}
export const getSuccess = (json) => {
    // console.log(json)
    return {
        type: "GET_SUCCESS",
        json
    }
}

function fetchPosts() {
    return dispatch => {
        return fetch('data.json')
            .then((res) => { 
                // console.log(res.status); 
                return res.json() 
            })
            .then((data) => {
                dispatch(getSuccess(data))
            })
            .catch((e) => { console.log(e.message) })
        }
}
export function fetchPostsIfNeeded() {
    // console.log('function:fetchPostsIfNeeded')
    return (dispatch) => {
        return dispatch(fetchPosts())
    }
}
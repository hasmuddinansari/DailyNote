export const addNote = (note)=> {
    return (dispatch)=>{
            dispatch({type:"ADD_NOTE", note})  
    }
}

export const updateState = (newState)=>{
    return {
        type:'UPDATE',
        payload:newState
    }
}

const initialState = {
    notes:[]
}
const reducer = (state=initialState, action)=>{
        switch(action.type){
            case "ADD_NOTE":
                return {
                    notes:[...state.notes, action.note]
                }
            case "UPDATE":
                return {
                    notes:[...action.payload]
                }
            default: return state
        }
}
export default reducer
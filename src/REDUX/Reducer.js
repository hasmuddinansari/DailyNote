const initialState = {
    notes:[],
    email:"",
}
const reducer = (state=initialState, action)=>{
        switch(action.type){
            case "CHANGE_EMAIL":
                return {
                    ...state,
                    email:action.email,
                }
            case "UPDATE":
                return {
                    ...state,
                    notes:[...action.payload]
                }
            
            default: return state
        }
}
export default reducer
const initialState = {
    notes:[],
    email:"",
    name:"",
    username:""
}
const reducer = (state=initialState, action)=>{
        switch(action.type){
            case "CHANGE_EMAIL":
                return {
                    ...state,
                    email:action.email,
                    name:action.name,
                    username:action.username
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
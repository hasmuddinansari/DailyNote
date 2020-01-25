const initialState = {
    notes:[],
    email:"",
    name:"",
    username:"",
    auth:{
        authenticated:false,
        email:"",
    }
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
            case "SET_AUTH":
                return {
                    ...state,
                    auth:{
                        ...state.auth,
                        authenticated:action.authenticated,
                        email:action.email
                    }
                }
            
            default: return state
        }
}
export default reducer
const initialState = {
    notes:[],
    email:"",
    username:"",
    auth:{
        authenticated:false,
        email:"",
        name:"",
        
    }
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
            case "SET_AUTH":
                return {
                    ...state,
                    auth:{
                        ...state.auth,
                        authenticated:action.authenticated,
                        email:action.email,
                        name:action.name
                    }
                }
            
            default: return state
        }
}
export default reducer
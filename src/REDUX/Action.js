export const changeEmail = (email,name,username)=> {
    return {
        type:"CHANGE_EMAIL",
        email:email,
    }
}

export const updateState = (newState)=>{
    return {
        type:'UPDATE',
        payload:newState
    }
}

export const setAuth=(authenticated, email, name)=>{
    return {
        type:"SET_AUTH",
        authenticated:authenticated,
        email:email,
        name:name
    }
}
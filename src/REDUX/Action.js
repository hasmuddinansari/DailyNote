export const changeEmail = (email,name,username)=> {
    return {
        type:"CHANGE_EMAIL",
        email:email,
        name:name,
        username:username
    }
}

export const updateState = (newState)=>{
    return {
        type:'UPDATE',
        payload:newState
    }
}

export const changeEmail = (email)=> {
    return {
        type:"CHANGE_EMAIL",
        email:email
    }
}

export const updateState = (newState)=>{
    return {
        type:'UPDATE',
        payload:newState
    }
}

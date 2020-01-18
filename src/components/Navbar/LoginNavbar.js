import React, { Component } from 'react'
import { Link } from "react-router-dom"
const style = {
    textDecoration:"none",
    fontFamily:"Courier New",
    color:"white"
}

class LoginNavbar extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return (
            <>
            <div className="navbar">
                <button  className="btn btn-success mx-2">
                <Link className="text-dark" style={style} to="/login">Login</Link>
                </button>
                <button  className="btn btn-danger mx-2">
                <Link style={style} to="/signup">Signup</Link>
                </button>
            </div>
            </>
        )
    }
    }
export default LoginNavbar

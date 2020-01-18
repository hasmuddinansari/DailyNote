import React, { Component } from 'react'
import { Link } from "react-router-dom"
import firebase from 'firebase'
import 'firebase/database'
const style = {
    textDecoration:"none",
    fontFamily:"Courier New",
    color:"white"
}

export class LogoutNavbar extends Component{
    constructor(props){
        super(props)
        this.auth = firebase.database()
    }

    logout = ()=>{
        this.auth.ref("auth").set({
            authenticated:false
        })
    }
    render(){
        return (
        <>
        <div className="navbar">
            <button className="btn btn-success mx-2">
            <Link className="text-dark" style={style} to="/create">Create Notes</Link>
            </button>
            <button className="btn btn-outline-danger mx-2">
            <Link className="text-white" style={style} to="/note">All Notes</Link>
            </button>
                <h4 className="bg-info mouseHover mx-2 p-1 mt-1 text-dark rounded-circle" data-toggle="collapse" href="#logout" role="button" aria-expanded="false" aria-controls="logout">
                    AS
                </h4>
            <button onClick={this.logout} className="btn collapse btn-danger mx-2" id="logout">
                Logout
            </button>
        </div>
        </>
    )
}
}
export default LogoutNavbar
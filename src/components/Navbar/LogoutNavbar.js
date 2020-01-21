import React, { Component } from 'react'
import { Link } from "react-router-dom"
import firebase from 'firebase'
import 'firebase/database'
import {connect} from "react-redux"
const style = {
    textDecoration:"none",
    fontFamily:"Courier New",
    color:"white"
}

class LogoutNavbar extends Component{
    constructor(props){
        super(props)
        this.auth = firebase.database()
        this.email =""
    }

    logout = ()=>{
        this.auth.ref("auth").set({
            authenticated:false,
            email:"",
            name:"",
            username:""
        })
    }
    componentDidMount(){
        this.auth.ref("auth").orderByKey().on("value",snapshot=>{
            const email = snapshot.val().email
            this.setState({
                ...this.state,
                email:email
            })
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
                   {this.props.name[0]+this.props.name[1]}
                </h4>
            <button onClick={this.logout} className="btn collapse btn-danger mx-2" id="logout">
                Logout
            </button>
        </div>
        </>
    )
}
}
const mapStateToProps = state =>{
    return {
        email:state.email,
        name:state.name.toUpperCase()
    }
}
export default connect(mapStateToProps)(LogoutNavbar)
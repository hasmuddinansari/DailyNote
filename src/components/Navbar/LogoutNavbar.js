import React, { Component } from 'react'
import { Link } from "react-router-dom"
import {connect} from "react-redux"
import {setAuth} from "../../REDUX/Action"
const style = {
    textDecoration:"none",
    fontFamily:"Courier New",
    color:"white"
}

class LogoutNavbar extends Component{
    constructor(props){
        super(props)
        this.email =""
    }

    logout = ()=>{
        this.props.setAuth(false,"")

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

            <img src="/images/user.png" className="mouseHover img-fluid"  data-toggle="collapse" href="#logout" role="button" aria-expanded="false" aria-controls="logout"/>
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
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        setAuth:(authenticated, email, name)=>dispatch(setAuth(authenticated, email, name))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogoutNavbar)
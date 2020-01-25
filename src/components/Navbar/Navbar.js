import React, {Component} from 'react'
import {Link} from "react-router-dom"
import LoginNavbar from "./LoginNavbar"
import LogoutNavbar from "./LogoutNavbar"
import {connect} from "react-redux"

class Navbar extends Component {
    constructor(props){
        super(props)
    }
     render(){
         return (
             <nav className="navbar  navbar-expand-lg navbar-light navbar-style">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
       <Link className="navbar-brand text-white" to="/">MakeNotes.com</Link>
       <div className="collapse navbar-collapse row justify-content-end" id="navbarTogglerDemo03">
          {this.props.auth.authenticated ?<LogoutNavbar/>: <LoginNavbar/>}
       </div>
     </nav>
         )
     }
     }

const mapStateToProps = state=>{
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps)(Navbar)
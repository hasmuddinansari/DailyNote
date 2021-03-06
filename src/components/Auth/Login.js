import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase"
import 'firebase/database'
import {connect} from "react-redux"
import {changeEmail, setAuth} from "../../REDUX/Action"
import {Link} from "react-router-dom"
import {Route, Redirect} from "react-router-dom"
import swal from 'sweetalert';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        password: "",
        authenticated:""
      }
      this.database = firebase.database()
      this.users = this.database.ref("users")
      this.olderUser=[]
      
  }
  
  handleChange = e => {
    this.setState({
        ...this.state,
        [e.target.name]: e.target.value
    });
  };

  submit = (e) => {
      e.preventDefault()
      const {email, password}= this.state
      if(email.length==0 || password.length==0){
          // alert("Email and Password are required to login")
          swal("Email and Password are required to login!", "Please re-type!", "warning");
      }
      else{
      this.users.orderByKey().on("value", snapshot=>{
        const allUser = snapshot.val()
        if(allUser !==undefined){
          const userData = Object.values(allUser)
          this.olderUser = userData.filter(user=>{
          return this.state.email ===user.email
        })
        if(this.olderUser.length==0 || this.olderUser == undefined || this.olderUser==null){
            // alert("Either you are not registered ! Or Email or Password is wrong")
          swal("Either you are not registered ! Or Email or Password is wrong!", "Please re-type!", "warning");

        }
        else if(this.olderUser[0].email==email && this.olderUser[0].password==password){
            this.props.setAuth(true, email)
            this.props.history.push("/")
        }
    }
})
            
}     
  };
//if usern is already authenticated the user should be land on dashboard
  render() {
    if(this.props.auth.authenticated){
      return <Route render={(props)=>{
        return <Redirect
        to={{
        pathname: "/",
        state: {
          from: props.location
        }
      }}
    />
      }}/>
    }
    else{
      return (
        <div className="container d-flex justify-content-center align-items-center p-5">
          <form onSubmit={this.submit} className="flex-column col-md-5 col-12 bg-light  border p-2 d-flex">
            <h2 className="text-center text-success">Login</h2>
            <TextField
              className=" m-2"
              id="outlined-basic"
              onChange={this.handleChange}
              name="email"
              label="Email"
              variant="outlined"
            />
              <TextField
                id="outlined-basic"
                className="m-2"
                onChange={this.handleChange}
                name="password"
                type={`password`}
                label="Password"
                variant="outlined"
              />
            <input type="submit" onClick={this.submit}
              className="py-2 m-2 bg-success text-white" value="Login"/>
            <p className="m-2">
                Not a Member yet ?  <Link className="mx-2" to="/signup">Click here to register</Link>
            </p>
          </form>
        </div>
      );
    }
  }
}

const mapDisToPro = dispatch =>{
  return {
    changeEmail:(email)=>dispatch(changeEmail(email)),
    setAuth:(authenticated, email)=>dispatch(setAuth(authenticated, email))
  }
}

const mapStateToProps = state =>{
  return {
    auth:state.auth
  }
}

export default connect(mapStateToProps, mapDisToPro)(Login);

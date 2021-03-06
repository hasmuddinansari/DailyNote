import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import {Link} from "react-router-dom"
import firebase from "firebase"
import 'firebase/database'
import swal from 'sweetalert';

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.database = firebase.database()
    this.users = this.database.ref("users")
    this.state = {
      toggle: "",
      form: {
        name: "",
        email: "",
        username: "",
        password: ""
      }
    };

  }
  handleChange = e => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };
  handleChangeCheckBox = event => {
    this.setState({
      ...this.state,
      toggle: !event.target.checked
    });
    console.log(this.state.toggle);
  };

  checkTrue= (arr, check)=>{
    let found = false
    for(let i=0; i<arr.length; i++){
        if(arr[i].email===check){
          found = true
          break;
        }
    }
    return found
  }
  //email validation
  emailValidation =  email =>{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat)){
      return true
    }
    else{
      return false
    }

  }
  submit = (e) => {
    console.log(this.state.form);
    e.preventDefault()
    const {name,
    email,
    username,
    password} = this.state.form
    if(name.length==0 ||email.length==0 || username.length==0 || password.length==0){
      swal("All field mendotary to fill","","warning")
    }
    else if(!this.emailValidation(email)){
        // alert("Email is wrong!")
        swal("Email is wrong!","","warning")

    }
    else {
      var getIt;
      this.users.orderByKey().on("value", snapshot=>{
        var allUser = snapshot.val()
        if(allUser !==undefined){
          const userData = Object.values(allUser)
          getIt =  this.checkTrue(userData, this.state.form.email)
        }
      });
      console.log("second",getIt)
      if(getIt==false){
        const idGenerate = this.users.push().key
            this.users.child(idGenerate).set({
            ...this.state.form
             })
        swal("User Registered Successfully!","Go to Login Page ","success")
        this.reset()
      }
      else if(getIt==true){
        swal("the email address you have entered is already registered!","Try another Email ","warning")
      }
    }  
  };       

  reset =()=>{
    this.setState({
      form: {
        ...this.state.form,
        name: "",
        email: "",
        username: "",
        password: ""
        
      }
    });
  }
  render() {
    return (
      <div className="container d-flex justify-content-center align-items-center p-2">
        <form className="flex-column col-md-5 col-12 bg-light  border p-2 d-flex">
          <h2 className="text-center text-warning">Register</h2>
          <TextField
            className=" m-2"
            id="outlined-basic"
            onChange={this.handleChange}
            name="name"
            label="Name"
            value = {this.state.form.name}
            variant="outlined"
          />
          <div className="row mx-2">
            <TextField
              id="outlined-basic"
              className="col-10"
              onChange={this.handleChange}
              name="password"
              value = {this.state.form.password}
              type={this.state.toggle ? `text` : `password`}
              label="Choose Password"
              variant="outlined"
            />
            <div className="col-2 ">
              <Checkbox
                defaultChecked
                value="secondary"
                color="primary"
                onChange={this.handleChangeCheckBox}
                value={this.state.toggle}
              />
              <p className="text-muted lit_letter mx-2">
                {this.state.toggle ? `Show` : `Hide`}
              </p>
            </div>
          </div>
          <TextField
            id="outlined-basic"
            className="mx-2"
            onChange={this.handleChange}
            name="username"
            label="Username"
            value = {this.state.form.username}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            className=" m-2"
            onChange={this.handleChange}
            name="email"
            label="Email"
            value = {this.state.form.email}
            variant="outlined"
          />
          <Button
            variant="outlined"
            type="submit"
            onClick={this.submit}
            className="py-2  m-2 bg-dark text-white"
            color="primary"
          >
            Register
          </Button>
          <p className="m-2">
            Already have an account ?   <Link to="/login">Click here</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default RegisterForm;



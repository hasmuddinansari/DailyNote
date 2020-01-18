import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from 'firebase'
import 'firebase/database'
import fbConfig from "./Config/fbConfig"

//initilizing config 
firebase.initializeApp(fbConfig);
firebase.analytics();
export class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
              title: "",
              disc: "",
              about: "",
              username:"",
      }
      this.database = firebase.database()
      this.rootRef = this.database.ref('notes')
  }
  handleChange = e => {
    this.setState({
          [e.target.name]: e.target.value,
          username:"Ayaan",
    });
  };
  
  submit = () => {
    console.log(this.state);

    //generating new id everytime;
   const {title, disc, about} = this.state
   if(title.length==0 || disc.length ==0 || about.length==0){
     alert("All field are mendotary to fill")
   }
   else {
    const idGenerate = this.rootRef.push().key
    //data pushing in firebase database;
    let date = new Date()
    let hour = date.getHours()
    let min = date.getMinutes()
    let time = `${hour}:${min}`
    this.rootRef.child(idGenerate).set({
        ...this.state,id:idGenerate,date:new Date().toLocaleDateString(), time:time
    }    
    )
    alert("data added")
    this.reset()
   }
};
  reset =()=>{
      this.setState({
        title: "",
        disc: "",
        about: "",
      })
  }
  render() {
    return (
      <div className="container-fluid p-4 bg-change">
      <div className="container p-5 row ">
        <form className="flex-column col-md-5 col-12 bg-light  border p-2 d-flex">
          <h2 className="text-center text-danger">NOTE</h2>
          <TextField
            className=" m-2 mt-5"
            id="outlined-basic"
            onChange={this.handleChange}
            name="title"
            label="Title"
            variant="outlined"
            value={this.state.title}
          />
            <TextField
              id="outlined-basic"
              className="m-2 mt-5"
              onChange={this.handleChange}
              name="disc"
              label="Discription"
              placeholder="Sort Description about note"
              variant="outlined"
              value={this.state.disc}
            />
          <Button
            onClick={this.submit}
            variant="outlined"
            className="py-2 m-2 mt-5 bg-success text-white"
          >
           <h5>Add Note</h5>
          </Button>
        </form>
        <div className="bg-dark">
          <h4 className="text-white">NOTES DETAILS</h4>
          <textarea  id="outlined-basic"
            className="m-2"
            onChange={this.handleChange}
            name="about"
            label="About"
            placeholder="Details of notes......."
            value={this.state.about}  style={{height: "calc(16em + 4.75rem + 6px)", width:"35rem"}}></textarea>
        </div>
      </div>
      </div>
    );
  }
}

export default UserForm;

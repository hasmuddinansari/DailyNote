import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from 'firebase'
import 'firebase/database'
import fbConfig from "../../Config/fbConfig"
import {changeEmail} from "../../REDUX/Action"
import {connect} from "react-redux"

//initilizing config 
firebase.initializeApp(fbConfig);
firebase.analytics();
export class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
              title: "",
              disc: "",
              about: "",
              username:"",
              email:""
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
  //as per email change path of ref of database to hanldle individualy dataa.
  componentWillMount(){
          document.title = "Create Notes"
          this.database.ref('auth').orderByKey().on('value', snapshot=>{
              let auth = snapshot.val()
              let newEmail =""
              for(let i=0; i < auth.email.length; i++){
                  if(auth.email[i]=="@"){
                    newEmail += "AT"
                  }
                  else if(auth.email[i]=="."){
                    newEmail += "dot"
                  }
                  else{
                    newEmail += auth.email[i]
                  }
              }
              this.setState({
                email:newEmail
              })
              this.props.changeEmail(newEmail)
            })
  }
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
    this.rootRef.child(this.state.email).child(idGenerate).set({
        ...this.state,id:idGenerate,date:new Date().toLocaleDateString(), time:time
    }    
    ).then(()=>{
      alert("Note is added in database")
    }).catch(err=>{
      alert(err)
    })
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
          <h4 className="text-white m-3">NOTES DETAILS</h4>
          <textarea  id="outlined-basic"
            className="m-2"
            onChange={this.handleChange}
            name="about"
            label="About"
            placeholder="Brief explaination about your note.."
            value={this.state.about}  style={{height: "calc(16em + 4.75rem + 6px)", width:"35rem"}}></textarea>
        </div>
      </div>
      </div>
    );
  }
}
const mapDisToPro = (dispatch)=>{
  return {
    changeEmail:email=>dispatch(changeEmail(email))
  }
}
export default connect(null, mapDisToPro)(Create);

import React, { Component } from 'react'
import {Button} from "react-bootstrap"
import { Modal } from "react-bootstrap"
import EditIcon from '@material-ui/icons/Edit';
import TextField  from "@material-ui/core/TextField"
import firebase from "firebase"
import "firebase/database"
import {connect} from "react-redux"
import swal from "sweetalert"

export class UpdateNoteCard extends Component {
  constructor(props){
      super(props)
      this.state={
          note:{
            about:"",
            disc:"",
            title:"",
          },
          show:false
      }
    }
  componentDidMount(){
      const propData = this.props.data
      this.setState({
        ...this.state,
        note:{
          ...this.state.note,
          about:propData.about,
          disc:propData.disc,
          title:propData.title
        }
      })
    }
  handleClose = () => {
      this.setState({
        show:false
      })
    }
  handleShow = () => {
      this.setState({
        show:true
      })
    }
  handleChange=(e)=>{
    this.setState({
      ...this.state,
      note:{
        ...this.state.note,
        [e.target.name]:e.target.value
      }
    })
  }
  handleSubmit=()=>{
    firebase.database().ref(`notes/${this.props.email}/${this.props.data.id}`).update(this.state.note)
    swal("This note is changed now.", "","success")
    this.handleClose()
  }
  render(){
    const {show}= this.state
    const {title, about, disc} = this.state.note
    return (
      <>
        <EditIcon onClick={this.handleShow} className="mouseHover bg-warning text-dark p-1 border rounded-circle" title="Edit.."/>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header >
          <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <h5 className="text-info"> Title :</h5>
          <TextField className="form-control" onChange={this.handleChange} name="title" id="standard-basic" value={title}  />
          <h5 className="text-success"> Description : </h5>
          <TextField  className="form-control" onChange={this.handleChange} name="disc" id="standard-basic" value={disc}  />
          <h4 className="text-danger">About</h4>
          <textarea  id="outlined-basic"
            name="about"
            onChange={this.handleChange}
            label="About"
            placeholder="Brief explaination about your note.."
            value={about}  style={{height: "calc(20em + 4.75rem + 6px)", width:"calc(17em + 10.75rem)"}}></textarea>
          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
const mapStateToProps=state=>{
  return {
    email:state.email
  }
}
  
export default connect(mapStateToProps)(UpdateNoteCard)
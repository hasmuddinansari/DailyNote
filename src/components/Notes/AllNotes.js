import React, { Component } from 'react'
import {updateState} from "../../REDUX/Action"
import {connect} from "react-redux"
import {Link } from 'react-router-dom'
import 'firebase/database'
import firebase from "firebase"
import NotesCard from './NotesCard'
import swal from "sweetalert"


export class AllNotes extends Component {
    constructor(props){
        super(props)
        this.database = firebase.database()
        this.rootRef = this.database.ref("notes").child(this.props.email)
    }
    componentWillMount(){
        document.title = "All Notes"
        this.rootRef.orderByKey().on('value', snapshot=>{
            let temp = snapshot.val()
            if(temp !=undefined || temp!=null){
            const data = Object.values(temp)
            if(data.length !==0){
                this.props.updateState(data)
            }
           
            }
          })
    }
    deleteItem=(id)=>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Note!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              this.rootRef.child(id).remove();
              swal("Your note has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your note is safe!");
            }
          });
    }
    updateItem=(id,obj)=>{
        this.rootRef.child(id).update(obj)
    }
    render() {
        const {notes} = this.props
        console.log(notes)
        return (
            <div className="container ">
                <div className="row p-2">
                {notes.length !==0 ? notes.map(note=>{
                return <NotesCard  key={note.id} match={this.props} deleteItem={this.deleteItem}  id={note.id} note={note}/>
                }):<h1>You have {notes.length} note.<Link to="/create">Click here</Link> to ADD.</h1>}
                {/* <NotesCard/> */}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        notes:state.notes,
        email:state.email,
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        updateState:newState =>dispatch(updateState(newState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes)

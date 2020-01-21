import React, { Component } from 'react'
import {connect} from "react-redux"
import firebase from "firebase"
import "firebase/database"


export class SingleNote extends Component {
    constructor(props){
        super(props)
        this.state={
            name:""
        }
        this.id = this.props.match.params.id
        this.auth = firebase.database().ref("auth")
        this.noteItem = this.props.notes.find(note=>{
            return note.id == this.id
        })
    }
    componentWillMount(){
        this.auth.orderByKey().on("value",snap=>{
            this.setState({
                name:snap.val().name
            })
        })
    }
    render() {
        console.log("work", this.id)
        const {name}= this.state
        console.log(this.state)
        return (
            <div className="container p-1 border border-dark shdw bg-color">
                {this.noteItem ? <div className="container text-center">
                <h2 className="text-info">{this.noteItem.title}</h2>
                <pre className="change-font p-5">
                    {this.noteItem.about}
                </pre>
                <p className="text-right text-muted">
                   <p> {this.noteItem.date}, {this.noteItem.time} </p>
                   <p>Author : <strong> {name}</strong></p>
                </p>
        </div>: <h3>Not Found</h3> }
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return {
        notes:state.notes,
        name:state.name
    }
}
export default connect(mapStateToProps)(SingleNote)

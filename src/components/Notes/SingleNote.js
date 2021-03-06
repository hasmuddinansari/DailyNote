import React, { Component } from 'react'
import {connect} from "react-redux"



export class SingleNote extends Component {
    constructor(props){
        super(props)
        this.state={
            name:""
        }
        this.id = this.props.match.params.id
        this.noteItem = this.props.notes.find(note=>{
            return note.id == this.id
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
                </p>
        </div>: <h3>Not Found</h3> }
            </div>
        )
    }
}
const mapStateToProps = state=>{
    return {
        notes:state.notes,
        name:state.name,
        auth:state.auth
    }
}
export default connect(mapStateToProps)(SingleNote)

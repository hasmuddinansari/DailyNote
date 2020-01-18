import React, { Component } from 'react'
import {updateState} from "../../REDUX/Action"
import {connect} from "react-redux"
import 'firebase/database'
import firebase from "firebase"
import NotesCard from './NotesCard'



export class AllNotes extends Component {
    constructor(props){
        super(props)
        this.database = firebase.database()
        this.rootRef = this.database.ref("notes")
    }
    componentDidMount(){
        this.rootRef.orderByKey().on('value', snapshot=>{
            let temp = snapshot.val()
            console.log(temp)
            const data = Object.values(temp)
            this.props.updateState(data)
            console.log(data)
          })
    }
    deleteItem=(id)=>{
        let confirmation = prompt(`Are you sure? \n if Yes then Type "1" \n and press "OK" \n cancel if you don't.`, "");
        if (confirmation == 1) {
        return this.rootRef.child(id).remove();
        }
    }
    render() {
        const {notes} = this.props
        console.log(notes)
        return (
            <div className="container ">
                <div className="row p-2">
                {notes && notes.map(note=>{
                return <NotesCard match={this.props} deleteItem={this.deleteItem}  id={note.id} note={note}/>
                })}
                {/* <NotesCard/> */}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        notes:state.notes
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        updateState:newState =>dispatch(updateState(newState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllNotes)

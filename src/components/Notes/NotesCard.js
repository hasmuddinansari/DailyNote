import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom"
import UpdateNoteCard from "./UpdateNoteCard"


export default function NotesCard(props) {
    const {deleteItem,note, match,name} = props
    // console.log("match",match.match)
    return (
        <div className="col-md-4 col-12 p-2 animated zoomInUp">
            <div className="card bg-light shdw ">
            <div className="p-3 row justify-content-between">
            <h5 className="mx-2">{note.title}</h5>
            <span className="mx-2">
            <UpdateNoteCard data={note}/>
            <DeleteIcon onClick={()=>deleteItem(note.id)} className="mouseHover bg-danger text-white p-1 border rounded-circle" title="Delete"/>
            </span>
            </div>           
            <div className="card-body">
                <p>{note.disc}</p>
                <p className="text-muted">
                    Author: {name}
                </p>
                <p className="text-muted">
                    {note.date}, {note.time}
                </p>
                <Link className="btn btn-info" to={`${match.match.url}/${note.id}`} >
                    Open to read</Link>
            </div>
            </div>
        </div>
    )
}

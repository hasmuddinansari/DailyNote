import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom"
import UpdateNoteCard from "./UpdateNoteCard"


export default function NotesCard(props) {
    const {deleteItem,note, match,name} = props
    // console.log("match",match.match)
    return (
        <div className="col-md-4 col-12 p-2 animated zoomInUp">
            <div className="bg-light shdw ">
            <div className="p-2 row justify-content-between">
            <h4>{note.title}</h4>
            <span>
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

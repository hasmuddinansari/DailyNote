import React from 'react'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom"


export default function NotesCard(props) {
    const {deleteItem,note, match} = props
    // console.log("match",match.match)
    return (
        <div className="col-4 p-2 animated zoomInUp">
            <div className="card bg-light shdw ">
            <div className="p-2 d-flex flex-row justify-content-between">
            <h4>{note.title}</h4>
            <span>
            <CreateIcon className="mouseHover border p-1 rounded-circle" title="Update"/>
            <DeleteIcon onClick={()=>deleteItem(note.id)} className="mouseHover bg-danger text-white p-1 border rounded-circle" title="Delete"/>
            </span>
            </div>           
            <div className="card-body">
                <p>{note.disc}</p>
                <p className="text-muted">
                    Author: {note.username}
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

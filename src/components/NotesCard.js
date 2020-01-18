import React from 'react'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';


export default function NotesCard({deleteItem,note}) {
    return (
        <div className="col-4 p-2">
            <div className="card bg-light shdw  ">
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
                <button className="btn btn-info">Open to read</button>
            </div>
            </div>
            
        </div>
    )
}

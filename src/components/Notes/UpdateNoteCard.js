import React, {useState, useEffect} from "react"
import {Button} from "react-bootstrap"
import { Modal } from "react-bootstrap"
import EditIcon from '@material-ui/icons/Edit';



function UpdateNoteCard(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState(props.data)
  
    return (
      <>
        <EditIcon onClick={handleShow} className="mouseHover bg-warning text-dark p-1 border rounded-circle" title="Edit.."/>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" value={data.about}/>
            <input type="text" value={data.desc}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default UpdateNoteCard
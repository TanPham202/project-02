import { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';

const ModalEditUser = (props) => {

    const { show, handleClose, dataUserEdit } = props;

    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])

    const handleEditUser = () => {

    }

    return (
        <>
            <Modal show = {show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> Edit a user </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div className="mb-3">
                            <label className="form-label"> Name </label>
                            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label"> Job </label>
                            <input type="text" className="form-control" value={job} onChange={(e) => setJob(e.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> 
                        Close 
                    </Button>
                    <Button variant="primary" onClick={() => handleEditUser()}> 
                        Confirm 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditUser
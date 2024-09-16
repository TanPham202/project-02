import { Modal, Button } from 'react-bootstrap';

const ModalConfirm = (props) => {

    const { show, handleClose, dataUserDelete } = props;

    const confirmDelete = () => {

    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title> Delete a user </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        This action can't be undone!
                        Do you want to delete this user?
                        <br/>
                        <b> email={dataUserDelete.email} ? </b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> 
                        Close 
                    </Button>
                    <Button variant="primary" onClick={() => confirmDelete()}> 
                        Confirm 
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalConfirm
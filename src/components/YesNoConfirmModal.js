import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function YesNoConfirmModal({ text1, text2, show, hideModal, action }) {
  let label1 = <p className="m-0">{text1}</p>;
  let label2 = text2 ? <p className="m-0">{text2}</p> : null;

  return (
    <Modal show={show} onHide={hideModal} size="sm" centered>
      <Modal.Body>
        {label1}
        {label2}
        <Button style={{ float: 'right' }} variant="secondary-outline" onClick={action}>
          Yes
        </Button>
        <Button style={{ float: 'right' }} variant="secondary-outline" onClick={hideModal}>
          No
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default YesNoConfirmModal;

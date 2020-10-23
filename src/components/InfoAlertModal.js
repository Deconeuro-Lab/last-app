import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function InfoAlertModal({ label1, label2, show, hideModal, onExit }) {
  return (
    <Modal show={show} onHide={hideModal} onExit={onExit} size="sm" centered>
      <Modal.Body>
        {label1}
        {label2}
        <Button style={{ float: 'right' }} variant="secondary-outline" onClick={hideModal}>
          Okay
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default InfoAlertModal;

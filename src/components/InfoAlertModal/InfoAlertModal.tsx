import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  label1: JSX.Element;
  label2?: JSX.Element;
  show: boolean;
  hideModal(): void; // Callback fired when the header closeButton or non-static backdrop is clicked
  onExit?(): void; // Callback fired right before the Modal transitions out
}

const InfoAlertModal: React.FC<Props> = ({ label1, label2, show, hideModal, onExit }) => {
  return (
    <Modal show={show} onHide={hideModal} onExit={onExit} size="sm" centered>
      <Modal.Body>
        {label1}
        {label2}
        <Button style={{ float: 'right' }} variant="secondary-outline" onClick={hideModal}>
          Ok
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default InfoAlertModal;

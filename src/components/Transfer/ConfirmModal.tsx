import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <p>{message}</p>
            <div className="modal-actions">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button onClick={onConfirm}>Confirm</Button>
            </div>
        </Modal>
    );
};
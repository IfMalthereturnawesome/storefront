import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";
import React from 'react';
import {Button} from "@nextui-org/button";


type ErrorModalProps = {
    message: string;
    isOpen: boolean;
    onClose: () => void;
};

const ErrorModal: React.FC<ErrorModalProps> = ({message, isOpen, onClose}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            aria-labelledby="modal-title"
            size="lg"
            className="rounded-lg"
        >
            <ModalContent>
                <ModalHeader className="bg-cyan-1  border-b">
                    <span id="modal-title" className="text-lg font-medium text-slate-12">Payment Error</span>
                </ModalHeader>
                <ModalBody className="bg-custom-white py-12">
                    <p className="text-gray-800 text-sm">{message}</p>
                    <p className={"text-gray-800 text-sm"}>Please try again with a different payment method or credit card.</p>
                </ModalBody>
                <ModalFooter className="bg-cyan-2 border-t">
                    <Button
                        color="warning"
                        onClick={onClose}
                        className="text-red-600 hover:text-red-800"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ErrorModal;

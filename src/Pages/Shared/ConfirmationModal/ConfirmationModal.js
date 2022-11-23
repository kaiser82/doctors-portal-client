import React from 'react';

const ConfirmationModal = ({ title, message, closeModal, successAction, successButtonName, modalData }) => {
    return (
        <div>
            <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="confirmation-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={() => successAction(modalData)} htmlFor="confirmation-modal" className="btn btn-error">
                            {successButtonName}
                        </label>
                        <button onClick={closeModal} className='btn btn-secondary'>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
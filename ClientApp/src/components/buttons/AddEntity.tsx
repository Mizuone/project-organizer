import React, { useState } from 'react';

import { ModalProps } from '../../types/ModalProps';
import { Project } from '../../api/dtos/project.dto';

interface AddEntityProps {
    buttonText: string;
    modalComponent: React.ComponentType<ModalProps>;
    modalSubmit: (newEntity: Project) => Promise<void>;
}

export const AddEntity = (props: AddEntityProps) => {
    const { buttonText, modalComponent: ModalComponent, modalSubmit } = props;
    const [ showModal, setShowModal ] = useState(false);

    const closeModal = () => {
        setShowModal(false);
    }
    
    return (
        <>
            <button onClick={() => setShowModal(true)}
                data-modal-target="defaultModal"  data-modal-toggle="defaultModal" type="button"
                className="mx-4 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 border rounded"
            >
                { buttonText }
            </button>

            { showModal ? <ModalComponent submitModal={modalSubmit} closeModal={closeModal} entity={{} as Project} /> : null}
        </>
    )
}
import { Project } from "../api/dtos/project.dto"

export type ModalProps = {
    submitModal: (entity: Project) => void;
    closeModal: () => void;
    entity: Project;
}
import React, { useRef, useState } from 'react';

import { DeleteEntity } from './DeleteEntity';
import { DeleteProjectModal } from '../project/modal/DeleteProjectModal';
import { Project } from '../../api/dtos/project.dto';
import { UpdateEntity } from './UpdateEntity';
import { UpdateProjectModal } from '../project/modal/UpdateProjectModal';
import { useProjects } from '../../api/hooks/projects/useProjects';

interface EllipsisToggleItemsProps {
    entity: Project;
}

export const EllipsisToggleItems = (props: EllipsisToggleItemsProps) => {
    const { entity } = props;

    const { updateProject, deleteProject } = useProjects();

    const [ showDropdown, setShowDropdown ] = useState(false)
    const ref = useRef<HTMLDivElement>(null);
    
    function toggleDropdown() {
        setShowDropdown(!showDropdown);

        document.removeEventListener('click', handleClickOutside, true);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
            event.stopPropagation();
            
            toggleDropdown()
        }
    };

    document.addEventListener('click', handleClickOutside, true);

    const updateProjectToNew = async (updatedProject: Project) => {
        const projectId = entity.id;
        
        updateProject(projectId, updatedProject);
    }

    const deleteProjectConfirmed = async () => {
        const projectId = entity.id;

        deleteProject(projectId);
    }

    return (
        <div className='flex relative'>
            <button onClick={toggleDropdown} id="project-options-button" data-dropdown-toggle="dropdown-project-options"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 rounded-full cursor-pointer ease-in-out duration-150 hover:bg-gray-100">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </button>
            { showDropdown ?
                <div ref={ref} id="dropdown-project-options" className="absolute center-absolute-top-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-24 dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="project-options-button">
                        <li>
                            <UpdateEntity buttonText='Update' entity={entity} modalComponent={UpdateProjectModal} modalSubmit={updateProjectToNew} hideDropDown={toggleDropdown} />
                        </li>
                        <li>
                            <DeleteEntity buttonText='Delete' entity={entity} modalComponent={DeleteProjectModal} modalSubmit={deleteProjectConfirmed} hideDropDown={toggleDropdown} />
                        </li>
                    </ul>
                </div>
                : null
            }
        </div>
    )
}
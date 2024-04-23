import { AddEntity } from '../buttons/AddEntity';
import { AddProjectModal } from './modal/AddProjectModal';
import { EllipsisToggleItems } from '../buttons/EllipsisToggleItems';
import { Project } from '../../api/dtos/project.dto';
import React from 'react'
import { useProjects } from '../../api/hooks/projects/useProjects';

export const ProjectList = () => {
    const { projects, isError, createProject } = useProjects();

    const createNewProject = async (newEntity: Project) => {
        return await createProject(newEntity);
    }

    return (
        <>
            <div className="flex items-center">
                <h1 className="m-4 tile-marker text-2xl ">Projects</h1>
                <AddEntity buttonText='Create Project +' modalComponent={AddProjectModal} modalSubmit={createNewProject} />
                <span>
                    {isError &&
                        <>Error Loading Projects...</>
                    }
                </span>
            </div>
            <hr className="mx-4" />
            {projects.length ?
                <div className='grid grid-cols-3 gap-4'>
                    {projects.map((project, index: number) => {
                        return (
                            <div key={project.name + "-" + index} data-projectid="project" className="m-4 rounded shadow-md">
                                <div className="px-6 py-4">
                                    <div className="flex justify-between font-bold text-xl mb-2">
                                        {project.name}
                                        <EllipsisToggleItems entity={project} />
                                    </div>
                                    <p className="text-gray-700 text-base">
                                        {project.description}
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <div>
                                        Project Start - {new Date(project.startDate).toDateString()}
                                    </div>
                                    <div>
                                        Project End - {new Date(project.endDate).toDateString()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                : null
            }
        </>
    );

}
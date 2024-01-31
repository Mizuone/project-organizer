import useSWR, { Fetcher, MutatorOptions } from 'swr'

import { Project } from "../../dtos/project.dto"
import { ProjectsEndpoint } from './projectsApi';
import { sortByStartDate } from '../../../helpers/helpers';

export const useProjects = () => {
    const fetcher: Fetcher<Project[], string> = (url: string) =>
        fetch(`${url}`)
        .then((response) => response.json())
    
    const headers = { "Content-Type": "application/json" };

    const mutatorOptions: MutatorOptions = {
        rollbackOnError: true,
        revalidate: false
    };

    let requestOptions = {
        method: 'GET',
        headers,
        body: ""
    }

    const fetchWithRequestOptions = (url: string, options: RequestInit) => fetch(`${url}`, options).then((response) => response.json());

    const { data: projects = [], error, isLoading, mutate } = useSWR<Project[], Error>(ProjectsEndpoint, fetcher);

    const createProject = async (newProject: Project) => {
        await mutate(
            mutateProjects(`${ProjectsEndpoint}`, 'POST', JSON.stringify({ ...newProject })),
            {
                optimisticData: [...projects, newProject],
                populateCache: ((result: Project, currentData: Project[] | undefined) => currentData ?
                    sortByStartDate([...currentData, result]) :
                    []
                ),
                ...mutatorOptions
            }
        );
    }

    const updateProject = async (id: string = "", updatedProject: Project) => {
        await mutate(
            mutateProjects(`${ProjectsEndpoint}/${id}`, 'PUT', JSON.stringify({ id, ...updatedProject })),
            {
                optimisticData: [...projects.filter((project) => project.id !== id), updatedProject],
                populateCache: ((result: Project | undefined, currentData: Project[] | undefined) => currentData && result ? 
                    sortByStartDate([...currentData.filter((project) => project.id !== id), result]) :
                    []
                ),
                ...mutatorOptions
            }
        );
    }

    const deleteProject = async (id: string = "") => {
        await mutate(
            mutateProjects(`${ProjectsEndpoint}/${id}`, 'DELETE', ''),
            {
                optimisticData: [...projects.filter((project) => project.id !== id)],
                populateCache: ((result: boolean, currentData: Project[] | undefined) => currentData && result ?
                    sortByStartDate([...currentData.filter((project) => project.id !== id)]) :
                    []
                ),
                ...mutatorOptions
            }
        );
    }

    const mutateProjects = async (fetchUrl: string, requestMethod: string, requestBody: string) => {
        requestOptions.method = requestMethod;
        requestOptions.body = requestBody;

        return fetchWithRequestOptions(fetchUrl, requestOptions)
    }

    return { projects: sortByStartDate(projects), isError: error, isLoading, createProject, updateProject, deleteProject };
}
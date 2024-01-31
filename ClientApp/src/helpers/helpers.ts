import { Project } from "../api/dtos/project.dto";

export const sortByStartDate = (projects: Project[]) => {
    return projects.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}
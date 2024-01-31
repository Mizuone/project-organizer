using ReactProjectCRUD.Models;

namespace ReactProjectCRUD.Services.Projects
{
    public interface IProjectService
    {
        Task<List<Project>> GetProjects();
        Task<Project> CreateProject(Project newProject);
        Task<Project?> UpdateProject(Guid projectId, Project newProject);
        Task<bool> DeleteProject(Guid projectId);
    }
}

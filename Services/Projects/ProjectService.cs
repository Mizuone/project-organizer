using Microsoft.EntityFrameworkCore;
using ReactProjectCRUD.Data;
using ReactProjectCRUD.Models;

namespace ReactProjectCRUD.Services.Projects
{
    public class ProjectService : IProjectService
    {
        private readonly DataContext _context;

        public ProjectService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Project>> GetProjects()
        {
            return await _context.projects.ToListAsync();
        }

        public async Task<Project> CreateProject(Project newProject)
        {
            _context.projects.Add(newProject);

            await _context.SaveChangesAsync();

            return newProject;
        }

        public async Task<Project?> UpdateProject(Guid projectId, Project newProject)
        {
            var project = await _context.projects.FindAsync(projectId);

            if (project == null) { return null; }

            project.Name = newProject.Name;
            project.Description = newProject.Description;
            project.StartDate = newProject.StartDate;
            project.EndDate = newProject.EndDate;

            await _context.SaveChangesAsync();
            
            return project;
        }

        public async Task<bool> DeleteProject(Guid projectId)
        {
            var project = await _context.projects.FindAsync(projectId);

            if (project == null) return false;

            _context.Remove(project);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}

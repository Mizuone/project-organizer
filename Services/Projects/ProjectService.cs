using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ReactProjectCRUD.Data;
using ReactProjectCRUD.Models;

namespace ReactProjectCRUD.Services.Projects
{
    public class ProjectService : IProjectService
    {
        private readonly DataContext _context;
        private readonly IMemoryCache _memoryCache;

        public ProjectService(DataContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<List<Project>> GetProjects()
        {
            if (!_memoryCache.TryGetValue("Projects", out Task<List<Project>> projects))
            {
                projects = _context.projects.ToListAsync();

                var cacheOptions = new MemoryCacheEntryOptions
                {
                    SlidingExpiration = TimeSpan.FromMinutes(3),
                };

                _memoryCache.Set("Projects", projects, cacheOptions);
            }

            return await projects;
        }

        public async Task<Project> CreateProject(Project newProject)
        {
            _context.projects.Add(newProject);

            await _context.SaveChangesAsync();

            _memoryCache.Remove("Projects");

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

            _memoryCache.Remove("Projects");

            return project;
        }

        public async Task<bool> DeleteProject(Guid projectId)
        {
            var project = await _context.projects.FindAsync(projectId);

            if (project == null) return false;

            _context.Remove(project);

            await _context.SaveChangesAsync();

            _memoryCache.Remove("Projects");

            return true;
        }
    }
}

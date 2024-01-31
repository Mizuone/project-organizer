using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactProjectCRUD.Models;
using ReactProjectCRUD.Services.Projects;

namespace ReactProjectCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Project>>> Get()
        {
            var result = await _projectService.GetProjects();

            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<Project>> CreateProject([FromBody] Project newProject)
        {
            var result = await _projectService.CreateProject(newProject);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Project?>> UpdateProject([FromRoute] Guid id, [FromBody] Project newProject)
        {
            var result = await _projectService.UpdateProject(id, newProject);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteProject([FromRoute]Guid id)
        {
            var result = await _projectService.DeleteProject(id);

            return Ok(result);
        }
    }
}

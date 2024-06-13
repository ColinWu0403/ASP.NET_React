using Microsoft.AspNetCore.Mvc;
using SimpleWebAppReact.Models;
using Microsoft.Extensions.Logging;

namespace SimpleWebAppReact.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BuildingController : ControllerBase
    {
        private readonly ILogger<BuildingController> _logger;

        public BuildingController(ILogger<BuildingController> logger)
        {
            _logger = logger;
        }

        [HttpGet] // Define the route for this action
        public IActionResult GetBuildingData()
        {
            var building = new Building("Purdue University", "610 Purdue Mall, West Lafayette, IN 47907");

            // Log building data
            _logger.LogInformation($"Building Data: Name = {building.Name}, Address = {building.Address}");

            return Ok(building);
        }
    }
}


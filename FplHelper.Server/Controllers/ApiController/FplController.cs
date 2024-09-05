using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace FplHelper.Server.Controllers.ApiController
{
    [ApiController]
    [Route("api/fpl")]
    public class FplController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public FplController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<IActionResult> GetFplData()
        {
            var fplApiUrl = "https://fantasy.premierleague.com/api/bootstrap-static/";

            try
            {
                // Send the request to the FPL API
                var response = await _httpClient.GetAsync(fplApiUrl);

                // Ensure a successful response
                response.EnsureSuccessStatusCode();

                // Read the content from the response
                var data = await response.Content.ReadAsStringAsync();

                // Return the data as JSON
                return Content(data, "application/json");
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, "An error occurred while fetching data from the FPL API.");
            }
        }
    }
}
using Microsoft.AspNetCore.Mvc;

namespace Restaurant.Controllers;

public class FallbackController : Controller
{
    public PhysicalFileResult Index()
    {
        return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
    }
}
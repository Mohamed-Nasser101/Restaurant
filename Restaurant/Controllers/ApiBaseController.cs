using MediatR;
using Microsoft.AspNetCore.Mvc;
using Restaurant.Core;

namespace Restaurant.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ApiBaseController : ControllerBase
{
    private IMediator _mediator;
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>();

    protected IActionResult CommandResult<T>(Result<T> result)
    {
        if (result.IsSuccess)
            return Ok(result.Value);

        return BadRequest(result.Error);
    }

    protected IActionResult QueryResult<T>(Result<T> result)
    {
        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);

        if (result.IsSuccess && result.Value is null)
            return NotFound();

        return BadRequest(result.Error);
    }
}
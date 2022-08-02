using Microsoft.AspNetCore.Mvc;
using Restaurant.Extensions;
using Restaurant.Features.Branch;
using Restaurant.Features.Branch.Commands;
using Restaurant.Features.Branch.Dtos;
using Restaurant.Features.Branch.Queries;

namespace Restaurant.Controllers;

public class BranchesController : ApiBaseController
{
    [HttpGet]
    public async Task<IActionResult> GetBranches([FromQuery] PaginationParams paginationParams,
        [FromQuery] BranchFilterParams filterParams)
    {
        var branches = await Mediator.Send(new BranchList(paginationParams, filterParams));
        return QueryResult(branches);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetBranches(int id)
    {
        if (id == 0) return BadRequest();
        var branch = await Mediator.Send(new BranchDetails(id));
        return QueryResult(branch);
    }

    [HttpPost]
    public async Task<IActionResult> AddBranch(BranchDto branchDto)
    {
        var result = await Mediator.Send(new BranchCreate(branchDto));
        return CommandResult(result);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> EditBranch(int id, BranchDto branchDto)
    {
        if (id == 0) return BadRequest();
        var result = await Mediator.Send(new BranchEdit(id, branchDto));
        return CommandResult(result);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteBranch(int id)
    {
        if (id == 0) return BadRequest();
        var result = await Mediator.Send(new BranchDelete(id));
        return CommandResult(result);
    }
}
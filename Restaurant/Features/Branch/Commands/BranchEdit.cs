using MediatR;
using Microsoft.EntityFrameworkCore;
using Restaurant.Core;
using Restaurant.Data;
using Restaurant.Features.Branch.Dtos;

namespace Restaurant.Features.Branch.Commands;

public record BranchEdit(int Id, BranchDto BranchDto) : IRequest<Result<Unit>>;

public class EditHandler : IRequestHandler<BranchEdit, Result<Unit>>
{
    private readonly ApplicationContext _context;

    public EditHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Result<Unit>> Handle(BranchEdit request, CancellationToken cancellationToken)
    {
        var branch = await _context.Branches.FirstOrDefaultAsync(x => x.Id == request.Id);
        if (branch is null) return Result<Unit>.Failure("Branch doesn't exist");
        
        branch.Title = request.BranchDto.Title;
        branch.ClosingHour = TimeOnly.FromDateTime(request.BranchDto.ClosingHour);
        branch.OpeningHour = TimeOnly.FromDateTime(request.BranchDto.OpeningHour);
        branch.ManagerName = request.BranchDto.ManagerName;
        var result = await _context.SaveChangesAsync();
        return result > 0
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Error Editing the branch");
    }
}
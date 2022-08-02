using MediatR;
using Microsoft.EntityFrameworkCore;
using Restaurant.Core;
using Restaurant.Data;

namespace Restaurant.Features.Branch.Commands;

public record BranchDelete(int Id) : IRequest<Result<Unit>>;

public class DeleteHandler : IRequestHandler<BranchDelete, Result<Unit>>
{
    private readonly ApplicationContext _context;

    public DeleteHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Result<Unit>> Handle(BranchDelete request, CancellationToken cancellationToken)
    {
        var branch = await _context.Branches.FirstOrDefaultAsync(x => x.Id == request.Id);
        if (branch is null) return Result<Unit>.Failure("Branch doesn't exist");
        _context.Branches.Remove(branch);

        var result = await _context.SaveChangesAsync();
        return result > 0
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Error Deleting the branch");
    }
}
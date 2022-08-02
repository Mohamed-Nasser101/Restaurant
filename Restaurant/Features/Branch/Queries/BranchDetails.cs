using MediatR;
using Microsoft.EntityFrameworkCore;
using Restaurant.Core;
using Restaurant.Data;
using Restaurant.Features.Branch.Dtos;

namespace Restaurant.Features.Branch.Queries;

public record BranchDetails(int Id) : IRequest<Result<BranchDto>>;

public class DetailsHandler : IRequestHandler<BranchDetails, Result<BranchDto>>
{
    private readonly ApplicationContext _context;

    public DetailsHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Result<BranchDto>> Handle(BranchDetails request, CancellationToken cancellationToken)
    {
        var branch = await _context.Branches.Where(r => r.Id == request.Id)
            .Select(b => new BranchDto
            {
                Title = b.Title,
                OpeningHour = DateTime.Today.AddTicks(b.OpeningHour.Ticks),
                ClosingHour = DateTime.Today.AddTicks(b.ClosingHour.Ticks),
                ManagerName = b.ManagerName
            }).FirstOrDefaultAsync();

        return Result<BranchDto>.Success(branch);
    }
}
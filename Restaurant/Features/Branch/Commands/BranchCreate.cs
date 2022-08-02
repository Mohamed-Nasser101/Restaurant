using MediatR;
using Restaurant.Core;
using Restaurant.Data;
using Restaurant.Features.Branch.Dtos;

namespace Restaurant.Features.Branch.Commands;

public record BranchCreate(BranchDto BranchDto) : IRequest<Result<GetBranchDto>>;

public class CreateHandler : IRequestHandler<BranchCreate, Result<GetBranchDto>>
{
    private readonly ApplicationContext _context;

    public CreateHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Result<GetBranchDto>> Handle(BranchCreate request, CancellationToken cancellationToken)
    {
        var branch = new Data.Entities.Branch
        {
            Title = request.BranchDto.Title,
            ClosingHour = TimeOnly.FromDateTime(request.BranchDto.ClosingHour),
            OpeningHour = TimeOnly.FromDateTime(request.BranchDto.OpeningHour),
            ManagerName = request.BranchDto.ManagerName
        };
        _context.Branches.Add(branch);
        var result = await _context.SaveChangesAsync();
        return result > 0
            ? Result<GetBranchDto>.Success(new GetBranchDto
            {
                Id = branch.Id, Title = branch.Title,
                ClosingHour = DateTime.Today.AddTicks(branch.ClosingHour.Ticks),
                OpeningHour = DateTime.Today.AddTicks(branch.OpeningHour.Ticks)
            })
            : Result<GetBranchDto>.Failure("Error Creating the branch");
    }
}
using MediatR;
using Restaurant.Core;
using Restaurant.Data;
using Restaurant.Extensions;
using Restaurant.Features.Branch.Dtos;

namespace Restaurant.Features.Branch.Queries;

public record BranchList(PaginationParams PaginationParams, BranchFilterParams FilterParams)
    : IRequest<Result<PagedList<GetBranchDto>>>;

public class ListHandler : IRequestHandler<BranchList,Result<PagedList<GetBranchDto>>>
{
    private readonly ApplicationContext _context;

    public ListHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Result<PagedList<GetBranchDto>>> Handle(BranchList request, CancellationToken cancellationToken)
    {
        var branches = await _context.Branches
            .ApplyFiltering(new BranchFilter(), request.FilterParams)
            .Select(b => new GetBranchDto
            {
                Id = b.Id,
                Title = b.Title,
                OpeningHour = DateTime.Today.AddTicks(b.OpeningHour.Ticks),
                ClosingHour = DateTime.Today.AddTicks(b.ClosingHour.Ticks),
                ManagerName = b.ManagerName
            }).ToPaginatedAsync(request.PaginationParams);

        return Result<PagedList<GetBranchDto>>.Success(branches);
    }
}
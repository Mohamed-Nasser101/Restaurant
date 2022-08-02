using Restaurant.Extensions;

namespace Restaurant.Features.Branch;

public record BranchFilterParams(string Title,
   // DateTime CloseHour, DateTime OpenHour,
    string ManagerName);

public class BranchFilter : IFilteringStrategy<Data.Entities.Branch, BranchFilterParams>
{
    public IQueryable<Data.Entities.Branch> ApplyFiltering(IQueryable<Data.Entities.Branch> query,
        BranchFilterParams parameters)
    {
        var result = query;

        if (!string.IsNullOrWhiteSpace(parameters.Title))
            result = result.Where(x => x.Title.ToLower().Contains(parameters.Title.ToLower()));

        if (!string.IsNullOrWhiteSpace(parameters.ManagerName))
            result = result.Where(x => x.ManagerName.ToLower().Contains(parameters.ManagerName.ToLower()));

        // if (parameters.CloseHour != DateTime.MinValue)
        // {
        //     var closeTime = TimeOnly.FromDateTime(parameters.CloseHour);
        //     result = result.Where(x => x.ClosingHour == closeTime);
        // }
        //
        // if (parameters.OpenHour != DateTime.MinValue)
        // {
        //     var openTime = TimeOnly.FromDateTime(parameters.OpenHour);
        //     result = result.Where(x => x.OpeningHour == openTime);
        // }

        return result;
    }
}
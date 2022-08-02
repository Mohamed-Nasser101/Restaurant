using Microsoft.EntityFrameworkCore;

namespace Restaurant.Extensions;

public static class PaginationExtension
{
    public static async Task<PagedList<T>> ToPaginatedAsync<T>(this IQueryable<T> query, PaginationParams @params)
    {
        var count = await query.CountAsync();
        var items = await query
            .Skip((@params.PageNumber - 1) * @params.PageSize)
            .Take(@params.PageSize).ToListAsync();

        return new PagedList<T>(items, count, @params.PageNumber, @params.PageSize);
    }
}

public record PaginationParams(int PageNumber = 1, int PageSize = 3);

public record PagedList<T>(List<T> Items, int Count, int PageNumber, int PageSize);
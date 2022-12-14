namespace Restaurant.Extensions;

public static class FilteringExtensions
{
    public static IQueryable<T> ApplyFiltering<T, TP>(this IQueryable<T> query, IFilteringStrategy<T, TP> filtering,
        TP parameters)
    {
        return filtering.ApplyFiltering(query, parameters);
    }
}

public interface IFilteringStrategy<T, TP>
{
    IQueryable<T> ApplyFiltering(IQueryable<T> query, TP parameters);
}
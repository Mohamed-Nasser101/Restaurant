namespace Restaurant.Data.Entities;

public class Branch
{
    public int Id { get; set; }
    public string Title { get; set; }
    public TimeOnly OpeningHour { get; set; }
    public TimeOnly ClosingHour { get; set; }
    public string ManagerName { get; set; }
}
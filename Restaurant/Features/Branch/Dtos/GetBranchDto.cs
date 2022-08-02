namespace Restaurant.Features.Branch.Dtos;

public class GetBranchDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public DateTime OpeningHour { get; set; }
    public DateTime ClosingHour { get; set; }
    public string ManagerName { get; set; }
}
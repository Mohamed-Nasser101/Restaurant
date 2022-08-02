namespace Restaurant.Data.Entities;

public class Booking
{
    public int Id { get; set; }
    public string ClientName { get; set; }
    public DateTime Time { get; set; }
    public Branch Branch { get; set; }
    public int BranchId { get; set; }
}
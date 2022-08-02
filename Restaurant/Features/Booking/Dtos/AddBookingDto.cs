using FluentValidation;

namespace Restaurant.Features.Booking.Dtos;

public class AddBookingDto
{
    public string ClientName { get; set; }
    public DateTime Time { get; set; }
    public int BranchId { get; set; }
}

public class AddBookingDtoValidator : AbstractValidator<AddBookingDto>
{
    public AddBookingDtoValidator()
    {
        RuleFor(x => x.Time).NotEmpty();
        RuleFor(x => x.ClientName).NotEmpty();
        RuleFor(x => x.BranchId).NotEmpty();
    }
}
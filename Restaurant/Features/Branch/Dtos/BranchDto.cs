using FluentValidation;

namespace Restaurant.Features.Branch.Dtos;

public class BranchDto
{
    public string Title { get; set; }
    public DateTime OpeningHour { get; set; }
    public DateTime ClosingHour { get; set; }
    public string ManagerName { get; set; }
}

public class BranchDtoValidator : AbstractValidator<BranchDto>
{
    public BranchDtoValidator()
    {
        var midNight = DateTime.Now.Date;
        var hoursRange = Enumerable.Range(0, 48)
            .Select(x => midNight.AddMinutes(x * 30))
            .ToList();

        RuleFor(x => x.Title).MaximumLength(200).NotEmpty();

        RuleFor(x => x.ManagerName).MaximumLength(250);

        RuleFor(x => x.ClosingHour)
            .Must(closeHour => hoursRange.Any(time =>
                time.TimeOfDay.Hours == closeHour.TimeOfDay.Hours &&
                time.TimeOfDay.Minutes == closeHour.TimeOfDay.Minutes))
            .WithMessage("Hours should be in half hour range")
            .Must((branch, closeHour) => branch.OpeningHour < closeHour)
            .WithMessage("Closing Hours should be after opening ones");

        RuleFor(x => x.OpeningHour)
            .Must(openHour => hoursRange.Any(time =>
                time.TimeOfDay.Hours == openHour.TimeOfDay.Hours &&
                time.TimeOfDay.Minutes == openHour.TimeOfDay.Minutes))
            .WithMessage("Hours should be in half hour range");
    }
}
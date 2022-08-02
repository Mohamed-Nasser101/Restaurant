using Microsoft.AspNetCore.Mvc;
using Restaurant.Features.Booking.Commands;
using Restaurant.Features.Booking.Dtos;

namespace Restaurant.Controllers;

public class BookingController : ApiBaseController
{
    [HttpPost]
    public async Task<IActionResult> AddBranch(AddBookingDto bookingDto)
    {
        var result = await Mediator.Send(new AddBookCommand(bookingDto));
        return CommandResult(result);
    }
}
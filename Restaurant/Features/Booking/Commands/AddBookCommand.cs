using MediatR;
using Microsoft.EntityFrameworkCore;
using Restaurant.Core;
using Restaurant.Data;
using Restaurant.Features.Booking.Dtos;

namespace Restaurant.Features.Booking.Commands;

public record AddBookCommand(AddBookingDto AddBookingDto) : IRequest<Result<Unit>>;

public class AddBookCommandHandler : IRequestHandler<AddBookCommand, Result<Unit>>
{
    private readonly ApplicationContext _context;

    public AddBookCommandHandler(ApplicationContext context)
    {
        _context = context;
    }

    public async Task<Result<Unit>> Handle(AddBookCommand request, CancellationToken cancellationToken)
    {
        var branch = await _context.Branches.FirstOrDefaultAsync(x => x.Id == request.AddBookingDto.BranchId);
        if (branch is null) return Result<Unit>.Failure("Branch doesn't exist");

        var bookTimeOnly = TimeOnly.FromDateTime(request.AddBookingDto.Time);
        if (bookTimeOnly < branch.OpeningHour || bookTimeOnly > branch.ClosingHour)
            return Result<Unit>.Failure("Branch doesn't open in this time");

        var booking = new Data.Entities.Booking
        {
            Branch = branch,
            Time = request.AddBookingDto.Time,
            ClientName = request.AddBookingDto.ClientName
        };

        _context.Bookings.Add(booking);
        var result = await _context.SaveChangesAsync();
        return result > 0 
            ? Result<Unit>.Success(Unit.Value)
            : Result<Unit>.Failure("Error Booking") ;
    }
}
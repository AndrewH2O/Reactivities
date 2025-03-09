using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<string> // command don't return anything but we return a string here
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Activities.Add(request.Activity); // asking EF to track changes

            await context.SaveChangesAsync(cancellationToken);

            return request.Activity.Id; // here we do return an Id from this command,
                                        // otherwise the client would have to create the guid
                                        // and send that up to us, instead we create the
                                        // ID server side - see Activity class
        }
    }
}
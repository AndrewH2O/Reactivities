using Domain;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Activity>
    {
        public string Id { get; set; } // query parameters
    }

    public class Handler(AppDbContext context, ILogger<GetActivityList> logger) : IRequestHandler<Query, Activity>
    {
        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .FindAsync([request.Id], cancellationToken);
            if (activity == null) throw new Exception("Activity not found");
            return activity;
        }
    }
}
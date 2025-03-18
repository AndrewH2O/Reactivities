using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    // if we needed params this would go inside curly braces as properies
    public class Query:IRequest<List<Activity>>{} 

    // returns list of activities
    public class Handler(AppDbContext context, ILogger<GetActivityList> logger) : IRequestHandler<Query, List<Activity>> 
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            // add some fakery to cause a delay so we may demonstrate use of cancellation token
            try
            {
                for (int i = 0; i < 10; i++)
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    await Task.Delay(1000, cancellationToken);// fake delay
                    logger.LogInformation($"Task {i} has completed");
                }
            }
            catch (Exception e)
            {
                logger.LogInformation("************** Task was cancelled *******************");
            }
            return await context.Activities.ToListAsync(cancellationToken: cancellationToken);
        }
    }
}
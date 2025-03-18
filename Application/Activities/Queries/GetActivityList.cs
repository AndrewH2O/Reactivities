﻿using Domain;
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
    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Activity>> 
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            
            return await context.Activities.ToListAsync(cancellationToken: cancellationToken);
        }
    }
}
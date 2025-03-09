using Application.Activities.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

// api/activities

// primary ctor
public class ActivitiesController(IMediator mediator) : BaseApiController
{
    //api/Activities
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        // request delegate handles this - then it will pass data back to main app thread when done
        return await mediator.Send(new GetActivityList.Query());
    }
    //api/Activities/{{id}}
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> getActivityDetail(string id)
    {
        return await mediator.Send(new GetActivityDetails.Query { Id = id });
    }
}
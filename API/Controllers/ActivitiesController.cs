﻿using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers;

// api/activities

// primary ctor
public class ActivitiesController(AppDbContext context) : BaseApiController
{
    //api/Activities
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
    {
        // request delegate handles this - then it will pass data back to main app thread when done
        return await context.Activities.ToListAsync();
    }
    //api/Activities/{{id}}
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> getActivityDetail(string id)
    {
        var activity = await context.Activities.FindAsync(id); // works only with pk

        if (activity == null) 
            return NotFound(); // 404
        
        return activity;
    }
}
using CopyZillaBackend.API.Helpers;
using CopyZillaBackend.API.Middlewares;
using CopyZillaBackend.Application;
using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Infrastructure;
using CopyZillaBackend.Persistence;
using Microsoft.AspNetCore.Http.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull);
builder.Services.AddLogging();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Service registration
builder.Services.AddSingleton<IResponseManager, ResponseManager>();
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices();
builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddTransient<IResponseManager, ResponseManager>();

builder.Services.AddCors(options => options
        .AddPolicy(name: "localhost", (policy) =>
        {
            policy
                .WithOrigins("http://localhost", "https://localhost")
                .SetIsOriginAllowed(host => true)
                .AllowAnyHeader()
                .AllowAnyMethod();
        })
    );

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("localhost");

//app.UseAuthorization();

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseEndpoints(endpoints => endpoints.MapControllers());

app.Run();

public partial class Program { }
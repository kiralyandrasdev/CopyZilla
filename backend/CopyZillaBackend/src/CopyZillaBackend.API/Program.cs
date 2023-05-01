using CopyZillaBackend.API.Endpoints;
using CopyZillaBackend.API.Middlewares;
using CopyZillaBackend.Application;
using CopyZillaBackend.Infrastructure;
using CopyZillaBackend.Persistence;
using FirebaseAdmin;
using FluentScheduler;
using Google.Apis.Auth.OAuth2;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// builder.Services.AddControllers()
//     .AddNewtonsoftJson(options =>
//         {
//             options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
//             options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
//         }
//     );

builder.Services.AddLogging();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Service registration
builder.Services.AddApplicationServices();
builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddInfrastructureServices();

builder.Services.AddTransient<AuthorizationMiddleware>();
builder.Services.AddTransient<ExceptionHandlerMiddleware>();
builder.Services.AddTransient<StripeWebhookMiddleware>();

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

var scheduler = new CopyZillaBackend.Infrastructure.Scheduler.TaskScheduler(builder.Services);
JobManager.Initialize(scheduler);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("localhost");

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseWhen(context => context.Request.Path.Value?.Contains("/webhook/payment") == false,
    app =>
{
    app.UseMiddleware<AuthorizationMiddleware>();
});

app.UseWhen(context => context.Request.Path.Value?.Contains("/webhook/payment") == true, app =>
{
    app.UseMiddleware<StripeWebhookMiddleware>();
});

app.MapApiEndpoints();

string configFileName = app.Environment.IsDevelopment() ? "firebaseConfig.Development.json" : "firebaseConfig.json";

if (FirebaseApp.GetInstance("default") is null)
{
    FirebaseApp.Create(new AppOptions()
    {
        Credential = GoogleCredential.FromFile(configFileName),
    }, "default");
}

if (FirebaseApp.GetInstance("internal") is null)
{
    FirebaseApp.Create(new AppOptions()
    {
        Credential = GoogleCredential.FromFile("firebaseConfig.Internal.json"),
    }, "internal");
}

app.Run();

public partial class Program { }
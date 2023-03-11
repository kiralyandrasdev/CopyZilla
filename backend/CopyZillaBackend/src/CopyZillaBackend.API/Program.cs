using CopyZillaBackend.API.Helpers;
using CopyZillaBackend.API.Middlewares;
using CopyZillaBackend.Application;
using CopyZillaBackend.Application.Contracts.Helpers;
using CopyZillaBackend.Infrastructure;
using CopyZillaBackend.Persistence;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
        {
            options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    );

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

builder.Services.AddTransient<AuthorizationMiddleware>();
builder.Services.AddTransient<InternalAuthorizationMiddleware>();
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

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("localhost");

app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseWhen(context => context.Request.Path.Value?.Contains("/webhook/payment") == false &&
    context.Request.Path.Value?.Contains("/internal") == false, app =>
{
    app.UseMiddleware<AuthorizationMiddleware>();
});

app.UseWhen(context => context.Request.Path.Value?.Contains("/webhook/payment") == true, app =>
{
    app.UseMiddleware<StripeWebhookMiddleware>();
});

app.UseWhen(context => context.Request.Path.Value?.Contains("/internal") == true, app =>
{
    app.UseMiddleware<InternalAuthorizationMiddleware>();
});

app.UseEndpoints(endpoints => endpoints.MapControllers());

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
using DigiCamp.Data;
using DigiCamp.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 🔹 1. Add services
//builder.Services.AddControllers();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
        options.JsonSerializerOptions.WriteIndented = true; // Optional: makes JSON easier to read
    });


// 🔹 2. Add DbContext (SQL Server)
builder.Services.AddDbContext<DigiCampContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 🔹 3. Configure Authentication (JWT)
var key = builder.Configuration["Jwt:Key"] ?? "ThisIsAVeryStrongSecretKeyForDigiCamp123456!";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    //options.TokenValidationParameters = new TokenValidationParameters
    //{
    //    ValidateIssuer = true,
    //    ValidateAudience = true,
    //    ValidateLifetime = true,
    //    ValidateIssuerSigningKey = true,
    //    ValidIssuer = builder.Configuration["Jwt:Issuer"],
    //    ValidAudience = builder.Configuration["Jwt:Audience"],
    //    IssuerSigningKey = new SymmetricSecurityKey(
    //        Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "SuperSecretKey123"))
    //};
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "SuperSecretKey123")),

        // 🔥 This line tells ASP.NET to treat your custom claim as the NameIdentifier
        NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    };
});

// 🔹 4. Enable Swagger with JWT support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "DigiCamp API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please insert JWT token into field (Bearer {token})",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

// 🔹 5. Add CORS (important for frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:4200") // React/Angular
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 🔹 6. Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🔹 7. Seed Sample Data (optional but helpful for testing)
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DigiCampContext>();

    if (!context.Users.Any())
    {
        var user = new User { Username = "Sangeirthanaa", Email = "sange@example.com" };
        context.Users.Add(user);

        var campaign = new Campaign { Title = "Diwali Promo", User = user };
        var account = new SocialAccount { Platform = "Instagram", User = user };
        var post = new Post { Content = "Happy Diwali!", Campaign = campaign, SocialAccount = account };
        var analytics = new Analytics { Post = post, Impressions = 1000, Clicks = 120, EngagementRate = 12 };

        context.Campaigns.Add(campaign);
        context.SocialAccounts.Add(account);
        context.Posts.Add(post);
        context.Analytics.Add(analytics);

        context.SaveChanges();
    }
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

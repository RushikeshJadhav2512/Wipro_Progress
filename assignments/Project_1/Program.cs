var builder = WebApplication.CreateBuilder(args);

// Configure services
builder.Services.AddLogging(config =>
{
    config.AddConsole();
    config.SetMinimumLevel(LogLevel.Information);
});

builder.Services.AddRouting();

var app = builder.Build();

// Enable static file serving from wwwroot
app.UseStaticFiles();

// Custom middleware to log incoming requests and responses
app.Use(async (context, next) =>
{
    var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
    
    // Log request details
    logger.LogInformation("Incoming Request: {Method} {Path}", 
        context.Request.Method, 
        context.Request.Path);
    
    // Store start time
    var startTime = DateTime.Now;
    
    // Call next middleware
    await next();
    
    // Log response details
    var duration = DateTime.Now - startTime;
    logger.LogInformation("Outgoing Response: {StatusCode} - Duration: {Duration}ms", 
        context.Response.StatusCode, 
        duration.TotalMilliseconds);
});

// Error handling middleware - must be after other middleware but before terminal middleware
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "text/html";
        
        var errorHtml = @"
        <!DOCTYPE html>
        <html>
        <head>
            <title>Error Page</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; background-color: #f5f5f5; }
                .error-container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #d9534f; }
                .error-message { color: #333; font-size: 16px; }
            </style>
        </head>
        <body>
            <div class='error-container'>
                <h1>⚠️ An Error Occurred</h1>
                <p class='error-message'>We're sorry, but an unexpected error has occurred. Please try again later.</p>
                <p><strong>Error Code:</strong> 500 - Internal Server Error</p>
            </div>
        </body>
        </html>";
        
        await context.Response.WriteAsync(errorHtml);
    });
});

// Configure routing
app.UseRouting();

// Define endpoints
app.MapGet("/", async context =>
{
    context.Response.ContentType = "text/html";
    await context.Response.SendFileAsync("wwwroot/index.html");
});

app.MapGet("/error-test", async context =>
{
    throw new Exception("This is a test exception to demonstrate error handling middleware!");
});

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "Healthy", timestamp = DateTime.Now }));

// Hello API endpoint
app.MapGet("/api/hello", () => Results.Ok(new { message = "Hello from API!", timestamp = DateTime.Now }));

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Host the application
app.Run("http://localhost:5000");


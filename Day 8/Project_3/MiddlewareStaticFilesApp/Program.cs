var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Middleware: Log Requests & Responses
app.Use(async (context, next) =>
{
    Console.WriteLine($"Request: {context.Request.Method} {context.Request.Path}");
    await next();
    Console.WriteLine($"Response: {context.Response.StatusCode}");
});

// Error Handling Middleware
app.UseExceptionHandler("/error");

// Enforce HTTPS
app.UseHttpsRedirection();

// Security Headers (CSP)
app.Use(async (context, next) =>
{
    context.Response.Headers.Add(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self'; style-src 'self'"
    );
    await next();
});

// Serve Static Files
app.UseStaticFiles();

// Fallback
app.MapGet("/", () => "Middleware Static File App Running");

app.Run();
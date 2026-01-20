# .NET Core Middleware Demo Application

## Project Overview

This is a .NET Core 8.0 web application that demonstrates the use of middleware to handle HTTP requests and serves static files. The application includes request/response logging, error handling, and static file serving using the minimal hosting model.

## Features Implemented

### ✅ User Story 1: Create a .NET Core Application

- Basic web project using .NET 8.0 minimal hosting model
- Request and response logging middleware implemented

### ✅ User Story 2: Configure Middleware Components

- Middleware to log request details (method, path)
- Middleware to log response status codes
- Error handling middleware with custom error page

### ✅ User Story 3: Serve Static Files

- wwwroot folder with HTML, CSS, and JavaScript files
- Static files served correctly via browser

## Project Structure

```
assignments/Project_1/
├── MiddlewareDemo.csproj     # .NET 8.0 Web Project
├── Program.cs                 # Middleware configuration & endpoints
└── wwwroot/
    ├── index.html             # Main HTML page
    ├── css/
    │   └── style.css          # Styling
    └── js/
        └── app.js             # Client-side JavaScript
```

## How to Run

### Prerequisites

- .NET 8.0 SDK or later
- VS Code with C# extension

### Steps to Run

1. Navigate to the project directory:

   ```bash
   cd assignments/Project_1
   ```

2. Restore dependencies:

   ```bash
   dotnet restore
   ```

3. Build the project:

   ```bash
   dotnet build
   ```

4. Run the application:

   ```bash
   dotnet run
   ```

5. Open your browser and navigate to:
   - **Home Page**: `http://localhost:5000`
   - **Health Check**: `http://localhost:5000/health`
   - **Hello API**: `http://localhost:5000/api/hello`
   - **Error Test**: `http://localhost:5000/error-test`

## Middleware Features

### 1. Request Logging Middleware

- Logs incoming request method and path
- Logs outgoing response status codes
- Measures request duration

### 2. Error Handling Middleware

- Catches unhandled exceptions
- Returns custom HTML error page
- Sets appropriate HTTP status code (500)

### 3. Static File Serving

- Automatically serves files from wwwroot
- Supports HTML, CSS, JavaScript, and other static assets

## API Endpoints

| Endpoint      | Method | Description              |
| ------------- | ------ | ------------------------ |
| `/`           | GET    | Home page (HTML)         |
| `/health`     | GET    | Health check endpoint    |
| `/api/hello`  | GET    | Hello API with timestamp |
| `/error-test` | GET    | Test error handling      |

## Testing the Application

### View Console Logs

The application logs:

- Incoming requests (method, path)
- Outgoing responses (status code, duration)
- Any errors encountered

### Test Error Page

Visit `/error-test` to see the custom error handling middleware in action.

## Security Measures for Static Files

- Files are served from a designated wwwroot folder
- Path traversal protection is built into ASP.NET Core
- Only files within wwwroot are accessible

## Technologies Used

- .NET Core 8.0
- ASP.NET Core
- C# 12
- HTML5, CSS3, JavaScript (ES6+)

## Learning Outcomes

- Understanding middleware pipeline in ASP.NET Core
- Configuring middleware components
- Serving static files
- Error handling strategies
- Request/response logging

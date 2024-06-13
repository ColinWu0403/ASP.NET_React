using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Run npm install and npm run build to build the React app
RunNpmInstall();
RunNpmBuild();

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapFallbackToFile("/index.html"); // This will serve index.html for any routes not handled by the controller
});

app.Run();

void RunNpmInstall()
{
    var npmCommand = GetNpmCommand();
    var processInfo = new ProcessStartInfo
    {
        FileName = npmCommand,
        Arguments = "install",
        WorkingDirectory = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp"),
        RedirectStandardOutput = true,
        RedirectStandardError = true,
        UseShellExecute = false,
        CreateNoWindow = true
    };

    RunProcess(processInfo);
}

void RunNpmBuild()
{
    var npmCommand = GetNpmCommand();
    var processInfo = new ProcessStartInfo
    {
        FileName = npmCommand,
        Arguments = "run build",
        WorkingDirectory = Path.Combine(Directory.GetCurrentDirectory(), "ClientApp"),
        RedirectStandardOutput = true,
        RedirectStandardError = true,
        UseShellExecute = false,
        CreateNoWindow = true
    };

    RunProcess(processInfo);
}

string GetNpmCommand()
{
    return OperatingSystem.IsWindows() ? "npm.cmd" : "npm";
}

void RunProcess(ProcessStartInfo processInfo)
{
    using var process = new Process { StartInfo = processInfo };
    process.OutputDataReceived += (sender, e) => Console.WriteLine(e.Data);
    process.ErrorDataReceived += (sender, e) => Console.WriteLine(e.Data);

    process.Start();
    process.BeginOutputReadLine();
    process.BeginErrorReadLine();
    process.WaitForExit();
}
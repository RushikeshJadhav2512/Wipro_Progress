using Project2.Generators;
using Project2.Formatters;
using Project2.Services;

class Program
{
    static void Main()
    {
        var generator = new ReportGenerator();
        var report = generator.Generate();

        var formatter = new PdfFormatter(); // switch to ExcelFormatter
        var service = new ReportService(formatter);

        service.Process(report);
    }
}
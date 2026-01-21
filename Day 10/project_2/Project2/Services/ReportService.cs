using Project2.Interfaces;
using Project2.Models;

namespace Project2.Services
{
    public class ReportService
    {
        private readonly IReportFormatter _formatter;

        public ReportService(IReportFormatter formatter)
        {
            _formatter = formatter;
        }

        public void Process(Report report)
        {
            Console.WriteLine(_formatter.Format(report));
        }
    }
}
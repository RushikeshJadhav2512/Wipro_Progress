using Project2.Interfaces;
using Project2.Models;

namespace Project2.Formatters
{
    public class ExcelFormatter : IReportFormatter
    {
        public string Format(Report report)
        {
            return $"[EXCEL] {report.Title},{report.Content}";
        }
    }
}
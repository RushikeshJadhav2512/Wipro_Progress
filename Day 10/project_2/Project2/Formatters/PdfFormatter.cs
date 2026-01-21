using Project2.Interfaces;
using Project2.Models;

namespace Project2.Formatters
{
    public class PdfFormatter : IReportFormatter
    {
        public string Format(Report report)
        {
            return $"[PDF] {report.Title} - {report.Content}";
        }
    }
}
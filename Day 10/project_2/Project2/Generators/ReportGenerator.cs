using Project2.Models;

namespace Project2.Generators
{
    public class ReportGenerator
    {
        public Report Generate()
        {
            return new Report
            {
                Title = "Sales Report",
                Content = "Sales increased by 20%"
            };
        }
    }
}
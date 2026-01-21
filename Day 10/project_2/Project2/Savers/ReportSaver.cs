using Project2.Models;

namespace Project2.Savers
{
    public class ReportSaver
    {
        public void Save(Report report)
        {
            Console.WriteLine("Saving report...");
            Console.WriteLine(report.Title);
        }
    }
}
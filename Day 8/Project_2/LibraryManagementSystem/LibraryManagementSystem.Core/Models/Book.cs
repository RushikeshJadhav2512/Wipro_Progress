namespace LibraryManagementSystem.Core.Models
{
    public class Book
    {
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public bool IsBorrowed { get; set; }
        public Borrower Borrower { get; set; }
    }
}
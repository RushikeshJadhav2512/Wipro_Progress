using System.Collections.Generic;
using System.Linq;
using LibraryManagementSystem.Core.Models;

namespace LibraryManagementSystem.Core.Services
{
    public class Library
    {
        public List<Book> Books { get; } = new List<Book>();

        public void AddBook(Book book)
        {
            Books.Add(book);
        }

        public bool BorrowBook(string isbn, Borrower borrower)
        {
            var book = Books.FirstOrDefault(b => b.ISBN == isbn);

            if (book == null || book.IsBorrowed)
                return false;

            book.IsBorrowed = true;
            book.Borrower = borrower;
            return true;
        }

        public bool ReturnBook(string isbn)
        {
            var book = Books.FirstOrDefault(b => b.ISBN == isbn);

            if (book == null || !book.IsBorrowed)
                return false;

            book.IsBorrowed = false;
            book.Borrower = null;
            return true;
        }
    }
}
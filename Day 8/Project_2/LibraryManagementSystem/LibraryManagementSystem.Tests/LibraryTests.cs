using NUnit.Framework;
using LibraryManagementSystem.Core.Models;
using LibraryManagementSystem.Core.Services;

namespace LibraryManagementSystem.Tests
{
    [TestFixture]
    public class LibraryTests
    {
        private Library _library;

        [SetUp]
        public void Setup()
        {
            _library = new Library();
        }

        [Test]
        public void AddBook_ShouldIncreaseBookCount()
        {
            var book = new Book { Title = "Clean Code", Author = "Robert Martin", ISBN = "123" };

            _library.AddBook(book);

            Assert.That(_library.Books.Count, Is.EqualTo(1));
        }

        [Test]
        public void BorrowBook_WhenAvailable_ShouldReturnTrue()
        {
            var book = new Book { Title = "1984", Author = "George Orwell", ISBN = "456" };
            var borrower = new Borrower { Name = "Rushikesh", BorrowerId = 1 };

            _library.AddBook(book);
            var result = _library.BorrowBook("456", borrower);

            Assert.That(result, Is.True);
            Assert.That(book.IsBorrowed, Is.True);
        }

        [Test]
        public void BorrowBook_WhenAlreadyBorrowed_ShouldReturnFalse()
        {
            var book = new Book { Title = "Dune", Author = "Frank Herbert", ISBN = "789", IsBorrowed = true };
            var borrower = new Borrower { Name = "Rushikesh", BorrowerId = 1 };

            _library.AddBook(book);
            var result = _library.BorrowBook("789", borrower);

            Assert.That(result, Is.False);
            Assert.That(book.IsBorrowed, Is.True);
        }
    }
}
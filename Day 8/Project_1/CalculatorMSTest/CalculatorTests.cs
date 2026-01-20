using CalculatorLibrary;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace CalculatorMSTest
{
    [TestClass]
    public class CalculatorTests
    {
        [TestMethod]
        public void Add_5And3_Returns8()
        {
            // Arrange
            var calculator = new Calculator();

            // Act
            int result = calculator.Add(5, 3);

            // Assert
            Assert.AreEqual(8, result);
        }

        [TestMethod]
        public void Subtract_10Minus5_Returns5()
        {
            var calculator = new Calculator();
            int result = calculator.Subtract(10, 5);
            Assert.AreEqual(5, result);
        }

        [TestMethod]
        public void Multiply_6Times7_Returns42()
        {
            var calculator = new Calculator();
            int result = calculator.Multiply(6, 7);
            Assert.AreEqual(42, result);
        }

        [TestMethod]
        public void Divide_10By2_Returns5()
        {
            var calculator = new Calculator();
            int result = calculator.Divide(10, 2);
            Assert.AreEqual(5, result);
        }

        [TestMethod]
        [ExpectedException(typeof(DivideByZeroException))]
        public void Divide_ByZero_ThrowsException()
        {
            var calculator = new Calculator();
            calculator.Divide(10, 0);
        }
    }
}


# Unit Testing Demo - MSTest and NUnit

## What is Unit Testing?

Unit testing is testing individual parts of your code to make sure they work correctly.

**Simple Example**: If you have a calculator, you test each method (Add, Subtract, etc.) to verify it gives correct results.

## Project Structure

```
Day 8/Project_1/
├── CalculatorLibrary/          # The code we want to test
│   ├── Calculator.cs           # Add, Subtract, Multiply, Divide
│   └── CalculatorLibrary.csproj
├── CalculatorMSTest/           # Tests using MSTest framework
│   ├── CalculatorTests.cs
│   └── CalculatorMSTest.csproj
└── CalculatorNUnit/            # Tests using NUnit framework
    ├── CalculatorTests.cs
    └── CalculatorNUnit.csproj
```

## Connection Between Projects

```
CalculatorLibrary (Library)
        ↓ (reference)
CalculatorMSTest (Test Project)  →  Runs tests on CalculatorLibrary
        ↓ (reference)
CalculatorNUnit (Test Project)  →  Runs tests on CalculatorLibrary
```

The test projects **reference** the library project so they can use the Calculator class and test its methods.

## How Tests Work

### Step 1: Create Code to Test (CalculatorLibrary)

```csharp
public int Add(int a, int b)
{
    return a + b;
}
```

### Step 2: Write Test (CalculatorMSTest or CalculatorNUnit)

```csharp
// Test that Add(5, 3) returns 8
int result = calculator.Add(5, 3);
Assert.AreEqual(8, result);
```

### Step 3: Run Test

```bash
dotnet test
```

## MSTest vs NUnit

| Feature            | MSTest                | NUnit             |
| ------------------ | --------------------- | ----------------- |
| Test Attribute     | `[TestMethod]`        | `[Test]`          |
| Test Class         | `[TestClass]`         | `[TestFixture]`   |
| Setup              | `[TestInitialize]`    | `[SetUp]`         |
| Assert             | `Assert.AreEqual()`   | `Assert.That()`   |
| Expected Exception | `[ExpectedException]` | `Assert.Throws()` |

## Simple Test Examples

### MSTest (CalculatorMSTest)

```csharp
[TestClass]
public class CalculatorTests
{
    [TestMethod]
    public void Add_5And3_Returns8()
    {
        var calculator = new Calculator();
        int result = calculator.Add(5, 3);
        Assert.AreEqual(8, result);
    }
}
```

### NUnit (CalculatorNUnit)

```csharp
[TestFixture]
public class CalculatorTests
{
    private Calculator _calculator;

    [SetUp]
    public void Setup()
    {
        _calculator = new Calculator();
    }

    [Test]
    public void Add_5And3_Returns8()
    {
        int result = _calculator.Add(5, 3);
        Assert.That(result, Is.EqualTo(8));
    }
}
```

## How to Run Tests

```bash
# Run all tests
dotnet test

# Run only MSTest
dotnet test CalculatorMSTest

# Run only NUnit
dotnet test CalculatorNUnit
```

## What Gets Tested

1. **Positive Tests**: Normal cases

   - Add(5, 3) = 8
   - Subtract(10, 5) = 5

2. **Negative Tests**: Error cases

   - Divide(10, 0) throws exception

3. **Edge Cases**: Boundary conditions
   - Add(0, 0) = 0
   - Multiply(100, 0) = 0

## Expected Output

```
Passed!  - Failed: 0, Passed: 5, Total: 5
```

## Key Points to Explain

1. **Unit Testing** = Testing small units of code in isolation
2. **Test Framework** = Tool that helps write and run tests
3. **Assertion** = Statement that checks if result is correct
4. **Reference** = Test project references library to access the code
5. **Arrange-Act-Assert** = Standard pattern for tests

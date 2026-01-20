using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    // Only one "Items" – make it public static so AddItem can reach it
    public static List<string> Items { get; } = new() { "Pen", "Book" };

    // No need for extra properties – just expose the list
}
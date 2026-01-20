using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

public class AddItemModel : PageModel
{
    [BindProperty]
    public string? NewItem { get; set; }

    public IActionResult OnPost()
    {
        if (!string.IsNullOrWhiteSpace(NewItem))
        {
            IndexModel.Items.Add(NewItem);
        }
        return RedirectToPage("/Index");
    }
}

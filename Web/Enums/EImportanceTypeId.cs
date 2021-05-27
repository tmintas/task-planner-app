using System.ComponentModel.DataAnnotations;

namespace Web.Enums
{
    public enum EImportanceTypeId
    {
        [Display(Name = "Low")]
        Low = 1,

        [Display(Name = "Middle")]
        Middle = 2,

        [Display(Name = "High")]
        High = 3
    }
}

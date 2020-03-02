using System.ComponentModel.DataAnnotations;

namespace Domain.Enums
{
    public enum ImportanceType
    {
        [Display(Name = "Low")]
        Low = 1,

        [Display(Name = "Middle")]
        Middle = 2,

        [Display(Name = "High")]
        High = 3
    }
}

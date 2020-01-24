using System.ComponentModel.DataAnnotations;

namespace Domain.Enums
{
    public enum ImportanceType
    {
        [Display(Name = "Low")]
        Low = 0,

        [Display(Name = "Middle")]
        Middle = 1,

        [Display(Name = "High")]
        High = 2
    }
}

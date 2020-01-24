using System.ComponentModel.DataAnnotations;

namespace Domain.Models
{
    public class EntityBase
    {
        [Key]
        public virtual int Id { get; set; }
    }
}

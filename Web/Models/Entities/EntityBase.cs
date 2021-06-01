using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Web.Models.Entities
{
    public class EntityBase
    {
        [Key]
        public virtual int Id { get; set; }
    }
}

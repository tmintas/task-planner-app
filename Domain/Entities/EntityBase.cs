using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Models
{
    public class EntityBase
    {
        [Key]
        [JsonPropertyName("id")]
        public virtual int Id { get; set; }
    }
}

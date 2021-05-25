using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Web.Models.Entities
{
    public class EntityBase
    {
        [Key]
        [JsonPropertyName("id")]
        public virtual int Id { get; set; }
    }
}

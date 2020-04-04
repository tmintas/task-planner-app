using System.ComponentModel.DataAnnotations;

namespace Domain.Entities
{
    public class ImportanceType
    {
        public Enums.ImportanceType Id { get; set; }

        [MaxLength(20)]
        public string Name { get; set; }
    }
}

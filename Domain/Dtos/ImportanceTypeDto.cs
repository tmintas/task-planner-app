using Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class ImportanceTypeDto
    {
        [Key]
        public ImportanceType Id { get; set; }

        public string Name { get; set; }
    }
}

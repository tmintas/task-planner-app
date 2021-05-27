using System.ComponentModel.DataAnnotations;
using Web.Enums;

namespace Web.Entities
{
    public class ImportanceType
    {
        public EImportanceTypeId Id { get; set; }

        [MaxLength(20)]
        public string Name { get; set; }
    }
}

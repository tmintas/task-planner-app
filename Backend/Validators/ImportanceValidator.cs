using System;
using System.ComponentModel.DataAnnotations;
using Web.Enums;

namespace Web.Middleware
{
    public class ImportanceValidator : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if ((EImportanceTypeId)value == default)
            {
                ErrorMessage = "Provided importance type value should not be empty or 0";

                return false;
            }

            var isValueInEnumRange = Enum.IsDefined(typeof(EImportanceTypeId), value);
            var allowedImportanceIds = (int[]) Enum.GetValues(typeof(EImportanceTypeId));

            if (!isValueInEnumRange)
            {
                ErrorMessage = $"Provided importance type value {value} is not supported. " +
                    $"Allowed values: {string.Join(", ", allowedImportanceIds)}";

                return false;
            }

            return true;
        }
    }
}

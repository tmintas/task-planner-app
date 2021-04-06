//using System;
//using System.ComponentModel.DataAnnotations;
//using System.Linq;
//using System.Reflection;

//namespace Domain.Extensions
//{
//    public static class EnumExtensions
//    {
//        public static T GetAttribute<T>(this Enum enumValue) where T : Attribute
//        {
//            return enumValue.GetType()?
//                .GetMember(enumValue.ToString())?
//                .FirstOrDefault()?
//                .GetCustomAttribute<T>();
//        }

//        public static string GetDisplayName(this Enum enumValue)
//        {
//            return enumValue.GetAttribute<DisplayAttribute>()?.Name;
//        }
//    }
//}

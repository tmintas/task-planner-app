using System.Text.Json;

namespace Web.Models.Shared
{
    public class ErrorDetails
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }

        public string StackTrace { get; set; }

        public string Error { get; set; }


        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
namespace Web.Services.Contracts
{
    /// <summary>
    /// marker interface for app setting models that need to be validated on app start
    /// </summary>
    public interface IValidatable
    {
        void Validate();
    }
}

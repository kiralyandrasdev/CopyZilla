namespace CopyZillaBackend.Application.Contracts.Firebase
{
    public interface IFirebaseService
    {
        Task DeleteFirebaseUserAsync(string id);
    }
}

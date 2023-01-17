using Newtonsoft.Json;
namespace MySites.Extensions
{
    public static class SessionExtensions
    {
        public static void SetObject(this ISession session, object user, string key)
        {
            string jsonString = JsonConvert.SerializeObject(user);
            session.SetString(key, jsonString);
        }
        public static T GetObject<T>(this ISession session, string key) where T : class
        {
            string donenveri = session.GetString(key);
            T bsObj = JsonConvert.DeserializeObject<T>(donenveri);
            return bsObj;
        }
    }
}

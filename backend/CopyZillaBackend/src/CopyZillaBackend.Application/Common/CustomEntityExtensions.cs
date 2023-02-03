using CopyZillaBackend.Domain.Entities;

namespace CopyZillaBackend.Application.Common
{
    public static class CustomEntityExtensions
    {
        public static T CopyFrom<T>(this T target, T source) where T : BaseEntity
        {
            var sourceProperties = source.GetType().GetProperties();
            var targetProperties = target.GetType().GetProperties();

            foreach (var sourceProperty in sourceProperties)
            {
                var targetProperty = targetProperties.FirstOrDefault(e => e.Name == sourceProperty.Name);

                if (targetProperty == null || sourceProperty.GetValue(source) == null)
                    continue;

                targetProperty.SetValue(target, sourceProperty.GetValue(source));
            }

            return target;
        }
    }
}
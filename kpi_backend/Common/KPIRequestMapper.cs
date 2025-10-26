using kpi_backend.DTO;
using kpi_backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace kpi_backend.Common
{
    public static class KPIRequestMapper
    {
        public static ChartQueryParams ToChartQueryParams(this KPIRequest request, string kpiType)
        {
            var filters = request.Filters;

            return new ChartQueryParams
            {
                KPIType = kpiType,
                MetricType = request.Metric,
                StartTime = filters?.TimeRange?.Start ?? DateTime.MinValue,
                EndTime = filters?.TimeRange?.End ?? DateTime.MaxValue,
                Class = filters?.Class?.FirstOrDefault(),
                Zone = filters?.Zone?.FirstOrDefault(),
                AssetId = null, // optional override
                Vest = filters?.Vest,
                SpeedMin = filters?.Speed?.Min,
                SpeedMax = filters?.Speed?.Max,
                HeadingMin = filters?.Heading?.Min,
                HeadingMax = filters?.Heading?.Max,
                GroupByTime = request.GroupBy?.Contains("timestamp_bucket") == true ? 1 : 0,
                GroupByClass = request.GroupBy?.Contains("class") == true ? 1 : 0,
                GroupByZone = request.GroupBy?.Contains("zone") == true ? 1 : 0,
                GroupByAsset = request.GroupBy?.Contains("id") == true ? 1 : 0,
                BucketIntervalMinutes = request.BucketIntervalMinutes,
                TopN = kpiType == "RiskyAreas" ? 5 : null
            };
        }
    }

}

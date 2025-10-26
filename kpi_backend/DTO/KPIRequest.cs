using kpi_backend.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace kpi_backend.DTO
{
    public class KPIRequest
    {

        public string Name { get; set; } = "";

        [JsonPropertyName("metric")]
        public string Metric { get; set; } = "count"; // Options: count, unique_ids, rate_per_hour, avg_speed, vest_compliance

        [JsonPropertyName("filters")]
        public Filters? Filters { get; set; }

        [JsonPropertyName("group_by")]
        public List<string>? GroupBy { get; set; } // Options: timestamp_bucket, class, zone, id

        [JsonPropertyName("bucket_interval_minutes")]
        public int? BucketIntervalMinutes { get; set; }

        [JsonPropertyName("chart_type")]
        public string ChartType { get; set; } = "bar"; // Options: bar, line, area, heatmap, table
    }

    public class Filters
    {
        [JsonPropertyName("time_range")]
        public TimeRange? TimeRange { get; set; }

        [JsonPropertyName("class")]
        public List<string>? Class { get; set; }

        [JsonPropertyName("zone")]
        public List<string>? Zone { get; set; }

        [JsonPropertyName("speed")]
        public SpeedFilter? Speed { get; set; }

        [JsonPropertyName("vest")]
        public int? Vest { get; set; } // 1 = worn, 0 = not worn

        [JsonPropertyName("heading")]
        public HeadingFilter? Heading { get; set; }
    }

    public class TimeRange
    {
        [JsonPropertyName("start")]
        public DateTime Start { get; set; }

        [JsonPropertyName("end")]
        public DateTime End { get; set; }
    }

    public class SpeedFilter
    {
        [JsonPropertyName("min")]
        public double? Min { get; set; }

        [JsonPropertyName("max")]
        public double? Max { get; set; }
    }

    public class HeadingFilter
    {
        [JsonPropertyName("min")]
        public int? Min { get; set; }

        [JsonPropertyName("max")]
        public int? Max { get; set; }
    }
}

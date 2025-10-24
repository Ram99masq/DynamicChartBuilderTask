using CsvHelper.Configuration;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Eventing.Reader;

namespace kpi_backend.Models
{
    public class Detection
    {
        public string Id { get; set; }
        public string Class { get; set; }
        public float X { get; set; }
        public float Y { get; set; }
        public DateTime Timestamp { get; set; }
        public float Speed { get; set; }
        public float Heading { get; set; }
        public int Vest { get; set; }
        public string Zone { get; set; }
        public string EventType { get; set; }

        [NotMapped]
        public int Count { get; set; }

        [NotMapped]
        public string TimeBucket { get; set; }
    }


    public sealed class DetectionMap : ClassMap<Detection>
    {
        public DetectionMap()
        {
            Map(m => m.Id).Name("id");
            Map(m => m.Class).Name("class");
            Map(m => m.X).Name("x");
            Map(m => m.Y).Name("y");
            Map(m => m.Timestamp).Name("timestamp");
            Map(m => m.Speed).Name("speed");
            Map(m => m.Heading).Name("heading");
            Map(m => m.Vest).Name("vest");
            Map(m => m.Zone).Name("zone");
            Map(m => m.EventType).Name("event_type"); 
            //Map(m => m.Count).Name("Count");
            //Map(m => m.TimeBucket).Name("TimeBucket");
        }
    }

}

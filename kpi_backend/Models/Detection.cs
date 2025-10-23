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
        public bool Vest { get; set; }
        public string Zone { get; set; }
        public string EventType { get; set; }
    }

}

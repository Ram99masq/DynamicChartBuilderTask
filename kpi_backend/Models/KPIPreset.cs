using System.ComponentModel.DataAnnotations;

namespace kpi_backend.Models
{
    public class KPIPreset
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Metric { get; set; }

        [Required]
        public string Filters { get; set; } // JSON serialized

        [Required]
        public string GroupBy { get; set; } // JSON serialized

        [Required]
        [MaxLength(20)]
        public string ChartType { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

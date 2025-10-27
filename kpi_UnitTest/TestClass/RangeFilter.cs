using kpi_backend.DTO;

namespace kpi_UnitTest.TestClass
{
    internal class RangeFilter : HeadingFilter
    {
        public int Min { get; set; }
        public int Max { get; set; }
    }
}
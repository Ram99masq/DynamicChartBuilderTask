using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace kpi_UnitTest
{
    using CsvHelper;
    using global::kpi_backend.Data;
    using global::kpi_backend.DTO;
    using global::kpi_backend.Models;
    using global::kpi_backend.Services;
    using kpi_UnitTest.TestClass;
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Xunit;

    namespace kpi_backend.Tests.Services
    {
        public class DataServiceTests
        {
            private AppDbContext GetInMemoryDbContext()
            {
                var options = new DbContextOptionsBuilder<AppDbContext>()
                    .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                    .Options;

                return new AppDbContext(options);
            }

            [Fact]
            public async Task SavePresetAsync_ValidRequest_SavesToDb()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var request = new KPIRequest
                {
                    Metric = "count",
                    Filters = new Filters
                    {
                        TimeRange = new TimeRange
                        {
                            Start = DateTime.Now.AddHours(-1),
                            End = DateTime.Now
                        }
                    }
                };

                await service.SavePresetAsync(request, "TestPreset");

                var saved = context.KPIPresets.FirstOrDefaultAsync();
                Assert.NotNull(saved);
            }

            [Fact]
            public void GetPresets_ReturnsAllPresets()
            {
                var context = GetInMemoryDbContext();
                context.KPIPresets.Add(new KPIPreset { Name = "Preset1", JsonPayload = "{}", CreatedAt = DateTime.Now });
                context.SaveChanges();

                var service = new DataService(context);
                var presets = service.GetPresets();

                Assert.Single(presets);
                Assert.Equal("Preset1", presets[0].Name);
            }


            [Fact]
            public async Task ProcessCsvAsync_EmptyCsv_DoesNotThrow()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var fileMock = new Mock<IFormFile>();
                var stream = new MemoryStream(Encoding.UTF8.GetBytes(""));
                fileMock.Setup(f => f.OpenReadStream()).Returns(stream);

                await service.ProcessCsvAsync(fileMock.Object);

                Assert.Empty(context.Detections);
            }

            [Fact]
            public async Task ProcessCsvAsync_MalformedCsv_ThrowsException()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var malformedCsv = "Id,X,Y,Timestamp\nH001,12.5"; // missing columns
                var fileMock = new Mock<IFormFile>();
                var stream = new MemoryStream(Encoding.UTF8.GetBytes(malformedCsv));
                fileMock.Setup(f => f.OpenReadStream()).Returns(stream);

                await Assert.ThrowsAsync<HeaderValidationException>(() => service.ProcessCsvAsync(fileMock.Object));
            }

            [Fact]
            public async Task ComputeKPIDatatableAsync_AllFiltersApplied_GeneratesSql()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var request = new KPIRequest
                {
                    Metric = "count",
                    BucketIntervalMinutes = 10,
                    GroupBy = new List<string> { "timestamp_bucket" },
                    Filters = new Filters
                    {
                        TimeRange = new TimeRange { Start = DateTime.Now.AddHours(-1), End = DateTime.Now },
                        Class = new List<string> { "human" },
                        Zone = new List<string> { "ZoneA" },
                        Vest = 1,
                        Speed = new SpeedFilter { Min = 1, Max = 10 },
                        Heading = new RangeFilter { Min = 0, Max = 180 }
                    }
                };

                var result = await service.ComputeKPIDatatableAsync(request);
                Assert.NotNull(result);
            }

            [Fact]
            public async Task ComputeKPIDatatableAsync_InvalidMetric_ReturnsErrorRow()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var request = new KPIRequest
                {
                    Metric = "unknown_metric",
                    Filters = new Filters
                    {
                        TimeRange = new TimeRange { Start = DateTime.Now.AddHours(-1), End = DateTime.Now }
                    },
                    GroupBy = new List<string> { "timestamp_bucket" }
                };

                var result = await service.ComputeKPIDatatableAsync(request);
                Assert.Single(result);
                Assert.Equal("error", result.First().Class);
            }

            [Fact]
            public async Task ComputeKPIAsync_EmptyDatabase_ReturnsEmptyBundle()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var request = new KPIRequest
                {
                    Metric = "count",
                    Filters = new Filters
                    {
                        TimeRange = new TimeRange { Start = DateTime.Now.AddHours(-1), End = DateTime.Now }
                    },
                    GroupBy = new List<string> { "timestamp_bucket" }
                };

                var result = await service.ComputeKPIAsync(request);
                Assert.NotNull(result);
                Assert.All(new List<List<ChartDataDto>> {
                    result.CloseCalls,
                    result.Overspeeding,
                    result.VestViolations,
                    result.DwellTime,
                    result.RiskyAreas
                }, list => Assert.NotNull(list));
                Assert.NotNull(result.KPIData);
            }

            [Fact]
            public async Task SavePresetAsync_EmptyName_ThrowsException()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var request = new KPIRequest
                {
                    Metric = "count",
                    Filters = new Filters
                    {
                        TimeRange = new TimeRange { Start = DateTime.Now.AddHours(-1), End = DateTime.Now }
                    }
                };

                await Assert.ThrowsAsync<ArgumentException>(() => service.SavePresetAsync(request, ""));
            }


            [Fact]
            public void GetPresets_MultiplePresets_ReturnsAll()
            {
                var context = GetInMemoryDbContext();
                context.KPIPresets.AddRange(new[]
                {
                new KPIPreset { Name = "Preset1", JsonPayload = "{}", CreatedAt = DateTime.Now },
                new KPIPreset { Name = "Preset2", JsonPayload = "{}", CreatedAt = DateTime.Now }
            });
                context.SaveChanges();

                var service = new DataService(context);
                var presets = service.GetPresets();

                Assert.Equal(2, presets.Count);
            }

            /// Negative test case: CSV with invalid data types
            /// 



        }
    }

}

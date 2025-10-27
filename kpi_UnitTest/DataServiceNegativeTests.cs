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
    using Microsoft.AspNetCore.Http;
    using Microsoft.EntityFrameworkCore;
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Text;
    using System.Threading.Tasks;
    using Xunit;

    namespace kpi_backend.Tests.Services
    {
        public class DataServiceNegativeTests
        {
            private AppDbContext GetInMemoryDbContext()
            {
                var options = new DbContextOptionsBuilder<AppDbContext>()
                    .UseInMemoryDatabase(Guid.NewGuid().ToString())
                    .Options;

                return new AppDbContext(options);
            }

            private IFormFile CreateMockCsvFile(string content)
            {
                var fileMock = new Mock<IFormFile>();
                var stream = new MemoryStream(Encoding.UTF8.GetBytes(content));
                fileMock.Setup(f => f.OpenReadStream()).Returns(stream);
                return fileMock.Object;
            }

            [Fact]
            public async Task ProcessCsvAsync_NullFile_ThrowsArgumentNullException()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                await Assert.ThrowsAsync<ArgumentNullException>(() => service.ProcessCsvAsync(null));
            }

            [Fact]
            public async Task ProcessCsvAsync_MalformedCsv_ThrowsHeaderValidationException()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var malformedCsv = "Id,X,Y\nH001,12.5"; // Missing required columns
                var file = CreateMockCsvFile(malformedCsv);

                await Assert.ThrowsAsync<HeaderValidationException>(() => service.ProcessCsvAsync(file));
            }

            [Fact]
            public async Task ProcessCsvAsync_DuplicateId_DoesNotInsertTwice()
            {
                var context = GetInMemoryDbContext();
                context.Detections.Add(new Detection { Id = "H001", Class = "human" });
                context.SaveChanges();
                var service = new DataService(context);

                var csv = "Id,Class,X,Y,Timestamp,Speed,Heading,Vest,Zone,EventType\nH001,human,12.5,8.3,2025-10-27 08:15:00,5,90,1,ZoneA,close_call";
                var file = CreateMockCsvFile(csv);

                await service.ProcessCsvAsync(file);

                Assert.Single(context.Detections);
            }

            [Fact]
            public async Task ComputeKPIDatatableAsync_NullFilters_ReturnsErrorRow()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var request = new KPIRequest { Metric = "count", Filters = null };
                var result = await service.ComputeKPIDatatableAsync(request);

                Assert.Single(result);
                Assert.Equal("error", result[0].Class);
            }

            [Fact]
            public async Task ComputeKPIDatatableAsync_InvalidMetric_ReturnsErrorRow()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var request = new KPIRequest
                {
                    Metric = "invalid_metric",
                    Filters = new Filters
                    {
                        TimeRange = new TimeRange
                        {
                            Start = DateTime.Now.AddHours(-1),
                            End = DateTime.Now
                        }
                    },
                    GroupBy = new List<string> { "timestamp_bucket" }
                };

                var result = await service.ComputeKPIDatatableAsync(request);
                Assert.Single(result);
                Assert.Equal("error", result[0].Class);
            }

            [Fact]
            public async Task ComputeKPIAsync_NullRequest_ThrowsArgumentNullException()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                await Assert.ThrowsAsync<ArgumentNullException>(() => service.ComputeKPIAsync(null));
            }

            [Fact]
            public async Task SavePresetAsync_EmptyName_ThrowsArgumentException()
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

                await Assert.ThrowsAsync<ArgumentException>(() => service.SavePresetAsync(request, ""));
            }

            [Fact]
            public async Task SavePresetAsync_NullRequest_ThrowsArgumentNullException()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                await Assert.ThrowsAsync<ArgumentNullException>(() => service.SavePresetAsync(null, "ValidName"));
            }

            [Fact]
            public void GetPresets_EmptyDatabase_ReturnsEmptyList()
            {
                var context = GetInMemoryDbContext();
                var service = new DataService(context);

                var presets = service.GetPresets();
                Assert.Empty(presets);
            }
        }
    }

}

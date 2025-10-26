
--Stored procedure Input Parameters for 4 Chart graph except Overspeeding
--1) Working Inputs params 
EXEC sp_GetChartData
    @KPIType = 'CloseCalls',
    @MetricType = 'count',
    @StartTime = '2025-10-26 08:00',
    @EndTime = '2025-10-26 12:00',
    @Class = 'human',
    @Zone = 'ZoneA',
    @AssetId = null,
    @Vest = 0,
    @SpeedMin = 1.0,
    @SpeedMax = 5.0,
    @HeadingMin = 90,
    @HeadingMax = 270,
    @GroupByTime = 1,
    @GroupByClass = 1,
    @GroupByZone = 1,
    @GroupByAsset = 0,
    @BucketIntervalMinutes = 15
--✅ 2. Overspeeding Events by Area, Hour, Asset
EXEC sp_GetChartData
    @KPIType = 'Overspeeding',
   @MetricType = 'count',
    @StartTime = '2025-10-26 08:00',
    @EndTime = '2025-10-26 12:00',
    @Class = 'human',
    @Zone = 'ZoneA',
    @AssetId = null,
    @Vest = 0,
    @SpeedMin = 1.0,
    @SpeedMax = 5.0,
    @HeadingMin = 90,
    @HeadingMax = 270,
    @GroupByTime = 1,
    @GroupByClass = 1,
    @GroupByZone = 1,
    @GroupByAsset = 0,
    @BucketIntervalMinutes = 15
--✅ 3. Vest Violations by Class and Zone
EXEC sp_GetChartData
    @KPIType = 'VestViolations',
    @MetricType = 'count',
    @StartTime = '2025-10-26 08:00',
    @EndTime = '2025-10-26 12:00',
    @Class = 'human',
    @Zone = 'ZoneA',
    @AssetId = null,
    @Vest = 0,
    @SpeedMin = 1.0,
    @SpeedMax = 5.0,
    @HeadingMin = 90,
    @HeadingMax = 270,
    @GroupByTime = 1,
    @GroupByClass = 1,
    @GroupByZone = 1,
    @GroupByAsset = 0,
    @BucketIntervalMinutes = 15

--✅ 4. Dwell Time of a Class Inside a Zone
EXEC sp_GetChartData
    @KPIType = 'DwellTime',
   @MetricType = 'count',
    @StartTime = '2025-10-26 08:00',
    @EndTime = '2025-10-26 12:00',
    @Class = 'human',
    @Zone = 'ZoneA',
    @AssetId = null,
    @Vest = 0,
    @SpeedMin = 1.0,
    @SpeedMax = 5.0,
    @HeadingMin = 90,
    @HeadingMax = 270,
    @GroupByTime = 1,
    @GroupByClass = 1,
    @GroupByZone = 1,
    @GroupByAsset = 0,
    @BucketIntervalMinutes = 15

--✅ 5. Top N Risky Areas by Near-Miss Density
EXEC sp_GetChartData
    @KPIType = 'RiskyAreas',
   @MetricType = 'count',
    @StartTime = '2025-10-26 08:00',
    @EndTime = '2025-10-26 12:00',
    @Class = 'human',
    @Zone = 'ZoneA',
    @AssetId = null,
    @Vest = 0,
    @SpeedMin = 1.0,
    @SpeedMax = 5.0,
    @HeadingMin = 90,
    @HeadingMax = 270,
    @GroupByTime = 1,
    @GroupByClass = 1,
    @GroupByZone = 1,
    @GroupByAsset = 0,
    @BucketIntervalMinutes = 15




	-------2) Working Inputs params for  All except CloseCalls, Vest Violations by Class and Zone
	EXEC sp_GetChartData
    @KPIType = 'CloseCalls',
       @MetricType = '',
    @StartTime = '2025-10-26 08:00',
    @EndTime = '2025-10-26 12:00',
    @Class = 'vehicle',
    @Zone = 'ZoneB',
    @AssetId = 'V456',
    @Vest = 1,
    @SpeedMin = 5.1,
    @SpeedMax = 10.0,
    @HeadingMin = 0,
    @HeadingMax = 180,
    @GroupByTime = 1,
    @GroupByClass = 1,
    @GroupByZone = 1,
    @GroupByAsset = 1,
    @BucketIntervalMinutes = 30;
--✅ 2. Overspeeding Events by Area, Hour, Asset
EXEC sp_GetChartData
    @KPIType = 'Overspeeding',
      @MetricType = '',
    @StartTime = '2025-10-26 08:00',
    @EndTime = '2025-10-26 12:00',
    @Class = 'vehicle',
    @Zone = 'ZoneB',
    @AssetId = 'V456',
    @Vest = 1,
    @SpeedMin = 5.1,
    @SpeedMax = 10.0,
    @HeadingMin = 0,
    @HeadingMax = 180,
    @GroupByTime = 1,
    @GroupByClass = 1,
    @GroupByZone = 1,
    @GroupByAsset = 1,
    @BucketIntervalMinutes = 30;
--✅ 3. Vest Violations by Class and Zone
EXEC sp_GetChartData
    @KPIType = 'VestViolations',
       @MetricType = '',
    @StartTime = '2025-10-26 08:00',
    @EndTime = '2025-10-26 12:00',
    @Class = 'vehicle',
    @Zone = 'ZoneB',
    @AssetId = 'V456',
    @Vest = 1,
    @SpeedMin = 5.1,
    @SpeedMax = 10.0,
    @HeadingMin = 0,
    @HeadingMax = 180,
    @GroupByTime = 1,
    @GroupByClass = 1,
    @GroupByZone = 1,
    @GroupByAsset = 1,
    @BucketIntervalMinutes = 30;

--✅ 4. Dwell Time of a Class Inside a Zone
EXEC sp_GetChartData
    @KPIType = 'DwellTime',
     @MetricType = '',
    @StartTime = '2025-10-26 08:00',
    @EndTime = '2025-10-26 12:00',
    @Class = 'vehicle',
    @Zone = 'ZoneB',
    @AssetId = 'V456',
    @Vest = 1,
    @SpeedMin = 5.1,
    @SpeedMax = 10.0,
    @HeadingMin = 0,
    @HeadingMax = 180,
    @GroupByTime = 1,
    @GroupByClass = 1,
    @GroupByZone = 1,
    @GroupByAsset = 1,
    @BucketIntervalMinutes = 30;

--✅ 5. Top N Risky Areas by Near-Miss Density
EXEC sp_GetChartData
    @KPIType = 'RiskyAreas',
      @MetricType = '',
    @StartTime = '2025-10-26 08:00',
    @EndTime = '2025-10-26 12:00',
    @Class = 'vehicle',
    @Zone = 'ZoneB',
    @AssetId = 'V456',
    @Vest = 1,
    @SpeedMin = 5.1,
    @SpeedMax = 10.0,
    @HeadingMin = 0,
    @HeadingMax = 180,
    @GroupByTime = 1,
    @GroupByClass = 1,
    @GroupByZone = 1,
    @GroupByAsset = 1,
    @BucketIntervalMinutes = 30;
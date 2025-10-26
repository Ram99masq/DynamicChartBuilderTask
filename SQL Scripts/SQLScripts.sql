Alter PROCEDURE sp_GetChartData
    @KPIType NVARCHAR(50),             -- 'CloseCalls', 'Overspeeding', 'VestViolations', 'DwellTime', 'RiskyAreas'
    @MetricType NVARCHAR(50),          -- 'count', 'uniqueids', 'rateperhour'
    @StartTime DATETIME,
    @EndTime DATETIME,
    @Class NVARCHAR(50) = NULL,
    @Zone NVARCHAR(50) = NULL,
    @AssetId NVARCHAR(50) = NULL,
    @Vest INT = NULL,
    @SpeedMin FLOAT = NULL,
    @SpeedMax FLOAT = NULL,
    @HeadingMin FLOAT = NULL,
    @HeadingMax FLOAT = NULL,
    @GroupByTime BIT = 0,
    @GroupByClass BIT = 0,
    @GroupByZone BIT = 0,
    @GroupByAsset BIT = 0,
    @BucketIntervalMinutes INT = 5,
    @TopN INT = 5
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX) = '';
    DECLARE @groupCols NVARCHAR(MAX) = '';
    DECLARE @where NVARCHAR(MAX) = 'WHERE [Timestamp] BETWEEN @StartTime AND @EndTime';

    -- Filters
    IF @Class IS NOT NULL SET @where += ' AND [Class] = @Class';
    IF @Zone IS NOT NULL SET @where += ' AND [Zone] = @Zone';
    IF @AssetId IS NOT NULL SET @where += ' AND [Id] = @AssetId';
    IF @Vest IS NOT NULL SET @where += ' AND [Vest] = @Vest';
    IF @SpeedMin IS NOT NULL SET @where += ' AND [Speed] >= @SpeedMin';
    IF @SpeedMax IS NOT NULL SET @where += ' AND [Speed] <= @SpeedMax';
    IF @HeadingMin IS NOT NULL AND @HeadingMax IS NOT NULL SET @where += ' AND [Heading] BETWEEN @HeadingMin AND @HeadingMax';

    -- KPI-specific filters
    IF @KPIType = 'CloseCalls'
        SET @where += ' AND [EventType] = ''CloseCall'' AND [Class] IN (''human'', ''vehicle'')';
    ELSE IF @KPIType = 'Overspeeding'
        SET @where += ' AND [Speed] > 5.0';
    ELSE IF @KPIType = 'VestViolations'
        SET @where += ' AND [Vest] = 0';

    -- DwellTime KPI
    IF @KPIType = 'DwellTime'
    BEGIN
        SET @sql = '
            SELECT
                NULL AS TimeBucket,
                [Class],
                [Zone],
                NULL AS AssetId,
                NULL AS [Count],
                NULL AS RatePerHour,
                NULL AS UniqueViolators,
                MIN([Timestamp]) AS EntryTime,
                MAX([Timestamp]) AS ExitTime,
                DATEDIFF(MINUTE, MIN([Timestamp]), MAX([Timestamp])) AS DwellTimeMinutes,
                NULL AS NearMissDensity
            FROM [KPIDashboard].[dbo].[Detections]
            ' + @where + '
            GROUP BY [Class], [Zone]
            ORDER BY DwellTimeMinutes DESC';

        EXEC sp_executesql @sql,
            N'@StartTime DATETIME, @EndTime DATETIME, @Class NVARCHAR(50), @Zone NVARCHAR(50), @AssetId NVARCHAR(50), @Vest INT, @SpeedMin FLOAT, @SpeedMax FLOAT, @HeadingMin FLOAT, @HeadingMax FLOAT',
            @StartTime, @EndTime, @Class, @Zone, @AssetId, @Vest, @SpeedMin, @SpeedMax, @HeadingMin, @HeadingMax;
        RETURN;
    END

    -- RiskyAreas KPI
    IF @KPIType = 'RiskyAreas'
    BEGIN
        SET @sql = '
            SELECT TOP (@TopN)
                NULL AS TimeBucket,
                NULL AS Class,
                [Zone],
                NULL AS AssetId,
                NULL AS [Count],
                NULL AS RatePerHour,
                NULL AS UniqueViolators,
                NULL AS EntryTime,
                NULL AS ExitTime,
                NULL AS DwellTimeMinutes,
                COUNT(*) * 1.0 / NULLIF((SELECT COUNT(*) FROM [KPIDashboard].[dbo].[Detections] WHERE [Zone] = d.[Zone]), 0) AS NearMissDensity
            FROM [KPIDashboard].[dbo].[Detections] d
            WHERE [EventType] = ''NearMiss''
            GROUP BY [Zone]
            ORDER BY NearMissDensity DESC';

        EXEC sp_executesql @sql, N'@TopN INT', @TopN;
        RETURN;
    END

    -- Grouping logic
    IF @GroupByTime = 1
        SET @groupCols += 'DATEADD(MINUTE, (DATEDIFF(MINUTE, 0, [Timestamp]) / @BucketIntervalMinutes) * @BucketIntervalMinutes, 0),';
    IF @GroupByClass = 1
        SET @groupCols += '[Class],';
    IF @GroupByZone = 1
        SET @groupCols += '[Zone],';
    IF @GroupByAsset = 1
        SET @groupCols += '[Id],';

    -- Metric expression
    DECLARE @metricExpr NVARCHAR(MAX) = CASE LOWER(@MetricType)
        WHEN 'count' THEN 'CAST(COUNT(*) AS INT)'
        WHEN 'uniqueids' THEN 'CAST(COUNT(DISTINCT [Id]) AS INT)'
        WHEN 'rateperhour' THEN 'CAST(COUNT(*) / (@BucketIntervalMinutes / 60.0) AS INT)'
        ELSE '0'
    END;

    -- Final SELECT
    SET @sql = '
        SELECT
            ' + 
            CASE WHEN @GroupByTime = 1 THEN 'DATEADD(MINUTE, (DATEDIFF(MINUTE, 0, [Timestamp]) / @BucketIntervalMinutes) * @BucketIntervalMinutes, 0)' ELSE 'NULL' END + ' AS TimeBucket,
            ' + CASE WHEN @GroupByClass = 1 THEN '[Class]' ELSE 'NULL' END + ' AS Class,
            ' + CASE WHEN @GroupByZone = 1 THEN '[Zone]' ELSE 'NULL' END + ' AS Zone,
            ' + CASE WHEN @GroupByAsset = 1 THEN '[Id]' ELSE 'NULL' END + ' AS AssetId,
            ' + @metricExpr + ' AS [Count],
            NULL AS RatePerHour,
            NULL AS UniqueViolators,
            NULL AS EntryTime,
            NULL AS ExitTime,
            NULL AS DwellTimeMinutes,
            NULL AS NearMissDensity
        FROM [KPIDashboard].[dbo].[Detections]
        ' + @where + '
        GROUP BY ' + LEFT(@groupCols, LEN(@groupCols) - 1) + '
        ORDER BY ' + LEFT(@groupCols, LEN(@groupCols) - 1);

    EXEC sp_executesql @sql,
        N'@StartTime DATETIME, @EndTime DATETIME, @Class NVARCHAR(50), @Zone NVARCHAR(50), @AssetId NVARCHAR(50), @Vest INT, @SpeedMin FLOAT, @SpeedMax FLOAT, @HeadingMin FLOAT, @HeadingMax FLOAT, @BucketIntervalMinutes INT',
        @StartTime, @EndTime, @Class, @Zone, @AssetId, @Vest, @SpeedMin, @SpeedMax, @HeadingMin, @HeadingMax, @BucketIntervalMinutes;
END


--Scripts to execute the Stored procedure by different chart and 
----✅ 1. Human–Vehicle Close Calls
--EXEC sp_GetChartData
--    @KPIType = 'CloseCalls',
--    @MetricType = 'count',
--    @StartTime = '2025-10-26 08:00',
--    @EndTime = '2025-10-26 12:00',
--    @Class = 'human',
--    @Zone = 'ZoneA',
--    @AssetId = null,
--    @Vest = 0,
--    @SpeedMin = 1.0,
--    @SpeedMax = 5.0,
--    @HeadingMin = 90,
--    @HeadingMax = 270,
--    @GroupByTime = 1,
--    @GroupByClass = 1,
--    @GroupByZone = 1,
--    @GroupByAsset = 1,
--    @BucketIntervalMinutes = 15
----✅ 2. Overspeeding Events by Area, Hour, Asset
--EXEC sp_GetChartData
--    @KPIType = 'Overspeeding',
--    @MetricType = '',
--    @StartTime = '2025-10-26 08:00',
--    @EndTime = '2025-10-26 12:00',
--    @Class = 'vehicle',
--    @Zone = 'ZoneB',
--    @AssetId = 'V456',
--    @Vest = 1,
--    @SpeedMin = 5.1,
--    @SpeedMax = 10.0,
--    @HeadingMin = 0,
--    @HeadingMax = 180,
--    @GroupByTime = 1,
--    @GroupByClass = 1,
--    @GroupByZone = 1,
--    @GroupByAsset = 1,
--    @BucketIntervalMinutes = 30;

----✅ 3. Vest Violations by Class and Zone
--EXEC sp_GetChartData
--    @KPIType = 'VestViolations',
--    @MetricType = 'uniqueids',
--    @StartTime = '2025-10-26 08:00',
--    @EndTime = '2025-10-26 12:00',
--    @Class = 'human',
--    @Zone = 'ZoneC',
--    @AssetId = 'H789',
--    @Vest = 0,
--    @SpeedMin = 0.5,
--    @SpeedMax = 3.0,
--    @HeadingMin = 45,
--    @HeadingMax = 135,
--    @GroupByTime = 1,
--    @GroupByClass = 1,
--    @GroupByZone = 1,
--    @GroupByAsset = 1,
--    @BucketIntervalMinutes = 60;

----✅ 4. Dwell Time of a Class Inside a Zone
--EXEC sp_GetChartData
--    @KPIType = 'DwellTime',
--    @MetricType = 'count', -- Not used
--    @StartTime = '2025-10-26 08:00',
--    @EndTime = '2025-10-26 12:00',
--    @Class = 'human',
--    @Zone = 'ZoneA',
--    @AssetId = 'H001',
--    @Vest = 1,
--    @SpeedMin = 0.0,
--    @SpeedMax = 2.0,
--    @HeadingMin = 0,
--    @HeadingMax = 360;

----✅ 5. Top N Risky Areas by Near-Miss Density
--EXEC sp_GetChartData
--    @KPIType = 'RiskyAreas',
--    @MetricType = 'count', -- Not used
--    @StartTime = '2025-10-26 08:00',
--    @EndTime = '2025-10-26 12:00',
--    @Class = 'human',
--    @Zone = 'ZoneD',
--    @AssetId = 'H999',
--    @Vest = 0,
--    @SpeedMin = 0.0,
--    @SpeedMax = 4.0,
--    @HeadingMin = 90,
--    @HeadingMax = 270,
--    @TopN = 5;
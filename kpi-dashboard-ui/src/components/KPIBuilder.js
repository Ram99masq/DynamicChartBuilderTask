import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MetricPicker from "./MetricPicker";
import FilterPanel from "./FilterPanel";
import GroupBySelector from "./GroupBySelector";
import ChartTypeSelector from "./ChartTypeSelector";
import DwellTimeChart from "./charts/DwellTimeChart";
import RiskyAreaChart from "./charts/RiskyAreaChart";
import { computeKPI } from "./api";
import SavePresetPanel from "./SavePresetPanel";
import EventDataTable from "./EventDataTable";
import VestViolation from "./charts/VestViolations";
import OverspeedingChart from "./charts/OverSpeedingChart";
import CloseCallChart from "./charts/CloseCallChart";

function KPIBuilder() {
  const [name, setName] = useState("Custom KPI");
  const [metric, setMetric] = useState("count");
  const [filters, setFilters] = useState({
    time_range: {
      start: "2023-10-01T08:00:00",
      end: "2023-10-01T09:00:00"
    },
    class: [],
    zone: [],
    vest: 0,
    speed: { min: null, max: null },
    heading: { min: null, max: null }
  });
  const [groupBy, setGroupBy] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [data, setData] = useState([]);
  const [bucketIntervalMinutes, setBucketIntervalMinutes] = useState(15);

  const handleGenerate = async () => {
    const payload = {
      name,
      metric,
      filters,
      group_by: groupBy,
      bucket_interval_minutes: bucketIntervalMinutes,
      chart_type: chartType
    };

    try {
      console.log("payload:", JSON.stringify(payload));
      const result = await computeKPI(payload);
      setData(result);
      console.log("result:", result);
    } catch (err) {
      console.error("KPI API error:", err);
    }
  };

  const renderCharts = () => {
    if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
     return <Typography>No data available.</Typography>;
    }


    return (
      <>
        <CloseCallChart data={data} chartType={chartType} />
        <OverspeedingChart data={data} chartType={chartType} />
        <DwellTimeChart data={data} chartType={chartType} />
        <RiskyAreaChart data={data} chartType={chartType} />
        <VestViolation data={data} chartType={chartType} />
      </>
    );
  };

  return (
    <Box sx={{ mt: 4 }}>
      <MetricPicker metric={metric} setMetric={setMetric} />
      <FilterPanel filters={filters} setFilters={setFilters} />
      <GroupBySelector groupBy={groupBy} setGroupBy={setGroupBy} />
      <ChartTypeSelector chartType={chartType} setChartType={setChartType} />
      <Button variant="contained" onClick={handleGenerate}>
        Generate KPI
      </Button>

      <Box sx={{ mt: 4 }}>
        <EventDataTable data={data} />
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">KPI Visualization</Typography>
        {renderCharts()}
      </Box>

      <SavePresetPanel
        currentPayload={{
          name,
          metric,
          filters,
          group_by: groupBy,
          bucket_interval_minutes: bucketIntervalMinutes,
          chart_type: chartType
        }}
      />
    </Box>
  );
}

export default KPIBuilder;

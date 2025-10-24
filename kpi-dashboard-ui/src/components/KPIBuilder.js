import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import MetricPicker from "./MetricPicker";
import FilterPanel from "./FilterPanel";
import GroupBySelector from "./GroupBySelector";
import ChartTypeSelector from "./ChartTypeSelector";
import TimeSeriesChart from "./charts/TimeSeriesChart";
import BarChartByClass from "./charts/BarChartByClass";
import ScatterSpeedHeading from "./charts/ScatterSpeedHeading";
import { computeKPI } from "./api"; 
import SavePresetPanel from "./SavePresetPanel";

const KPIBuilder = () => {

  const [name, setName] = useState("Custom KPI");
  const [metric, setMetric] = useState("count");
  const [filters, setFilters] = useState({
    time_range: {
      start: "2023-10-01T08:00:00",
      end: "2023-10-01T09:00:00"
    },
    class: [],
    zone: [],
    vest: null,
    speed: { min: null, max: null },
    heading: { min: null, max: null }
  });
  const [groupBy, setGroupBy] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [data, setData] = useState([]);
  const [bucketIntervalMinutes, setBucketIntervalMinutes] = useState(5);

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
      console.log(payload);
      //const jsonString = JSON.stringify(payload, null, 2);
      //console.log(jsonString);
      const result = await computeKPI(payload);
      setData(result);
    } catch (err) {
      console.error("KPI API error:", err);
    }
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
        <Typography variant="h6">KPI Visualization</Typography>
        {chartType === "line" && <TimeSeriesChart data={data} />}
        {chartType === "bar" && <BarChartByClass data={data} />}
        {chartType === "scatter" && <ScatterSpeedHeading data={data} />}
      </Box>

   <SavePresetPanel currentPayload={{
      name,
      metric,
      filters,
      group_by: groupBy,
      bucket_interval_minutes: bucketIntervalMinutes,
      chart_type: chartType }} />

    </Box>
    
  );
};

export default KPIBuilder;

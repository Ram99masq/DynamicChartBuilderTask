import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  Stack
} from "@mui/material";
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
import UploadCSV from "./UploadCSV";

function KPIBuilder() {
  const [name, setName] = useState("Custom KPI");
  const [metric, setMetric] = useState("count");
  const [filters, setFilters] = useState({
    time_range: {
      start: "2025-01-01T08:00:00",
      end: "2026-10-01T09:00:00"
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <CloseCallChart data={data} chartType={chartType} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <OverspeedingChart data={data} chartType={chartType} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <DwellTimeChart data={data} chartType={chartType} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <RiskyAreaChart data={data} chartType={chartType} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <VestViolation data={data} chartType={chartType} />
          </Paper>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        KPI Dashboard
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Divider sx={{ mb: 2 }} />
        <Stack spacing={2}>
            <UploadCSV />
              <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Generate KPI Dashboard
      </Typography>
          <MetricPicker metric={metric} setMetric={setMetric} />
          <FilterPanel filters={filters} setFilters={setFilters} />
          <GroupBySelector groupBy={groupBy} setGroupBy={setGroupBy} />
          <ChartTypeSelector chartType={chartType} setChartType={setChartType} />
          <Button variant="contained" onClick={handleGenerate}>
            Generate KPI
          </Button>
        </Stack>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <EventDataTable data={data} />
      </Paper>

      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          KPI Visualization
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {renderCharts()}
      </Paper>

      <Paper elevation={2} sx={{ p: 3 }}>
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
      </Paper>
    </Box>
  );
}

export default KPIBuilder;

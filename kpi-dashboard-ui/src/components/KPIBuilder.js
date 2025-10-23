import React, { useState } from "react";
import {
  Box, Button, Select, MenuItem, FormControl, InputLabel, Typography
} from "@mui/material";
import axios from "axios";
import ChartView from "./ChartView";

const KPIBuilder = () => {
  const [metric, setMetric] = useState("count");
  const [eventType, setEventType] = useState("close_call");
  const [groupBy, setGroupBy] = useState(["zone"]);
  const [chartType, setChartType] = useState("bar");
  const [data, setData] = useState([]);

  const fetchKPI = async () => {
    const payload = {
      metric,
      filters: { eventType },
      groupBy,
      chartType,
    };
    const res = await axios.post("/api/kpi/compute", payload);
    setData(res.data);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">KPI Builder</Typography>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Metric</InputLabel>
        <Select value={metric} onChange={(e) => setMetric(e.target.value)}>
          <MenuItem value="count">Count</MenuItem>
          <MenuItem value="unique_ids">Unique IDs</MenuItem>
          <MenuItem value="rate_per_hour">Rate per Hour</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Event Type</InputLabel>
        <Select value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <MenuItem value="close_call">Close Call</MenuItem>
          <MenuItem value="overspeed">Overspeed</MenuItem>
          <MenuItem value="vest_violation">Vest Violation</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Chart Type</InputLabel>
        <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
          <MenuItem value="bar">Bar</MenuItem>
          <MenuItem value="line">Line</MenuItem>
          <MenuItem value="area">Area</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={fetchKPI} sx={{ mt: 2 }}>
        Generate KPI
      </Button>

      <ChartView chartType={chartType} data={data} />
    </Box>
  );
};

export default KPIBuilder;

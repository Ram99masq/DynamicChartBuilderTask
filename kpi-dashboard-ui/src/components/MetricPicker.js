import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const MetricPicker = ({ metric, setMetric }) => (
  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel>Metric</InputLabel>
    <Select value={metric} onChange={(e) => setMetric(e.target.value)}>
      <MenuItem value="count">Count of Events</MenuItem>
      <MenuItem value="unique_ids">Unique IDs</MenuItem>
      <MenuItem value="rate_per_hour">Rate per Hour</MenuItem>
    </Select>
  </FormControl>
);

export default MetricPicker;
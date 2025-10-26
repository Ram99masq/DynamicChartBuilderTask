import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ChartTypeSelector = ({ chartType, setChartType }) => (
  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel>Chart Type</InputLabel>
    <Select value={chartType} onChange={(e) => setChartType(e.target.value)}>
      <MenuItem value="bar">Bar</MenuItem>
      <MenuItem value="line">Line</MenuItem>
      <MenuItem value="area">Area</MenuItem>
    </Select>
  </FormControl>
);

export default ChartTypeSelector;
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const GroupBySelector = ({ groupBy, setGroupBy }) => (
  <FormControl fullWidth sx={{ mb: 2 }}>
    <InputLabel>Group By</InputLabel>
    <Select
      multiple
      value={groupBy}
      onChange={(e) => setGroupBy(e.target.value)}
    >
      <MenuItem value="time_bucket">Time Bucket</MenuItem>
      <MenuItem value="class">Class</MenuItem>
      <MenuItem value="zone">Zone</MenuItem>
      <MenuItem value="id">Asset ID</MenuItem>
    </Select>
  </FormControl>
);

export default GroupBySelector;
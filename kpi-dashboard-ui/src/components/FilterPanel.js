import {
  Box, TextField, Checkbox, FormControlLabel, Slider, Typography
} from "@mui/material";

const FilterPanel = ({ filters, setFilters }) => (
  <Box sx={{ mb: 2 }}>
    <TextField
      label="Time Range Start"
      type="datetime-local"
      value={filters.startTime || ""}
      onChange={(e) => setFilters({ ...filters, startTime: e.target.value })}
      fullWidth sx={{ mb: 2 }}
    />
    <TextField
      label="Time Range End"
      type="datetime-local"
      value={filters.endTime || ""}
      onChange={(e) => setFilters({ ...filters, endTime: e.target.value })}
      fullWidth sx={{ mb: 2 }}
    />
    <TextField
      label="Class (comma-separated)"
      value={filters.class || ""}
      onChange={(e) => setFilters({ ...filters, class: e.target.value })}
      fullWidth sx={{ mb: 2 }}
    />
    <TextField
      label="Zones"
      value={filters.zone || ""}
      onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
      fullWidth sx={{ mb: 2 }}
    />
    <Typography gutterBottom>Speed Threshold</Typography>
    <Slider
      value={filters.speed || 0}
      onChange={(e, val) => setFilters({ ...filters, speed: val })}
      min={0}
      max={10}
      step={0.1}
      valueLabelDisplay="auto"
    />
    <Typography gutterBottom>Heading Range</Typography>
    <Slider
      value={filters.heading || [0, 360]}
      onChange={(e, val) => setFilters({ ...filters, heading: val })}
      min={0}
      max={360}
      step={1}
      valueLabelDisplay="auto"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={filters.vest === true}
          onChange={(e) => setFilters({ ...filters, vest: e.target.checked })}
        />
      }
      label="Vest Worn"
    />
  </Box>
);

export default FilterPanel;

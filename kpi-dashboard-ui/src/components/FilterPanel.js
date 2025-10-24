import {
  Box, TextField, Checkbox, FormControlLabel, Slider, Typography
} from "@mui/material";

const FilterPanel = ({ filters, setFilters }) => (
  <Box sx={{ mb: 2 }}>
    <TextField
  label="Time Range Start"
  type="datetime-local"
  value={filters.time_range?.start || ""}
  onChange={(e) =>
    setFilters({
      ...filters,
      time_range: {
        ...filters.time_range,
        start: e.target.value
      }
    })
  }
  fullWidth sx={{ mb: 2 }} />
   <TextField
  label="Time Range End"
  type="datetime-local"
  value={filters.time_range?.end || ""}
  onChange={(e) =>
    setFilters({
      ...filters,
      time_range: {
        ...filters.time_range,
        end: e.target.value
      }
    })
  }
  fullWidth sx={{ mb: 2 }} />
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
       value={filters.speed ? [filters.speed.min || 0, filters.speed.max || 10] : [0, 10]}
        onChange={(e, val) =>
            setFilters({
            ...filters,
            speed: { min: val[0], max: val[1] }
            })
        }
      min={0}
      max={10}
      step={0.1}
      valueLabelDisplay="auto"
    />
    <Typography gutterBottom>Heading Range (°)</Typography>
    <Slider
    value={filters.heading ? [filters.heading.min || 0, filters.heading.max || 360] : [0, 360]}
    onChange={(e, val) =>
        setFilters({
        ...filters,
        heading: { min: val[0], max: val[1] }
        })
    }
    min={0}
    max={360}
    step={1}
    valueLabelDisplay="auto"
    />

   <FormControlLabel
    label="Vest Worn"
    control={
        <Checkbox
        checked={filters.vest === 1}
        onChange={(e) =>
            setFilters({
            ...filters,
            vest: e.target.checked ? 1 : 0
            })
        }
        />
    }
    />
  </Box>
);

export default FilterPanel;

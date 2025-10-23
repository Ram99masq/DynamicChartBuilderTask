import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";

const PresetManager = ({ currentKPI, onApplyPreset }) => {
  const [presets, setPresets] = useState([]);
  const [presetName, setPresetName] = useState("");

  // Load presets on mount
  useEffect(() => {
    fetchPresets();
  }, []);

  const fetchPresets = async () => {
    try {
      const res = await axios.get("/api/kpi/presets");
      setPresets(res.data);
    } catch (err) {
      console.error("Failed to load presets", err);
    }
  };

  const savePreset = async () => {
    if (!currentKPI) {
      alert("No KPI configuration to save.");
      return;
    }

    try {
      const payload = {
        ...currentKPI,
        name: presetName || "Unnamed Preset",
      };
      await axios.post("/api/kpi/presets", payload);
      setPresetName("");
      fetchPresets();
      alert("Preset saved!");
    } catch (err) {
      console.error("Failed to save preset", err);
    }
  };

  const applyPreset = (preset) => {
    try {
      const parsedFilters = JSON.parse(preset.filters);
      const parsedGroupBy = JSON.parse(preset.groupBy);
      const applied = {
        metric: preset.metric,
        filters: parsedFilters,
        groupBy: parsedGroupBy,
        chartType: preset.chartType,
      };
      onApplyPreset(applied);
    } catch (err) {
      console.error("Failed to apply preset", err);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Preset Manager
      </Typography>

      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        <TextField
          label="Preset Name"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={savePreset} disabled={!currentKPI}>
          Save Current KPI Preset
        </Button>
      </Paper>

      <Typography variant="subtitle1" gutterBottom>
        Saved Presets
      </Typography>

      <List>
        {presets.map((preset) => (
          <React.Fragment key={preset.id}>
            <ListItem
              button
              onClick={() => applyPreset(preset)}
              sx={{ borderRadius: 1 }}
            >
              <ListItemText
                primary={preset.name || `Preset ${preset.id}`}
                secondary={`Metric: ${preset.metric}, Chart: ${preset.chartType}`}
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default PresetManager;

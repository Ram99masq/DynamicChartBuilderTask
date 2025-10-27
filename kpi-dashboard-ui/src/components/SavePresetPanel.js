import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Paper,
  Divider,
  Stack
} from "@mui/material";
import { savePreset } from "./api";

const SavePresetPanel = ({ currentPayload }) => {
  const [presetName, setPresetName] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info"
  });

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSavePreset = async () => {
    if (!presetName.trim()) {
      showSnackbar("Please enter a preset name.", "warning");
      return;
    }

    try {
      const response = await savePreset(currentPayload, presetName);
      console.log("Preset saved:", response.data);
      showSnackbar(`Preset "${presetName}" saved successfully.`, "success");
      setPresetName("");
    } catch (error) {
      console.error("Error saving preset:", error);
      showSnackbar("Failed to save preset.", "error");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h6" gutterBottom>
        Save KPI Preset
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Stack spacing={2}>
        <TextField
          label="Preset Name"
          value={presetName}
          onChange={(e) => setPresetName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleSavePreset}>
          Save Preset
        </Button>
      </Stack>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SavePresetPanel;

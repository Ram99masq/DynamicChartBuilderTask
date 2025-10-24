import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { savePreset } from "./api";

const SavePresetPanel = ({ currentPayload }) => {
  const [presetName, setPresetName] = useState("");
   
  const handleSavePreset = async () => {
    const jsonString = JSON.stringify(currentPayload, null, 2);
      console.log(jsonString);
      console.log(currentPayload);
   
    if (!presetName) {
      alert("Please enter a preset name.");
      return;
    }

    // const payloadToSave = {
    //   ...currentPayload,
    //   name: presetName
    // };

    try {
      const response = await savePreset(currentPayload,presetName);
      console.log("Preset saved:", response.data);
      setPresetName("");
      alert(`Preset "${presetName}" saved successfully.`);
    } catch (error) {
      console.error("Error saving preset:", error);
      alert("Failed to save preset.");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Save KPI Preset</Typography>
      <TextField
        label="Preset Name"
        value={presetName}
        onChange={(e) => setPresetName(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSavePreset}>
        Save Preset
      </Button>
    </Box>
  );
};

export default SavePresetPanel;

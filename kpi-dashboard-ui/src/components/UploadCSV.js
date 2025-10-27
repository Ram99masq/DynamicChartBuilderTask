import React, { useRef, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Paper,
  Divider,
  Stack
} from "@mui/material";
import { uploadCSV } from "./api";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info"
  });
  const fileInputRef = useRef();

  const showSnackbar = (message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleReset = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) {
      showSnackbar("Please select a CSV file first.", "warning");
      return;
    }
    try {
      const result = await uploadCSV(file);
      showSnackbar(result.message || "Upload successful", "success");
      handleReset();
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Upload failed";
      showSnackbar(errorMsg, "error");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Upload Detection CSV
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={2}>
        <input
          type="file"
          ref={fileInputRef}
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginTop: "4px" }}
        />
        <Button variant="contained" onClick={handleUpload}>
          Upload CSV
        </Button>
      </Stack>
   
    </Paper>
  );
};

export default UploadCSV;

import React, { useRef,useState } from "react";
import { Button, Box, Typography , Snackbar, Alert } from "@mui/material";
import { uploadCSV } from "./api";

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
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
      err.response?.data?.error || err.response?.data?.message || err.message || "Upload failed";
    showSnackbar(errorMsg, "error");
  }
};

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">Upload Detection CSV</Typography>
      <input
        type="file"
         ref={fileInputRef}
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginTop: "8px" }}
      />
      <Button variant="contained" onClick={handleUpload} sx={{ mt: 2 }}>
        Upload
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UploadCSV;

import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import axios from "axios";
import api from "./api";

const UploadCSV = () => {
  const [file, setFile] = useState(null);

  const upload = async () => {
     const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await api.post("/upload", formData);
    return res.data;
  } catch (err) {
    const message = err.response?.data?.error || "Upload failed";
    throw new Error(message);
    }
  };

  const handleUpload = async (file) => {
  try {
    const result = await upload(file);
    alert(result.message);
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
};

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">Upload Detection CSV</Typography>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button variant="contained" onClick={handleUpload} sx={{ mt: 1 }}>
        Upload
      </Button>
    </Box>
  );
};

export default UploadCSV;

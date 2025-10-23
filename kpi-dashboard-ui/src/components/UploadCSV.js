import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import axios from "axios";
import api from "./api";

const UploadCSV = () => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    await api.post("/upload", formData);

    alert("CSV uploaded successfully");
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6">Upload Detection CSV</Typography>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <Button variant="contained" onClick={upload} sx={{ mt: 1 }}>
        Upload
      </Button>
    </Box>
  );
};

export default UploadCSV;

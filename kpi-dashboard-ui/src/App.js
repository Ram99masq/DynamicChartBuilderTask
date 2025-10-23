import React from "react";
import { Container, Typography } from "@mui/material";
import UploadCSV from "./components/UploadCSV";
import KPIBuilder  from "./components/KPIBuilder";

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Industrial KPI Dashboard
      </Typography>
      <UploadCSV />
      <KPIBuilder />
    </Container>
  );
}

export default App;
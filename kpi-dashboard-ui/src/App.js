import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import UploadCSV from "./components/UploadCSV";
import PresetManager from "./components/PresetManager";
import KPIBuilder from "./components/KPIBuilder";

function App() {
  const [currentKPI, setCurrentKPI] = useState(null);
  const [kpiData, setKpiData] = useState([]);

  const fetchKPI = async (kpiConfig) => {
    setCurrentKPI(kpiConfig);
    const res = await fetch("/api/kpi/compute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kpiConfig),
    });
    const data = await res.json();
    setKpiData(data);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Industrial KPI Dashboard
      </Typography>
      <UploadCSV />
      <KPIBuilder onGenerate={fetchKPI} kpiData={kpiData} />
      <PresetManager currentKPI={currentKPI} onApplyPreset={fetchKPI} />
    </Container>
  );
}

export default App;

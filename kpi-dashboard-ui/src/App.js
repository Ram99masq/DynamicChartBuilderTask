import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import KPIBuilder from "./components/KPIBuilder";
import api from "./components/api";
import HomePage from "./components/HomePage";

function App() {
  const [currentKPI, setCurrentKPI] = useState(null);
  const [kpiData, setKpiData] = useState([]);

  const fetchKPI = async (kpiConfig) => {
    setCurrentKPI(kpiConfig);
    const res = await api.post("/compute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kpiConfig),
    });
    const data = await res.json();
    setKpiData(data);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <HomePage onGenerate={fetchKPI} kpiData={kpiData}/>
    </Container>
  );
}

export default App;

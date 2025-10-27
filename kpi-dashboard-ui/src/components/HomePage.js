import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
  Divider
} from "@mui/material";
import KPIBuilder from "./KPIBuilder";

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Navigation Bar */}
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Senticsgmbh Industrial KPI Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Welcome to Your KPI Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
            Upload detection data, configure filters, and visualize key performance indicators across zones, classes, and time.
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <KPIBuilder />
        </Paper>
      </Container>
    </Box>
  );
}

export default HomePage;

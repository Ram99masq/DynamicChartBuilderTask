import React, { useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import {
  Paper,
  Typography,
  Divider,
  Box,
  Stack,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  Tooltip as MuiTooltip
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DownloadIcon from "@mui/icons-material/Download";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function RiskyAreaChart({ data }) {
  const chartRef = useRef();
  const [selectedZone, setSelectedZone] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const [chartType, setChartType] = useState("bar");

  const riskyAreas = Array.isArray(data?.riskyAreas) ? data.riskyAreas : [];

  const zones = useMemo(() => [...new Set(riskyAreas.map(d => d.zone ?? "Unknown"))], [riskyAreas]);
  const classes = useMemo(() => [...new Set(riskyAreas.map(d => d.class ?? "Default"))], [riskyAreas]);

  const filteredZones = selectedZone === "All" ? zones : [selectedZone];
  const filteredClasses = selectedClass === "All" ? classes : [selectedClass];

  const datasets = filteredClasses.map(cls => {
    const classData = filteredZones.map(zone => {
      const match = riskyAreas.find(d => d.zone === zone && (d.class ?? "Default") === cls);
      return match?.nearMissDensity ?? 0;
    });

    const colors = {
      human: { bg: "rgba(54, 162, 235, 0.6)", border: "rgba(54, 162, 235, 1)" },
      vehicle: { bg: "rgba(255, 99, 132, 0.6)", border: "rgba(255, 99, 132, 1)" },
      other: { bg: "rgba(255, 206, 86, 0.6)", border: "rgba(255, 206, 86, 1)" }
    };

    const color = colors[cls] || colors.other;

    return {
      label: cls,
      data: classData,
      backgroundColor: color.bg,
      borderColor: color.border,
      borderWidth: 1,
      fill: chartType === "line" ? false : true,
      tension: 0.3
    };
  });

  const chartData = {
    labels: filteredZones,
    datasets
  };

  const options = {
    responsive: true,
    animation: {
      duration: 600,
      easing: "easeOutCubic"
    },
    plugins: {
      legend: {
        position: "top",
        labels: { boxWidth: 12, font: { size: 12 } }
      },
      tooltip: {
        callbacks: {
          label: context => {
            return `${context.dataset.label}: ${context.raw} near misses in ${context.label}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: chartType === "bar",
        title: {
          display: true,
          text: "Zone",
          font: { size: 12 }
        }
      },
      y: {
        stacked: chartType === "bar",
        beginAtZero: true,
        title: {
          display: true,
          text: "Near Miss Density",
          font: { size: 12 }
        }
      }
    }
  };

  const handleExport = () => {
    const chart = chartRef.current;
    if (chart) {
      const link = document.createElement("a");
      link.href = chart.toBase64Image();
      link.download = `risky_area_chart_${chartType}.png`;
      link.click();
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Risky Area Chart
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              startAdornment={<FilterAltIcon fontSize="small" sx={{ mr: 1 }} />}
            >
              <MenuItem value="All">All Zones</MenuItem>
              {zones.map((zone) => (
                <MenuItem key={zone} value={zone}>
                  {zone}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              startAdornment={<FilterAltIcon fontSize="small" sx={{ mr: 1 }} />}
            >
              <MenuItem value="All">All Classes</MenuItem>
              {classes.map((cls) => (
                <MenuItem key={cls} value={cls}>
                  {cls}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <MuiTooltip title="Toggle chart type">
            <IconButton onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}>
              {chartType === "bar" ? <ShowChartIcon /> : <BarChartIcon />}
            </IconButton>
          </MuiTooltip>

          <MuiTooltip title="Export chart as PNG">
            <IconButton onClick={handleExport}>
              <DownloadIcon />
            </IconButton>
          </MuiTooltip>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ height: { xs: 260, md: 340 } }}>
        {chartType === "bar" ? (
          <Bar ref={chartRef} data={chartData} options={options} />
        ) : (
          <Line ref={chartRef} data={chartData} options={options} />
        )}
      </Box>
    </Paper>
  );
}

export default RiskyAreaChart;

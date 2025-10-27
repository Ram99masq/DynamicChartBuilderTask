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

function DwellTimeStackedChart({ data }) {
  const chartRef = useRef();
  const [selectedZone, setSelectedZone] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const [chartType, setChartType] = useState("bar");

  const dwellTime = Array.isArray(data?.dwellTime) ? data.dwellTime : [];

  const zones = useMemo(() => [...new Set(dwellTime.map(d => d.zone ?? "Unknown"))], [dwellTime]);
  const classes = useMemo(() => [...new Set(dwellTime.map(d => d.class ?? "Unknown"))], [dwellTime]);

  const filteredZones = selectedZone === "All" ? zones : [selectedZone];
  const filteredClasses = selectedClass === "All" ? classes : [selectedClass];

  const datasets = filteredClasses.map(cls => {
    const classData = filteredZones.map(zone => {
      const match = dwellTime.find(d => d.zone === zone && d.class === cls);
      return match?.dwellTimeMinutes ?? 0;
    });

    const colors = {
      human: { bg: "rgba(54, 162, 235, 0.6)", border: "rgba(54, 162, 235, 1)" },
      vehicle: { bg: "rgba(255, 99, 132, 0.6)", border: "rgba(255, 99, 132, 1)" },
      other: { bg: "rgba(153, 102, 255, 0.6)", border: "rgba(153, 102, 255, 1)" }
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
            const entry = dwellTime.find(
              d => d.zone === context.label && d.class === context.dataset.label
            );
            const entryTime = entry?.entryTime?.slice(11, 16) ?? "N/A";
            const exitTime = entry?.exitTime?.slice(11, 16) ?? "N/A";
            return `${context.dataset.label}: ${context.raw} min (from ${entryTime} to ${exitTime})`;
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
          text: "Dwell Time (minutes)",
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
      link.download = `dwell_time_chart_${chartType}.png`;
      link.click();
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Dwell Time Chart
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 120 }}>
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

          <FormControl size="small" sx={{ minWidth: 120 }}>
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

export default DwellTimeStackedChart;

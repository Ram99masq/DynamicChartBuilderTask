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

function OverspeedingChart({ data }) {
  const chartRef = useRef();
  const [selectedZone, setSelectedZone] = useState("All");
  const [chartType, setChartType] = useState("bar");

  const safeData = Array.isArray(data.overspeeding) ? data.overspeeding : [];

  const labels = useMemo(() => {
    return [...new Set(
      safeData.map(d =>
        new Date(d.timeBucket).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      )
    )];
  }, [safeData]);

  const zones = useMemo(() => [...new Set(safeData.map(d => d.zone ?? "Unknown"))], [safeData]);
  const filteredZones = selectedZone === "All" ? zones : [selectedZone];

  const datasets = filteredZones.map(zone => {
    const zoneData = labels.map(label => {
      const match = safeData.find(
        d =>
          new Date(d.timeBucket).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) === label &&
          d.zone === zone
      );
      return match?.count ?? 0;
    });

    const color = `rgba(${Math.floor(Math.random() * 160)}, ${Math.floor(Math.random() * 160)}, ${Math.floor(Math.random() * 160)}, 0.7)`;

    return {
      label: zone,
      data: zoneData,
      backgroundColor: color,
      borderColor: "rgba(0,0,0,0.1)",
      borderWidth: 1,
      fill: chartType === "line" ? false : true,
      tension: 0.3
    };
  });

  const chartData = {
    labels,
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
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            const zone = context.dataset.label;
            const value = context.raw ?? 0;
            const time = context.label;
            return `${zone} • ${value} overspeed events at ${time}`;
          }
        }
      }
    },
    scales: {
      x: {
        stacked: chartType === "bar",
        title: {
          display: true,
          text: "Time Bucket",
          font: { size: 12 }
        }
      },
      y: {
        stacked: chartType === "bar",
        beginAtZero: true,
        title: {
          display: true,
          text: "Overspeed Count",
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
      link.download = `overspeeding_chart_${chartType}.png`;
      link.click();
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Overspeeding Chart
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

export default OverspeedingChart;

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function RiskyAreaChart({ data }) {
  const riskyAreas = Array.isArray(data?.riskyAreas) ? data.riskyAreas : [];

  // Extract unique zones and classes (if present)
  const zones = [...new Set(riskyAreas.map(d => d.zone ?? "Unknown"))];
  const classes = [...new Set(riskyAreas.map(d => d.class ?? "Default"))];

  // Build datasets per class
  const datasets = classes.map(cls => {
    const classData = zones.map(zone => {
      const match = riskyAreas.find(d => d.zone === zone && (d.class ?? "Default") === cls);
      return match?.nearMissDensity ?? 0;
    });

    return {
      label: cls,
      data: classData,
      backgroundColor:
        cls === "human"
          ? "rgba(54, 162, 235, 0.6)"
          : cls === "vehicle"
          ? "rgba(255, 99, 132, 0.6)"
          : "rgba(255, 206, 86, 0.6)",
      borderColor:
        cls === "human"
          ? "rgba(54, 162, 235, 1)"
          : cls === "vehicle"
          ? "rgba(255, 99, 132, 1)"
          : "rgba(255, 206, 86, 1)",
      borderWidth: 1
    };
  });

  const chartData = {
    labels: zones,
    datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
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
        stacked: true,
        title: { display: true, text: "Zone" }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: { display: true, text: "Near Miss Density" }
      }
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Risky Area Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default RiskyAreaChart;

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

function VestViolationChart({ data }) {
  const vestViolationData= Array.isArray(data?.vestViolations) ? data.vestViolations : [];

  // Extract unique zones and classes
  const zones = [...new Set(vestViolationData.map(d => d.zone ?? "Unknown"))];
  const classes = [...new Set(vestViolationData.map(d => d.class ?? "Unknown"))];

  // Build datasets per class
  const datasets = classes.map(cls => {
    const classData = zones.map(zone => {
      const match = vestViolationData.find(d => d.zone === zone && d.class === cls);
      return match?.count ?? 0;
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
            return `${context.dataset.label}: ${context.raw} in ${context.label}`;
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
        title: { display: true, text: "Violation Count" }
      }
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Vest Violations by Zone and Class</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default VestViolationChart;

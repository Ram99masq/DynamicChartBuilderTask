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

function DwellTimeStackedChart({ data }) {
  const dwellTime = Array.isArray(data?.dwellTime) ? data.dwellTime : [];

  console.log("dwellTime"+dwellTime);
  const zones = [...new Set(dwellTime.map(d => d.zone ?? "Unknown"))];
  const classes = [...new Set(dwellTime.map(d => d.class ?? "Unknown"))];

  const datasets = classes.map(cls => {
    const classData = zones.map(zone => {
      const match = dwellTime.find(d => d.zone === zone && d.class === cls);
      return match?.dwellTimeMinutes ?? 0;
    });

    return {
      label: cls,
      data: classData,
      backgroundColor:
        cls === "human"
          ? "rgba(54, 162, 235, 0.6)"
          : cls === "vehicle"
          ? "rgba(255, 99, 132, 0.6)"
          : "rgba(153, 102, 255, 0.6)",
      borderColor:
        cls === "human"
          ? "rgba(54, 162, 235, 1)"
          : cls === "vehicle"
          ? "rgba(255, 99, 132, 1)"
          : "rgba(153, 102, 255, 1)",
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
      x: { stacked: true, title: { display: true, text: "Zone" } },
      y: { stacked: true, beginAtZero: true, title: { display: true, text: "Dwell Time (minutes)" } }
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>DwellTime Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default DwellTimeStackedChart;

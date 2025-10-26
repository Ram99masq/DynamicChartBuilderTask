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
//Overspeeding chart
function CloseCallChart({ data, chartType  }) {
  const closeCallData = Array.isArray(data.closeCalls) ? data.closeCalls: [];

  // Extract unique time buckets (HH:mm format)
  const labels = [...new Set(
    closeCallData.map(d =>
      new Date(d.timeBucket).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    )
  )];

  // Extract unique zones
  const zones = [...new Set(closeCallData.map(d => d.zone ?? "Unknown"))];

  // Build datasets per zone
  const datasets = zones.map(zone => {
    const zoneData = labels.map(label => {
      const match = closeCallData.find(
        d =>
          new Date(d.timeBucket).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) === label &&
          d.zone === zone
      );
      return match?.count ?? 0;
    });

    return {
      label: zone,
      data: zoneData,
      backgroundColor: `rgba(${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, ${Math.floor(Math.random() * 200)}, 0.6)`,
      borderColor: "rgba(0,0,0,0.1)",
      borderWidth: 1
    };
  });

  const chartData = {
    labels,
    datasets
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      x: { stacked: true, title: { display: true, text: "Time Bucket" } },
      y: { stacked: true, beginAtZero: true, title: { display: true, text: "Count" } }
    }
  };

  return (
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>CloseCall  Chart</h2>
        <Bar data={chartData} options={options} />
      </div>
    );
}

export default CloseCallChart;

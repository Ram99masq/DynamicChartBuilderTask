import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, PointElement, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(PointElement, LinearScale, Tooltip, Legend);

const ScatterSpeedHeading = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: "Speed vs Heading",
        data: data.map(d => ({ x: d.speed, y: d.heading })),
        backgroundColor: "#82ca9d",
      },
    ],
  };

  const options = {
    scales: {
      x: { title: { display: true, text: "Speed (m/s)" } },
      y: { title: { display: true, text: "Heading (°)" } },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default ScatterSpeedHeading;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from "chart.js/auto";

const ExchangeRateBarChart = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const API_KEY = "60bc11be8f8cb372ff6e71e6";
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
        );
        if (response.status === 200) {
          setExchangeRates(response.data.conversion_rates);
        } else {
          throw new Error("Failed to fetch exchange rates");
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchExchangeRates();
  }, []);

  useEffect(() => {
    const renderChart = () => {
      if (exchangeRates && chartRef.current) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["USD to MXN", "MXN to USD"],
            datasets: [
              {
                label: "Paridad de Peso y Dólar",
                data: [exchangeRates.MXN, 1 / exchangeRates.MXN],
                backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              legend: {
                labels: {
                  fontSize: 25,
                },
              },
            },
          },
        });
      }
    };
    renderChart();
  }, [exchangeRates]);

  return (
    <div>
      <canvas id="exchangeRateChart" ref={chartRef} width={400} height={400}></canvas>
    </div>
  );
};

export default ExchangeRateBarChart;

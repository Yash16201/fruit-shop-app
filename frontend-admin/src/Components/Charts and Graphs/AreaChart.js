import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const AreaChart = (props) => {
    const options = {
        scales: {
            y: {
             beginAtZero: true
            }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
          },
        },
    };
    const labels = props.label;
    
    const data = {
      labels,
      datasets: [
        {
          fill:true,
          label: "Price",
          data: props.data,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgb(139, 0, 0)',
        },
      ],
    };
    
  return (
    <div>
        <Line options={options} data={data} />
    </div>
  )
}

export default AreaChart
import React from 'react'
import {Chart as ChartJs, BarElement, CategoryScale, LinearScale} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const BarChart = (props) => {
  var data = {
    labels: props.label,
    datasets: [{
        label: "Price",
        data: props.data,
        backgroundColor: [
        'rgb(139, 0, 0)',
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        ],
        borderWidth: 1
    }]
  }
  var options = {
    scales: {
        y: {
         beginAtZero: true
        }
    },
    legend: {
        labels: {
            fontSize: 26
        }
    },
    title: {
        display: true,
    },
  }
  return (
    <div>
        <Bar
         data= {data}
         options={options}
         />
    </div>
  )
}

export default BarChart
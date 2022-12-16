import React from 'react'
// import {Chart as ChartJs, PieController, DoughnutController} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement)

const PieChart = (props) => {
    var data = {
      labels: props.label,
      datasets: [{
          label: "Price",
          data: props.data,
          backgroundColor: [
          'rgb(139, 0, 0)',
          'rgb(45, 0, 0)',
          'rgb(19, 0, 0)',
          ],
          borderColor: [
          'rgb(255, 99, 132)',
          ],
          borderWidth: 1
      }]
    }
    var options = {
        legend: { display: true, position: "right" },
        datalabels: {
          display: true,
          color: "white",
        },
        tooltips: {
          backgroundColor: "#5a6e7f",   
        },
        title: {
            display: true,
        },
    }
  return (
    <div>
        <Pie
        data={data}
        options={options}
        />
    </div>
  )
}

export default PieChart
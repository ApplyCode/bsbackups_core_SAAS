import React, { Component } from "react"
import ReactApexChart from "react-apexcharts"

class Salesdonut extends Component {
  constructor(props) {
    super(props)

    this.state = {
      options: {
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "80%",
            },
          },
        },
        colors: ["#02a499", "#38a4f8", "#ec4561"],
        labels: ["Sucesso", "Em Execução", "Erro"],
      },
      series: this.props.data,
    }
  }
  render() {
    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height="220"
          className="apex-charts"
        />
      </React.Fragment>
    )
  }
}

export default Salesdonut

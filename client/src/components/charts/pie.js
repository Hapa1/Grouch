import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class PieChart extends Component {

  render() {
    
    var data = this.props.data;
    if(data.loading){
        
    } else {

        const containers = data.containers
        containers.forEach( container => {
            console.log(container.type)
        })
    

    }
    data = {
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ],
        colors: [
            "#FDB45C",
            "#FDB45C",
            "#FDB45C",
        ]

    };
    return (
        <Pie data={data} />
    );
  }
}

export default PieChart;
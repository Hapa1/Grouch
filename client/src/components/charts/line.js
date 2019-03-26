import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { graphql } from 'react-apollo';
import { getContainersQuery } from '../../queries/queries'

class LineGraph extends Component {


  render() {
    
    var data = this.props.data;
    if(data.loading){
        
    } else {
        var labels = new Array
        var dataset = new Array(24)
        const containers = data.containers
        containers.forEach( container => {
            for (var i = 0; i < container.wasteLevels.length; i++){
                if (isNaN(dataset[i])){
                    dataset[i] = 0
                }
                dataset[i] = dataset[i] + container.wasteLevels[i]
            }
        })
        labels = containers[0].wasteTimes

    }
    console.log(dataset)
    const data = {
        labels,
        datasets: [
          {
            label: 'Waste',
            data: dataset,
            fill: false,          // Don't fill area under the line
            borderColor: 'green'  // Line color
          }
        ]
      }
    return (
    <Line
        data={data}
    />
    );
  }
}

export default graphql(getContainersQuery)(LineGraph);
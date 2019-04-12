import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class PieChart extends Component {

  render() {
    
    var data = this.props.data;
    if(data.loading){
        
    } else {
        var greenWaste = 0
        var solidRubbish = 0
        var recyclables = 0 
        var typeData = []
        const containers = data.containers
        containers.forEach( container => {
            //console.log(container.type)
            if (container.type == 'Green Waste') { greenWaste++ }
            if (container.type == 'Solid Rubbish') { solidRubbish++ }
            if (container.type == 'Recyclables') { recyclables++ }
        })
        typeData.push(solidRubbish);
        typeData.push(recyclables)
        typeData.push(greenWaste)

    }
    const options = {
        layout: {
          padding: {
              left: 50,
              top: 0,
              bottom: 0
        }
      }
      }
    data = {
        datasets: [{
            data: typeData,
            backgroundColor: ["#f9b079", "#67d0ee", "#79c47f"],
        }],
    
        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Solid Rubbish',
            'Recyclables',
            'Green Waste'
        ],
    };
    return (
        <Pie data={data}
        options={options}
        
        />
    );
  }
}

export default PieChart;
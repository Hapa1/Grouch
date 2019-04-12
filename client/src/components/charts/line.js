import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { graphql } from 'react-apollo';
import { getContainersQuery } from '../../queries/queries'
import moment from 'moment'
import { getDirectivesFromDocument } from 'apollo-utilities';

class LineGraph extends Component {
  constructor (props){
    super(props);
  
    this.state = {
    
    };
  
  }
  convertTime(t) {
    var timestamp = t.split(" ")
    var date = timestamp[0].split("-")
    var time = timestamp[1].split(":")
    //var year = (date[0] - 2018) * 31622400
    var month = date[1] * 2592000
    var day = date[2] * 3600 * 24
    var hours = time[0] * 3600
    var minutes = time[1] * 60
    var seconds = time[2] * 1
    //var total = seconds + (minutes * 60) + (hours * 3600);
    var total = hours + minutes + seconds + day + month //+ year
    
    return total
    
  }
  convertFromSeconds(s) {
    var date = moment("2018-12-1").startOf('day')
    .seconds(s)
    .format('YYYY-MM-DD H:mm:ss');
    return date
  }
  getLabels(i,j) {
    var fromdate = this.convertFromSeconds(i)
    var todate = this.convertFromSeconds(j)
    var arr1 = fromdate.split(" ")
    var day1 = arr1[0].split("-")[2]
    var labels = []
    var arr2 = todate.split(" ")
    var day2 = arr2[0].split("-")[2]
    var interval = (day2*1 - day1*1)
    for (var i = 0; i < interval + 1; i++){
      var time = moment(fromdate).startOf('day').add(i, 'days').format("YYYY-MM-DD")
      labels.push(time)
    }
    return labels
    
  }

  sum( obj ) {
    var sum = 0;
    for( var el in obj ) {
      if( obj.hasOwnProperty( el ) ) {
        sum += parseFloat( obj[el] );
      }
    }
    return sum;
  }

  getSum(arr){
  
    var d = {}
    let keys = Object.keys(arr);
    keys.sort(function(a, b) { return arr[a].seconds - arr[b].seconds });
    var total = 0
    var containers = {}
    var waste = []
    var containers = {}
    for (const [key, value] of Object.entries(keys)) {
      var entry = arr[value]
      if (entry.id in containers){
        d[entry.id] = d[entry.id] + entry.level
        var sum = 0;
        for( var el in d ) {
          if( d.hasOwnProperty( el ) ) {
            sum += parseFloat( d[el] );
          }
        }
     
        waste.push({
          x: entry.x,
          y: sum
        })
      }
      else {
        d[entry.id] = entry.level
        var sum = 0;
        for( var el in d ) {
          if( d.hasOwnProperty( el ) ) {
            sum += parseFloat( d[el] );
          }
        }
        waste.push({
          x: entry.x,
          y: sum
        })
      }
    }
    return waste
    };

  //2019-04-11, 21:43:23
  render() {
    var labels = []
    console.log(this.props.data[0])
    const options = {
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day'
          }
        }]
      },
      layout: {
        padding: {
            left: 50,
            right: 100,
            top: 0,
            bottom: 0
      }
    }
    }
    const data = {
        labels,
        datasets: [
          {
            label: 'Green Waste',
            data: this.props.data[0],
            fill: false,          // Don't fill area under the line
            borderColor: '#7ac37a'  // Line color
          },
          {
            label: 'Solid Rubbish',
            data: this.props.data[1],
            fill: false,          // Don't fill area under the line
            borderColor: '#fab277'  // Line color
          },
          {
            label: 'Recyclables',
            data: this.props.data[2],
            fill: false,          // Don't fill area under the line
            borderColor: '#69d3fb'  // Line color
          }
        ]
      }
    return (
    <Line
        data={data}
        options={options}
        width={500}
        height={300}
    />
    );
  }
}

export default LineGraph;
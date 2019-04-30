import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getContainersQuery } from '../queries/queries'
import Line from './charts/line';
import Pie from './charts/pie';
import Segregation from './charts/segregation';
import '../static/Dashboard.css';
import moment from 'moment';
class Dashboard extends Component {


    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            fields: {},
            errors: {},
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

    displayContainers(){
        var data = this.props.data;
        if(data.loading){
            return( <div>
                loading...
            </div>)
        } else {
            return data.containers.map(container => {
                return(
                    <div>
                        <li key={ container.id }>
                        {container.name}
                        </li>
                    </div>
                    
                )
            });
            
        }
    }



    render() {
        var labels = []
        var data = this.props.data;
        if(data.loading){
        
        } else {
            //var dataset = new Array(24)
            var gct = 0
            var rct = 0
            var rect = 0
            var containerData = []
            var greenData = []
            var rubbishData = []
            var recycleData = []
            var d = {}
            const containers = data.containers
            var times = []
            containers.forEach( container => {
                //console.log(container.wasteTimes[0])
                //console.log(this.convertTime(container.wasteTimes[0]))
                labels = this.getLabels(this.convertTime(container.wasteTimes[0]),this.convertTime(container.wasteTimes[container.wasteTimes.length-1]));
                //console.log(labels)
                var green = 0
                var recy = 0
                var trash = 0
                var total = 0
                if (container.type == "Green Waste"){
                    gct++
                    
                  }
                  if (container.type == "Solid Rubbish"){
                    rct++
                    
                  }
                  if (container.type == "Recyclables"){
                    rect++
                    
                  }
                for (var i = 0; i < container.wasteLevels.length; i++){
                    
                    console.log(container.wasteLevels.length)
                    console.log(container.wasteLevels.length)
                     console.log(container.wasteLevels[i], container.wasteTimes[i])
                     console.log()
                      var timestamp = this.convertTime(container.wasteTimes[i])
                      times.push(timestamp)
                      var date = this.convertFromSeconds(timestamp)
                      //greenData[i] = greenData[i] + container.wasteLevels[i]
                      //console.log(greenData)
                      //console.log(container)
                      if (container.type == "Green Waste"){
                        
                        greenData.push({
                          x: container.wasteTimes[i],
                          seconds: timestamp,
                          y: container.wasteLevels[i],
                          id: container.id,
                          level: container.wasteLevels[i],
                          date
                        })
                      }
                      if (container.type == "Solid Rubbish"){
                        
                        rubbishData.push({
                          x: container.wasteTimes[i],
                          seconds: timestamp,
                          y: container.wasteLevels[i],
                          id: container.id,
                          level: container.wasteLevels[i],
                          date
                        })
                      }
                      if (container.type == "Recyclables"){
                        
                        recycleData.push({
                          x: container.wasteTimes[i],
                          seconds: timestamp,
                          y: container.wasteLevels[i],
                          id: container.id,
                          level: container.wasteLevels[i],
                        })
                      }
                        
                      
                    
                }
                
            })
    
        console.log(greenData)
           var greenData= (this.getSum(greenData))
           var rubbishData= (this.getSum(rubbishData))
           var recycleData = (this.getSum(recycleData))
           console.log(greenData)
           var gfinal = greenData[greenData.length-1].y
           var rfinal = rubbishData[rubbishData.length-1].y
           var refinal = recycleData[recycleData.length-1].y
           var total = gfinal+rfinal+refinal
           var cttotal = gct + rct + rect
        }
        var dataset = []
        var values = []
        dataset.push(greenData)
        dataset.push(rubbishData)
        dataset.push(recycleData)
        values.push(gfinal)
        values.push(rfinal)
        values.push(refinal)

        //console.log(greenData.length)
        console.log(refinal)
        var rubbish = {
            empty: 9,
            low: 10,
            moderate: 5,
            high: 4,
            critical: 4,
            emptyid: "rubempty",
            lowid: "rublow",
            modid: "rubmoderate",
            highid: "rubhigh",
            critid: "rubcritical",
            ecolor: "#bbbbbb",
            lcolor: "#ffd890",
            mcolor: "#f8af7a",
            hcolor: "#f18d3f",
            ccolor: "#f1532c",

            
        }
        var green = {
            empty: 9,
            low: 10,
            moderate: 13,
            high: 4,
            critical: 4,
            emptyid: "gempty",
            lowid: "glow",
            modid: "gmod",
            highid: "ghigh",
            critid: "gcrit",
            ecolor: "#bbbbbb",
            lcolor: "#b1ddb9",
            mcolor: "#7fc483",
            hcolor: "#69b85c",
            ccolor: "#169440",
        }
        var rec = {
            empty: 9,
            low: 1,
            moderate: 5,
            high: 4,
            critical: 4,
            emptyid: "recempty",
            lowid: "reclow",
            modid: "recmod",
            highid: "rechigh",
            critid: "reccrit",
            ecolor: "#bbbbbb",
            lcolor: "#b0ddf4",
            mcolor: "#69d3fb",
            hcolor: "#00bcdc",
            ccolor: "#006e73",
        }
        var data = this.props.data;
        return (
    
        <div className="dash" id="dashboard">
      

        <div>
            <div className="graphContainer">
                    <div style={{marginTop: '50px'}}>
                        <div>
                            Overall waste collected for April
                        </div>
                        <div>
                            <h4>{total} Gal</h4>
                        </div>
                        <div style={{color: "#f28d3f"}}>
                            Solid Rubbish
                        </div>
                        <div style={{color: "#f28d3f"}}>
                            <h5>{rfinal} Gal</h5>
                        </div>
                        <div style={{color: "#65b959"}}>
                            Green Waste
                        </div>
                        <div style={{color: "#65b959"}}>
                            <h5>{gfinal} Gal</h5>
                        </div>
                        <div style={{color: "#00bbdb"}}>
                            Recyclables
                        </div>
                        <div style={{color: "#00bbdb"}}>
                            <h5>{refinal} Gal</h5>
                        </div>
                    </div>
                    
                    <div className="Line Box" style={{width: "30%", height: "30%"}}>
        
                        <Line values={values} data={dataset}></Line>

                    </div>
                    <div style={{marginTop: '50px'}}>
                        <div>
                            Containers Monitored
                        </div>
                        <div>
                            <h4>{cttotal} </h4>
                        </div>
                        <div style={{color: "#f28d3f"}}>
                            Solid Rubbish
                        </div>
                        <div style={{color: "#f28d3f"}}>
                            <h5>{rct} </h5>
                        </div>
                        <div style={{color: "#65b959"}}>
                            Green Waste
                        </div>
                        <div style={{color: "#65b959"}}>
                            <h5>{gct}</h5>
                        </div>
                        <div style={{color: "#00bbdb"}}>
                            Recyclables
                        </div>
                        <div style={{color: "#00bbdb"}}>
                            <h5>{rect}</h5>
                        </div>
                    </div>
                    <div className="Pie Box" style={{width: "25%", height: "25%"}}>
                        <Pie data={data}></Pie>
                        
                    </div>
                
            </div>
            <div  className="statContainer">
                <div>
                    
                </div>
                
                <div className="Box Content">
                    <div>
                        <h5>Waste level distributions</h5>
                    </div>
                    <div className="rowContainer"> 
                        <div>
                            <Segregation levels={rubbish}/>
                        </div>
                        <div style={{padding: '5px', color: "#f28d3f"}}>
                            Solid Rubbish
                        </div>
                    </div>
                    <div className="rowContainer"> 
                        <div>
                            <Segregation levels={green}/>
                        </div>
                        <div style={{padding: '5px', color: "#65b959"}}>
                            Green Waste
                        </div>
                        <div style={{marginLeft: '100px', padding: '5px', color: "#65b959"}}>
                            Devices Needing Maintenance
                            <div>
                                <h3>0</h3>
                            </div>
                        </div>
                        
                    </div>
                    <div className="rowContainer"> 
                        <div>
                            <Segregation levels={rec}/>
                        </div>
                        <div style={{padding: '5px', color: "#00bbdb"}}>
                            Recylables
                        </div>
                        
                    </div>
                </div>
                
            </div> 
        </div>
        </div>
        
        );
    }
    }

export default graphql(getContainersQuery)(Dashboard);

//<ul id="container-list">
//    {this.displayContainers()}
//</ul>
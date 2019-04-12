import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getContainersQuery } from '../queries/queries'
import Line from './charts/line';
import Pie from './charts/pie';
import Segregation from './charts/segregation';
import '../static/Dashboard.css';

class Dashboard extends Component {

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
                            <h4>2011 Gal</h4>
                        </div>
                        <div style={{color: "#f28d3f"}}>
                            Solid Rubbish
                        </div>
                        <div style={{color: "#f28d3f"}}>
                            <h5>23 Gal</h5>
                        </div>
                        <div style={{color: "#65b959"}}>
                            Green Waste
                        </div>
                        <div style={{color: "#65b959"}}>
                            <h5>23 Gal</h5>
                        </div>
                        <div style={{color: "#00bbdb"}}>
                            Recyclables
                        </div>
                        <div style={{color: "#00bbdb"}}>
                            <h5>223 Gal</h5>
                        </div>
                    </div>
                    
                    <div className="Line Box" style={{width: "30%", height: "30%"}}>
        
                        <Line data={data}></Line>

                    </div>
                    <div style={{marginTop: '50px'}}>
                        <div>
                            Containers Monitored
                        </div>
                        <div>
                            <h4>231</h4>
                        </div>
                        <div style={{color: "#f28d3f"}}>
                            Solid Rubbish
                        </div>
                        <div style={{color: "#f28d3f"}}>
                            <h5>23</h5>
                        </div>
                        <div style={{color: "#65b959"}}>
                            Green Waste
                        </div>
                        <div style={{color: "#65b959"}}>
                            <h5>23</h5>
                        </div>
                        <div style={{color: "#00bbdb"}}>
                            Recyclables
                        </div>
                        <div style={{color: "#00bbdb"}}>
                            <h5>23</h5>
                        </div>
                    </div>
                    <div className="Pie Box" style={{width: "25%", height: "25%"}}>
                        <Pie data={data}></Pie>
                        
                    </div>
                
            </div>
            <div className="statContainer">
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
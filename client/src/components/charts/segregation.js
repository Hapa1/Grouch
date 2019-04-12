import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import '../../static/Segregation.css';
import { FaCircle } from 'react-icons/fa';
class Segregation extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            levels: this.props.levels
        }
        
       
    }

    componentDidMount(){
        
        var levels = this.state.levels
        var ecolor = levels.ecolor
        var lcolor = levels.lcolor
        var mcolor = levels.mcolor
        var hcolor = levels.hcolor
        var ccolor = levels.ccolor
        var emptyCt = this.state.levels.empty
        var lowCt = this.state.levels.low
        var ModerateCt = this.state.levels.moderate
        var HighCt = this.state.levels.high
        var CriticalCt = this.state.levels.critical
        var sum = emptyCt + lowCt + ModerateCt + HighCt + CriticalCt
        var emptyP = emptyCt/sum*100
        var lowP = lowCt/sum*100
        var ModerateP = ModerateCt/sum*100
        var highP = HighCt/sum*100
        var criticalP = CriticalCt/sum*100
        document.getElementById(levels.emptyid).style.width = emptyP+"%"
        document.getElementById(levels.emptyid).style.backgroundColor = ecolor
        document.getElementById(levels.lowid).style.width = lowP+"%"
        document.getElementById(levels.lowid).style.backgroundColor = lcolor
        document.getElementById(levels.modid).style.width = ModerateP+"%"
        document.getElementById(levels.modid).style.backgroundColor = mcolor
        document.getElementById(levels.highid).style.width = highP+"%"
        document.getElementById(levels.highid).style.backgroundColor= hcolor
        document.getElementById(levels.critid).style.width = criticalP+"%"
        document.getElementById(levels.critid).style.backgroundColor = ccolor
        
    }

    render() {
        var levels = this.state.levels
        var ecolor = levels.ecolor
        var lcolor = levels.lcolor
        var mcolor = levels.mcolor
        var hcolor = levels.hcolor
        var ccolor = levels.ccolor
        console.log(levels)
            return(
                <div>
                    <div className="barContainer">
                        
                            <div className="Segment Left" id={levels.emptyid}>
                                
                            </div>
                            <div className="Segment" id={levels.lowid}>
                                
                            </div>
                            <div className="Segment" id={levels.modid}>
                                
                            </div>
                            <div className="Segment" id={levels.highid}>
                                
                            </div>
                            <div className="Segment Right" id={levels.critid}>
                                
                            </div>
                        
                    </div>
                <div className="keyContainer">
                    <div className="elementContainer">
                        <div>
                            <FaCircle style={{color: ecolor}}/>
                        </div>
                        <div className="Tag">
                            Empty
                        </div>
                    </div>
                    <div className="elementContainer">
                        <div>
                            <FaCircle style={{color: lcolor}}/>
                        </div>
                        <div className="Tag">
                            Low
                        </div>
                    </div>
                    <div className="elementContainer">
                        <div>
                            <FaCircle style={{color: mcolor}}/>
                        </div>
                        <div className="Tag">
                            Moderate
                        </div>
                    </div>
                    <div className="elementContainer">
                        <div>
                            <FaCircle style={{color: hcolor}}/>
                        </div>
                        <div className="Tag">
                            High
                        </div>
                    </div>
                    <div className="elementContainer">
                        <div>
                            <FaCircle style={{color: ccolor}}/>
                        </div>
                        <div className="Tag">
                            Critical
                        </div>
                    </div>
                </div>
                </div>
               
            )
        }
    }

export default Segregation;
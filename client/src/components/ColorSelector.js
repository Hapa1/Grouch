import React, { Component } from 'react';
import '../static/selector.css';
import { FaBars, FaMapMarker, FaTrash, FaTrashAlt} from 'react-icons/fa';

class Selector extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            activedisplay: "Default",
            prevdisplay: "Default"
        }
        //this.handleChange = this.handleChange.bind(this);
    }
    
    render() {
        return (
        <div style={{display:'flex', justifyContent:'space-around'}}>
                <div id='Default' style={{ borderRadius:'25px', padding:'10px'}}>
                <i onClick={this.props.onChange("Default")} style={{margin: '2px', fontSize: '20px', color:'#ff8723'}} class='fas fa-circle'></i>
                <i onClick={this.props.onChange("Default")} style={{margin: '2px', fontSize: '20px', color:'#00bedf'}} class='fas fa-circle'></i>
                <i onClick={this.props.onChange("Default")} style={{margin: '2px', fontSize: '20px', color:'#41be4c'}} class='fas fa-circle'></i>
                </div>
                <div id='Alt' style={{borderRadius:'25px',padding:'10px'}}>
                <i onClick={this.props.onChange("Alt")} style={{margin: '2px', fontSize: '20px', color:'#FBB1A6'}} class='fas fa-circle'></i>
                <i onClick={this.props.onChange("Alt")} style={{margin: '2px', fontSize: '20px', color:'#E36754'}} class='fas fa-circle'></i>
                <i onClick={this.props.onChange("Alt")} style={{margin: '2px', fontSize: '20px', color:'#9F483B'}} class='fas fa-circle'></i>
                </div>
                
        </div>
        );
    }
    }

export default Selector; 
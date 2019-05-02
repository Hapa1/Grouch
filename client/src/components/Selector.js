import React, { Component } from 'react';
import '../static/selector.css';
import { FaBars, FaMapMarker, FaTrash, FaTrashAlt} from 'react-icons/fa';

class Selector extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            display: "Marker"
            
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const item = e.target.id;
        console.log(item)
        const isChecked = e.target.checked;
        //this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        
        this.setState({prevdisplay: this.state.display, display: item })
        console.log(this.state)
        var prevelement = document.getElementById(this.state.display);
        prevelement.style.backgroundColor = '#cccccc'

        var element = document.getElementById(item);
        console.log(element)
        element.style.backgroundColor = '#aaaaaa'
        element.style.animationName = "slide";
        
    }
    
    render() {
        return (
        <div style={{display:'flex'}}>
            <div className="item" onClick={this.handleChange}  id="Marker">
                <i style={{fontSize: '20px', color:'#777777'}} class='fas fa-dumpster'></i>
            </div>
            <div className="item" onClick={this.handleChange}  id="Icon">
                <i style={{fontSize: '20px', color:'#777777'}} class='fas fa-dumpster'></i>
            </div>
            <div className="item" onClick={this.handleChange}  id="Other">
            </div>
        </div>
        );
    }
    }

export default Selector; 
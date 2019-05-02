import React, { Component } from 'react';
import '../static/selector.css';
import { FaBars, FaMapMarker, FaTrash, FaTrashAlt} from 'react-icons/fa';

class ColorSelector extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            activedisplay: "Marker",
            prevdisplay: "Marker"
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        //this.props.onChange(this.state.activedisplay)
        console.log(this.props)
        const item = e.target.id;
        const isChecked = e.target.checked;
        //this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        
        
        
        var prevelement = document.getElementById(this.state.activedisplay);
        prevelement.style.color = '#cccccc'
        
        var element = document.getElementById(item);
        console.log(element)
        element.style.color = '#666666'
        element.style.animationName = "slide";
        this.setState({prevdisplay: this.state.activedisplay, activedisplay: item })
        console.log(this.state)
    }
    
    render() {
        return (
        <div style={{display:'flex'}}>
    
                <i onClick={this.props.onChange("Icon")}  id="Icon" style={{margin: '7.5px', fontSize: '20px', color:'#cccccc'}} class='fas fa-dumpster'></i>
                <i onClick={this.props.onChange("Marker")}  id="Marker" style={{margin: '7.5px', fontSize: '20px', color:'#cccccc'}} class='fas fa-map-marker'></i>
                <i onClick={this.props.onChange("Circle")}  id="Circle" style={{margin: '7.5px', fontSize: '20px', color:'#cccccc'}} class='fas fa-circle'></i>
                <i onClick={this.props.onChange("Circle")}  id="Circle1" style={{margin: '7.5px', fontSize: '15px', color:'#cccccc'}} class='fas fa-circle'></i>
                <i onClick={this.props.onChange("Circle")}  id="Circle2" style={{margin: '7.5px', fontSize: '10px', color:'#cccccc'}} class='fas fa-circle'></i>
        </div>
        );
    }
    }

export default ColorSelector; 
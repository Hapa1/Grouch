
import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({ type = 'checkbox', name, checked = false, onChange }) => (
  
      <input type={type} name={name} checked={checked} onChange={onChange} />
  
  
);

CheckBox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

export default CheckBox;

/** import React, { Component } from 'react';
import '../static/Menu.css';

export class CheckBox extends Component {

    constructor(props){
        super(props);
        this.state = {
            checked: false,
            label: this.props.label,
            onChange: this.props.onChange,
        }
        
    }

    //handleCheckboxChange = event => {
    //    this.setState({ checked: event.target.checked })
///
    //    console.log(this.state)
    //}
    
    render() {
        console.log(this.props)
        return (
            <div>
            <input 
                type="checkbox" 
                id={this.state.label}
                name={this.state.label}
                checked={this.state.checked} 
                onChange={this.props.onChange}
            />  
            {this.state.label}
            </div>
        )
       
    }
}
export default CheckBox

*/
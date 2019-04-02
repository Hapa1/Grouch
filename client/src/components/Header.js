import React, { Component } from 'react';
import '../static/Header.css';
import { FaBars } from 'react-icons/fa';

class Header extends Component {
  render() {
    return (
      <div className="flexContainer">
        <div>
          <FaBars style={{color:'#28a745'}}onClick={this.props.toggleMenu}/>   
        </div>
        <div>
          Grouch.io
        </div>  
      </div>
    );
  }
}

export default Header;
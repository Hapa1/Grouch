import React, { Component } from 'react';
import '../static/Header.css';
import Menu from './Menu';
class Header extends Component {
  render() {
    return (
      <div>
        
        <Menu></Menu>
      </div>
    );
  }
}

export default Header;
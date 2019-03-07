import React, { Component } from 'react';
import '../static/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="container">
        <button type="button" className="btn btn-success">Success</button>
      </div>
    );
  }
}

export default Header;
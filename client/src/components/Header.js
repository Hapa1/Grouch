import React, { Component } from 'react';
import '../static/Header.css';
import { FaBars, FaChartLine } from 'react-icons/fa';

class Header extends Component {
  render() {
    return (
      <div className="flexContainer">
          <div style={{color:'#69bd5b', marginLeft: '15px', marginTop: '8px'}} className="navItem">
            <FaBars style={{marginBottom: '9px', fontSize: '20px'}} className="navItem" onClick={this.props.toggleMenu}/>   
            <span style={{fontSize: '28px'}} className="navItem" >Grouch.io</span>
          </div>
          <div className="groupContainer" style={{color:'#69bd5b', marginLeft: '15px', marginTop: '15px', marginRight: '25px'}}>
            <div style={{marginTop: '8px'}} className="navItem">
              Welcome Admin!
            </div>
            <div className="navItem">
              <button style={{color:'#69bd5b'}} onClick={this.props.toggleDash} className="btn btn-outline-success navButton"><FaChartLine/> Dashboard</button>
            </div>
          </div>
      </div>
    );
  }
}

export default Header;

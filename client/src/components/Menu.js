import React, { Component } from 'react';
import '../static/Menu.css';
import CheckBox from './CheckBox';
import { FaBars } from 'react-icons/fa';
import Header from './Header';
export class Menu extends Component {

   

    constructor(props) {
        super(props);
        
        const initMap = new Object();
        initMap["Solid Rubbish"] = true;
        initMap["Recyclables"] = true;
        initMap["Green Waste"] = true;

        this.state = {
         // checkedItems: new Map(),
            checkedItems: initMap,
            menuActive: true,
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.addMarker = this.addMarker.bind(this);
       
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        //this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
        
        this.setState(prevState => ({
            checkedItems: {
                ...prevState.checkedItems,
                [item]: isChecked
            }
        }))
        
        //this.setState({ 
        //   checkedItems: checkedItems[item] = isChecked
        //    checkedItems: prevState.checkedItems.set(item, isChecked) 
        //});
        //console.log(this.state.checkedItems)
    }
    toggleMenu() {
        var sideMenu = document.getElementById('sideMenu');
        if(this.state.menuActive){
            console.log("remove menu")
            sideMenu.style.animationName = "slideout";
            sideMenu.style.marginLeft = "-45%";
            this.setState({ menuActive: false});
        }
        else {
            console.log("display menu")
            sideMenu.style.animationName = "slidein"
            sideMenu.style.display = "block";
            sideMenu.style.marginLeft = "0%";
            this.setState({ menuActive: true});
        }
        
    }

    render() {
        const checkboxes = [
            {
              name: 'Solid Rubbish',
              key: 'Solid Rubbish',
              label: 'Solid Rubbish',
            },
            {
              name: 'Recyclables',
              key: 'Recyclables',
              label: 'Recyclables',
            },
            {
              name: 'Green Waste',
              key: 'Green Waste',
              label: 'Green Waste',
            }
        ];
        return (
            <div className="down" >
                    <Header toggleMenu={this.toggleMenu} />
                    <div id="sideMenu" className="down-content">
                        <form value={this.state.checkedItems}>
                            <React.Fragment>
                                {
                                checkboxes.map(item => (
                                    <div key={item.key}>
                                        {item.name}
                                        <CheckBox name={item.name} checked={this.state.checkedItems[item.name]} onChange={this.handleChange} />
                                    </div>
                                ))
                                }
                            </React.Fragment>
                            <div>
                                <input className="slider" type="range"/>
                            </div>
                            <button onClick={this.props.onChange(this.state.checkedItems)} type="submit" className="btn btn-success">Submit</button>
                        </form>
                        <button onClick={this.props.addMarker} type="submit" className="btn btn-success">Add Marker</button>
                    </div>   
            </div>
            
        )
       
    }
}
export default Menu

/**
 * <p>
                        <center><h6>Waste Type</h6></center>
                    </p>
                    <div className="boxField">
                        <div className="form-check">
                            <div class="custom-control custom-checkbox">
                                <div>
                                        <input 
                                            type="checkbox" 
                                            id="customCheck1" 
                                            name="example1" 
                                            checked={this.state.checked} 
                                            onChange={this.handleCheckboxChange}
                                        />
                                        <input 
                                            type="checkbox" 
                                            id="customCheck1" 
                                            name="example1" 
                                            checked={this.state.checked} 
                                            onChange={this.handleCheckboxChange}
                                        />
                                        
                                        <div class="row">
                                            <div class="col-9">
                                                <label class="custom-control-label" for="customCheck1">Rubbish</label>
                                            </div>
                                            <div class="col-3">
                                                <img src="https://s3-us-west-1.amazonaws.com/lootbox1/public/orange.png"></img>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="bg-success custom-control-input" id="customCheck2" name="example1"/>
                                <div class="row">
                                            <div class="col-9">
                                                <label class="custom-control-label" for="customCheck3">Recyclables</label>
                                            </div>
                                            <div class="col-3">
                                                <img src="https://s3-us-west-1.amazonaws.com/lootbox1/public/blue-r.png"></img>
                                            </div>
                                        </div>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="bg-success custom-control-input" id="customCheck3" name="example1"/>
                                <div class="row">
                                            <div class="col-9">
                                                <label class="custom-control-label" for="customCheck3">Green Waste</label>
                                            </div>
                                            <div class="col-3">
                                                <img src="https://s3-us-west-1.amazonaws.com/lootbox1/public/green.png"></img>
                                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <center><h6>Trash Level</h6></center>
                    </div>
                    <div className="boxField">
                        <div className="form-check">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="customCheck4" name="example1"/>
                                <div class="row">
                                            <div class="col-9">
                                                <label class="custom-control-label" for="customCheck4">Low</label>
                                            </div>
                                            <div class="col-3">
                                                <img src="https://s3-us-west-1.amazonaws.com/lootbox1/public/green.png"></img>
                                            </div>
                                </div>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="bg-success custom-control-input" id="customCheck5" name="example1"/>
                                <div class="row">
                                            <div class="col-9">
                                                <label class="custom-control-label" for="customCheck5">Moderate</label>
                                            </div>
                                            <div class="col-3">
                                                <img src="https://s3-us-west-1.amazonaws.com/lootbox1/public/yellow.png"></img>
                                            </div>
                                </div>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="bg-success custom-control-input" id="customCheck6" name="example1"/>
                                <div class="row">
                                            <div class="col-9">
                                                <label class="custom-control-label" for="customCheck6">High</label>
                                            </div>
                                            <div class="col-3">
                                                <img src="https://s3-us-west-1.amazonaws.com/lootbox1/public/orange.png"></img>
                                            </div>
                                </div>
                            </div>
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="bg-success custom-control-input" id="customCheck7" name="example1"/>
                                <div class="row">
                                            <div class="col-9">
                                                <label class="custom-control-label" for="customCheck7">Critical</label>
                                            </div>
                                            <div class="col-3">
                                                <img src="https://s3-us-west-1.amazonaws.com/lootbox1/public/red.png"></img>
                                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="boxField">
                        <div className="input-group mt-3 mb-3">
                            <div class="input-group-prepend">
                                <span style={{paddingLeft:"30px",paddingRight:"35px"}}class="input-group-text">ID</span>
                            </div>
                            <input type="text" className="form-control"/>
                            
                        </div>
                        <div className="input-group mt-3 mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Address</span>
                            </div>
                            <input type="text" className="form-control"/>
                            
                        </div>
                        <center>
                            <button type="button" class="btn btn-success">Submit</button>
                        </center>
                    
                    </div>
 */
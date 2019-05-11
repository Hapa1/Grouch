import React, { Component } from 'react';
import '../static/Menu.css';
import CheckBox from './CheckBox';
import Selector from './Selector';
import ColorSelector from './ColorSelector';
import { FaBars, FaMapMarker, FaTrash, FaTrashAlt} from 'react-icons/fa';
export class Menu extends Component {

   

    constructor(props) {
        super(props);
        
        const initMap = new Object();
        initMap["Solid Rubbish"] = true;
        initMap["Recyclables"] = true;
        initMap["Green Waste"] = true;
        initMap["Low"] = true;
        initMap["Moderate"] = true;
        initMap["High"] = true;
        initMap["Critical"] = true;
        initMap["Can"] = true;
        initMap["Bin"] = true;
        initMap["Dumpster"] = true;
        initMap["Selected"] = "Icon";
        initMap["ColorScheme"] = "Default";

        this.state = {
         // checkedItems: new Map(),
            checkedItems: initMap,
            menuActive: true,
            sliderValue: 50,
            activeelement: "Icon",
            prevelement: "Icon",
            activecolorelement: "Default",
            prevcolorlement: "Default",

        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.sliderChange = this.sliderChange.bind(this);
        this.onChange = this.onChange.bind(this);
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
            },
            
        }))
    }
    toggleMenu() {
        console.log(this)
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

    sliderChange(event) {
        this.setState({sliderValue: event.target.value});
        console.log(this.state.sliderValue)
    }

    onChange = (param) => (e) => {
        var prev = document.getElementById(this.state.activeelement);
        if (this.state.activeelement == "Circle"){
            var circle1 = document.getElementById("Circle1");
            var circle2 = document.getElementById("Circle2");
            circle1.style.color = '#cccccc'
            circle2.style.color = '#cccccc'
        }
        prev.style.color = '#cccccc'
        var element = document.getElementById(param);
        if (param == "Circle"){
            var circle1 = document.getElementById("Circle1");
            var circle2 = document.getElementById("Circle2");
            circle1.style.color = '#666666'
            circle2.style.color = '#666666'
        }
        element.style.color = '#666666'
        this.state.activeelement = param
        e.preventDefault();
        this.state.checkedItems["Selected"] = param;
    }

    colorChange = (param) => (e) => {
        var prev = document.getElementById(this.state.activecolorelement);
        var element = document.getElementById(param);
        this.state.activecolorelement = param
        e.preventDefault();
        if(param == "Alt"){
            var div1 = document.getElementById(param)
            var div2 = document.getElementById('Default')
            div1.style.backgroundColor = '#eeeeee'
            div2.style.backgroundColor = '#ffffff'
        }
        else {
            var div1 = document.getElementById(param)
            var div2 = document.getElementById('Alt')
            div1.style.backgroundColor = '#eeeeee'
            div2.style.backgroundColor = '#ffffff'
        }
        this.state.checkedItems["ColorScheme"] = param;
    }

    getIcon(name){
        if(name == 'Can'){
            return <i style={{fontSize: '16px', color:'#777777'}} class="far fa-trash-alt"></i>
        }
        if(name == 'Bin'){
            return <div><FaTrash style={{fontSize: '18px', color:'#777777'}}></FaTrash></div>
        }
        if(name == 'Dumpster'){
            return <i style={{fontSize: '20px', color:'#777777'}} class='fas fa-dumpster'></i>
        }
        
    }

    render() {
        
        const checkboxes = [
            {
              name: 'Solid Rubbish',
              key: 'Solid Rubbish',
              label: 'Solid Rubbish',
              color: '#ff8723',
            },
            {
              name: 'Recyclables',
              key: 'Recyclables',
              label: 'Recyclables',
              color: '#00bedf',
            },
            {
              name: 'Green Waste',
              key: 'Green Waste',
              label: 'Green Waste',
              color: '#41be4c',
            }
        ];
        const levelcheckboxes = [
            {
              name: 'Low',
              key: 'Low',
              label: 'Low',
              rub: '#ffd890',
              rec: '#a5def6',
              gre: '#a5dfb6',
            },
            {
              name: 'Moderate',
              key: 'Moderate',
              label: 'Moderate',
              rub: '#ffac6f',
              rec: '#3cd5ff',
              gre: '#68c67c',
            },
            {
              name: 'High',
              key: 'High',
              label: 'High',
              rub: '#ff9000',
              rec: '#00bfe0',
              gre: '#47bc4e',
            },
            {
                name: 'Critical',
                key: 'Critical',
                label: 'Critical',
                rub: '#884500',
                rec: '#007174',
                gre: '#009b1c'
            }
        ];
        const containercheckboxes = [
            {
              name: 'Can',
              key: 'Can',
              label: 'Can',
              rub: '#ffd890',
              rec: '#a5def6',
              gre: '#a5dfb6',
            },
            {
              name: 'Bin',
              key: 'Bin',
              label: 'Bin',
              rub: '#ffac6f',
              rec: '#3cd5ff',
              gre: '#68c67c',
            },
            {
              name: 'Dumpster',
              key: 'Dumpster',
              label: 'Dumpster',
              rub: '#ff9000',
              rec: '#00bfe0',
              gre: '#47bc4e',
            },
        ];
        return (
            <div className="down">
                    
                    <div id="sideMenu" className="down-content">
                        <form value={this.state.checkedItems}>
                            Icon Type
                            <Selector onChange={this.onChange} value={this.state.selected}></Selector>
                            Color Scheme
                            <ColorSelector onChange={this.colorChange} value={this.state.selected}></ColorSelector>
                            <div>
                                Waste Type
                            </div>
                            <React.Fragment>
                                {
                                checkboxes.map(item => (
                                    <div style={{display:'flex', justifyContent: 'space-between'}} key={item.key}>

                                        <div style={{display:'flex'}}>
                                            <div>
                                                <CheckBox name={item.name} checked={this.state.checkedItems[item.name]} onChange={this.handleChange} />
                                            </div>
                                            <div>
                                                {item.name}
                                            </div>
                                        </div>
                                        <div style={{display:'flex'}}>

                                            <div><FaMapMarker style={{marginRight:'10px',fontSize: '22px', color:item.color}}></FaMapMarker></div>
                                            
                                        </div>
                                    </div>
                                ))
                                }
                            </React.Fragment>
                            <div>
                                Waste Levels
                            </div>
                            <React.Fragment>
                                {
                                levelcheckboxes.map(item => (
                                    <div style={{display:'flex', justifyContent: 'space-between'}} key={item.key}>
                                        <div style={{display:'flex'}}>
                                            <div>
                                                <CheckBox name={item.name} checked={this.state.checkedItems[item.name]} onChange={this.handleChange} />
                                            </div>
                                            <div>
                                                {item.name}
                                            </div>
                                        </div>
                                        <div style={{display:'flex'}}>
                                            <div><FaMapMarker style={{color:item.rub}}></FaMapMarker></div>
                                            <div><FaMapMarker style={{color:item.rec}}></FaMapMarker></div>
                                            <div><FaMapMarker style={{color:item.gre}}></FaMapMarker></div>
                                        </div>
                                    </div>
                                ))
                                }
                            </React.Fragment>
                            <div>
                                Container Type
                            </div>
                            <React.Fragment>
                                {
                                containercheckboxes.map(item => (
                                    <div style={{display:'flex', justifyContent: 'space-between'}} key={item.key}>

                                        <div style={{display:'flex'}}>
                                            <div>
                                                <CheckBox name={item.name} checked={this.state.checkedItems[item.name]} onChange={this.handleChange} />
                                            </div>
                                            <div>
                                                {item.name}
                                            </div>
                                        </div>
                                        <div style={{display:'flex'}}>
                                            {this.getIcon(item.name)}
                                        </div>
                                    </div>
                                ))
                                }
                            </React.Fragment>
                            <center><button style={{marginTop: '15px'}} onClick={this.props.addMarker} type="submit" className="btn btn-success">Add Marker</button></center>
                            <center><button style={{marginTop: '15px'}} onClick={this.props.onChange(this.state.checkedItems)} type="submit" className="btn btn-success">Update Map</button></center>
                                
                        </form>
                        
                    </div>   
            </div>
            
        )
       
    }
}
export default Menu

/**
 * <Header toggleMenu={this.toggleMenu} />
 * 
 * Slider code
 * 
 * 
 * <div>
                                <input name="wasteLevel" id="slider" value={this.state.value} onChange={this.sliderChange} min="0" max="100" className="slider" type="range"/>
    </div>


    Trash

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

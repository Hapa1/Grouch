import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import containers from '../../static/test';
import '../../static/Map.css';
import customStyle from '../../static/customStyle.json'
import '../../static/Modal.css';
import axios from 'axios';
import Menu from '../Menu';
import MarkerInfo from './MarkerInfo';
import ModalForm from './ModalForm'
import {ApolloProvider, graphql, withApollo, compose } from 'react-apollo';
import { getContainersQuery, getContainer, deleteContainerMutation  } from '../../queries/queries'
import Header from '../Header';
import ReactDOM from 'react-dom';
import Dashboard from '../Dashboard';
import { FaRegBell } from 'react-icons/fa';
import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

const mapStyles = {
  width: '100%',
  height: '100%',

};

const Control = () => {
  return (
    <div>

    </div>
  )
}

export class MapContainer extends Component {
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
    initMap["Selected"] = "Icon";
    initMap["ColorScheme"] = "Default";

    this.state = {
      menuActive: true,
      dashActive: false,
      showingInfoWindow: false,
      boxes: initMap, 
      activeMarker: {},
      selectedPlace: {},
      editing: false,
      lat: 0,
      lng: 0,
      cursor: 'crosshair'
    }

    this.handleChange = this.handleChange.bind(this);
    this.removeContainer = this.removeContainer.bind(this);
    this.updateContainer = this.updateContainer.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleDash = this.toggleDash.bind(this);
  }
  toggleDash() {
   
    var sideDash = document.getElementById('dashboard');
    
    if(this.state.dashActive){

      sideDash.style.animationName = "slideout2";
      sideDash.style.display = "block";
      sideDash.style.marginleft = "200%";
      sideDash.style.overflow = "hidden";

      this.setState({ dashActive: false});
  }
  else {

      sideDash.style.animationName = "slidein2"
      sideDash.style.marginleft = "50%";
      sideDash.style.overflow = "hidden";
     
      this.setState({ dashActive: true});
  }
  }
  toggleMenu() {
    var sideMenu = document.getElementById('sideMenu');
    if(this.state.menuActive){
  
        sideMenu.style.animationName = "slideout1";
        sideMenu.style.marginLeft = "-45%";
        this.setState({ menuActive: false});
    }
    else {
       
      
        sideMenu.style.animationName = "slidein1"
        sideMenu.style.display = "block";
        sideMenu.style.marginLeft = "0%";
        this.setState({ menuActive: true});
    }
    
  }

  handleChange = (param) => (e) => {

    e.preventDefault();
    
    this.setState({
      boxes: param,
    })
    console.log(this.state.boxes)
  }



  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
    

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  percentify = (level) => {
    return level + '%'
  }
  checkLevel = (level) => {
    
    if (level <= 25) {
      return 'https://s3-us-west-1.amazonaws.com/lootbox1/public/green.png'
    }
    else if (level > 25 && level <= 50) {
      return 'https://s3-us-west-1.amazonaws.com/lootbox1/public/yellow.png'
    }
    else if (level > 50 && level <= 75) {
      return 'https://s3-us-west-1.amazonaws.com/lootbox1/public/orange.png'
    }
    else if (level > 75 && level <= 100) {
      return 'https://s3-us-west-1.amazonaws.com/lootbox1/public/red.png'
    }

  }


  componentDidMount() {
    const percent = 250
    this.setState({ percent });
    //axios.get('http://ec2-54-245-184-179.us-west-2.compute.amazonaws.com/trash_level')
    //  .then(res => {
    //    console.log(res.data)
    //    const percent = res.data;
    //    console.log(percent)
    //    percent = 50
    //    this.setState({ percent });
    //  })
  }

  addMarker = (e) => {
    e.preventDefault();
    //var map = document.getElementById('map');
    //map.style.cursor = "pointer";
    this.setState({
      editing: true,
      cursor: 'crosshair',
    })
  }

  handleClickedMap = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    if (this.state.editing == true){
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
      this.setState({lat,lng})
  
    }
  }

  removeContainer(e) {
    e.preventDefault()
   
    var id = e.target.id
 
    this.setState({
      showingInfoWindow: false,
    })
    this.props.deleteContainerMutation({
    variables: { id },
    refetchQueries: [{query: getContainersQuery}]
    });
    
  }

  updateContainer(e) {
    e.preventDefault()
    console.log(this.props)
    var id = e.target.name
    //this.props.getContainer({
    //  variables: { id },
    // refetchQueries: [{query: getContainersQuery}]
    //});

    this.props.getContainer.variables = { id }
    console.log(this.props.getContainer.variables)
    this.props.getContainer.refetch()
    
    //data.refetch()
    //console.log(data.containers)
  }

  onClickClose() {
      var modal = document.getElementById('myModal');
      modal.style.display = "none";
  }

  onClickAnywhere(e) {
      var modal = document.getElementById('myModal');
      if (e.target.id == 'myModal'){
          modal.style.display = "none";
      }
  }

  getCircleSize(c,level){
    if(c.ctype == 'Can'){
      var size = 14 + level * 1 * .01
      return size+'px'
    }
    if(c.ctype == 'Bin'){
      
      var size = 17 + level * 1.5 * .01
      return size+'px'
    }
    if(c.ctype == 'Dumpster'){
      
      var size = 19 + level * 5 * .01
      return size+'px'
    }

  }

  getLabel(c,currentLevel) {
    var level = (c.emptyLevel - c.wasteLevels[c.wasteLevels.length-1])
    
    var label = {
      fontFamily: '"Font Awesome 5 Free"',
      text: "\uf041",
      color: this.getRGB(c.type,currentLevel),
      fontSize: '24px',
      fontWeight: '900',
    }
    if (this.state.boxes["ColorScheme"] == 'Default'){
      label.color = this.getRGB(c.type,currentLevel)
      
    }
    if (this.state.boxes["ColorScheme"] == 'Alt'){
      var percent = currentLevel = ((c.emptyLevel - c.wasteLevels[c.wasteLevels.length-1])/(c.emptyLevel))*100

      var a = 80 + ((30 - 81) * percent/100)
      //var b = 3
      label.color = `hsla(8, ${a}%, ${a}%, 1)`
      console.log(label.color)
      //hsla(8, 46%, 43%, 1)
    }
    if (this.state.boxes["Selected"] == 'Icon'){
      if(c.ctype == 'Can'){
        label.text = "\uf2ed"
        label.fontSize = '18px'
      }
      if(c.ctype == 'Bin'){
        label.text = "\uf1f8"
        label.fontSize = '21px'
      }
      if(c.ctype == 'Dumpster'){
        label.text = "\uf793"
        label.fontSize = '24px'
      }
      
    }
    if (this.state.boxes["Selected"] == 'Marker'){
      label.text = "\uf041"
      label.fontSize = '21px'
    }
    if (this.state.boxes["Selected"] == 'Circle'){
      label.text = "\uf111"
      label.fontSize = this.getCircleSize(c,level)
    }
    return label
  }

  onInfoWindowOpen(props, e) {
    const info = (
      <ApolloProvider client={client}>
        <MarkerInfo onUpdate={this.updateContainer} onRemove={this.removeContainer} container={this.state.selectedPlace}/>
      </ApolloProvider>
    );
    ReactDOM.render(
        React.Children.only(info),
        document.getElementById("iwc")
    );
  }

  getRGB(type,level){

    if (type == 'Solid Rubbish'){

      var color = `hsla(34, 100%,  ${70-level/2}%)`
      return color

    }
    if (type == 'Green Waste'){
      var color = `hsla(140, 74%,  ${75-level/1.75}%)`
      return color
    }
    if (type == 'Recyclables'){
      var color = `hsla(183, 90%,  ${60-level/2.5}%)`
      return color
    }
  }

  getChecks() {
    var displayedContainers = []
    
    for (var key in this.state.boxes){
            
      if (this.state.boxes[key] == true){
        displayedContainers.push(key)
      }
    }
    
    return displayedContainers
  }

  checkRange(ranges, percent){
    for(var i = 0; i < ranges.length; i++){
      if(percent > ranges[i][0] && percent <= ranges[i][1]){
        
        return true;
      }
    }
    return false;
  }

  render() {
    var displayedContainers = this.getChecks()
    var ranges = []
    if(displayedContainers.includes("Low")){
      ranges.push([0,25])
    }
    if(displayedContainers.includes("Moderate")){
      ranges.push([25,50])
    }
    if(displayedContainers.includes("High")){
      ranges.push([50,75])
    }
    if(displayedContainers.includes("Critical")){
      ranges.push([75,100])
    }
    const markers = []
    var i = 0
    var data = this.props.getContainersQuery

    if(data.loading || !data.containers){
    }
      
    else {
      var containers = data.containers
      console.log(containers[2].name, containers[2].wasteLevels)
      containers.forEach((c) => {
        var currentLevel = ((c.emptyLevel - c.wasteLevels[c.wasteLevels.length-1])/(c.emptyLevel))*100
        
        //const url = this.checkLevel(currentLevel)
        
        //if(this.state.boxes){
          
        //}
        
        if(
        displayedContainers.includes(c.type)
        && this.checkRange(ranges,currentLevel)
        ){
          var percent = this.percentify(currentLevel)
         
          markers.push(
            <Marker
              ctype = {c.ctype}
              icon=' '
              key={c.id}
              onClick={this.onMarkerClick}
              name={c.name}
              description={c.description}
              url={c.imgUrl}
              id={c.id}
              level={percent}
              percent={this.state.percent}
              address={c.address}
              city={c.city}
              owner={c.owner}
              type={c.type}
              lat = {c.lat}
              lng = {c.lng}
              label = { this.getLabel(c,currentLevel)
              }
              //labelContent = {'<i class="fa fa-send fa-3x" style="color:rgba(153,102,102,0.8);"></i>'}
              position={{
                lat: c.lat,
                lng: c.lng
              }}
            />);
        }
        
        i = i + .010
      });
   
    }
    
    
    
    
    return (
      <div>
        <div>
              <div onClick={this.onClickAnywhere} id="myModal" className="modal">
                <div className="modal-content" style={{marginTop: '200px'}}>
                  <span onClick={this.onClickClose} className="close">&times;</span>
                  <ModalForm lng={this.state.lng} lat={this.state.lat}></ModalForm>
                </div>
              </div>
        </div>
        <Menu addMarker={this.addMarker} onChange={this.handleChange} value={this.state.boxes}/>
        
        <Header toggleDash={this.toggleDash} toggleMenu={this.toggleMenu} className="headerDisplay"/>
        <Dashboard></Dashboard>
        <Map
            className="mapStyle"
            cursor={this.state.cursor}
            onClick={this.handleClickedMap}
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            mapTypeControl={false}
            streetViewControl={false}
            styles={customStyle}
            initialCenter={{
              lat: 37.3352,
              lng: -121.8811
            }}
        >
          {markers}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
            
            onOpen={e => {
              this.onInfoWindowOpen(this.props, e);
            }}
          >
          <div id="iwc"/>
            </InfoWindow>
        </Map>  
      </div>
    );
  }
}

MapContainer = compose(
  graphql(getContainersQuery, { name: "getContainersQuery"}),
  graphql(getContainer, { name: "getContainer"}),
  graphql(deleteContainerMutation, { name: "deleteContainerMutation"})
)(MapContainer);

//MapContainer = graphql(getContainersQuery)(MapContainer);

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDnBifHmtNb87N7huYJyhNIZyFd5gP4zyI')
})(MapContainer)

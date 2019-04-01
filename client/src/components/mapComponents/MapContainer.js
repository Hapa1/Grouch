import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import containers from '../../static/test';
import '../../static/Map.css';
import customStyle from '../../static/customStyle.json'
import '../../static/Modal.css';
import axios from 'axios';
import Menu from '../Menu';
import Mark from './Marker';
import Modal from './Modal';
import MarkerInfo from './MarkerInfo';
import ModalForm from './ModalForm'
import { graphql } from 'react-apollo';
import { getContainersQuery } from '../../queries/queries'
import ReactDOM from 'react-dom';

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

    this.state = {
      showingInfoWindow: false,
      boxes: initMap, 
      activeMarker: {},
      selectedPlace: {},
      editing: false,
      lat: 0,
      lng: 0,
      cursor: 'crosshair'
    }
    console.log(initMap)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (param) => (e) => {
    e.preventDefault();
    
    this.setState({
      boxes: param,
    })
    console.log(this.state)
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
    console.log("marker1")
  }

  handleClickedMap = (t, map, coord) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    if (this.state.editing == true){
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
      this.setState({lat,lng})
      console.log(lat,lng)
    }
  }

  removeContainer() {
    console.log("remove")
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

  onInfoWindowOpen(props, e) {
    const info = (
        <MarkerInfo container={this.state.selectedPlace}/>
    );
    ReactDOM.render(
        React.Children.only(info),
        document.getElementById("iwc")
    );
    console.log("openeded")
  }


  render() {
    const markers = []
    var i = 0
    var data = this.props.data
    if(data.loading || !data.containers){
    }
      
    else {
      var containers = data.containers
      containers.forEach((c) => {
        var currentLevel = c.wasteLevels[c.wasteLevels.length-1]
        const url = this.checkLevel(currentLevel)
        var displayedContainers = []
        if(this.state.boxes){
          for (var key in this.state.boxes){
            if (this.state.boxes[key] == true){
              displayedContainers.push(key)
            }
          }
        }
        if(displayedContainers.includes(c.type)){
          var percent = this.percentify(currentLevel)
          markers.push(
            <Marker
              icon={url}
              key={c._id}
              onClick={this.onMarkerClick}
              name={c.name}
              description={c.description}
              url={c.url}
              id={c._id}
              level={percent}
              percent={this.state.percent}
              address={c.address}
              city={c.city}
              owner={c.owner}
              type={c.type}
              lat = {c.lat}
              lng = {c.lng}
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
        <button onClick={this.addMarker} className="btn btn-success">Add Marker</button>
    
        <div> 
            <div onClick={this.onClickAnywhere} id="myModal" className="modal">
            <div className="modal-content" style={{marginTop: '200px'}}>
                <span onClick={this.onClickClose} className="close">&times;</span>
            <ModalForm lng={this.state.lng} lat={this.state.lat}></ModalForm>
            </div>
            </div>
        </div>
        
        
        
        </div>
        <Menu onChange={this.handleChange} value={this.state.boxes}></Menu>

        <Map
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

MapContainer = graphql(getContainersQuery)(MapContainer);

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDnBifHmtNb87N7huYJyhNIZyFd5gP4zyI')
})(MapContainer)

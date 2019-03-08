import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import containers from '../static/test';
import '../static/Map.css';
import customStyle from '../static/customStyle.json'
import axios from 'axios';

const mapStyles = {
  width: '100%',
  height: '100%',
  
};

const Control = () => {
  return(
    <div>
      
    </div>
  )
}

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    percent: 0
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  percentify = (container) => {
    return container.level + '%'
  }
  checkLevel = (container) => {
    const level = container.level
    if(level <= 25){
      return 'https://s3-us-west-1.amazonaws.com/lootbox1/public/green.png'
    }
    else if(level > 25 && level <= 50 ){
      return 'https://s3-us-west-1.amazonaws.com/lootbox1/public/yellow.png'
    }
    else if(level > 50 && level <= 75 ){
      return 'https://s3-us-west-1.amazonaws.com/lootbox1/public/orange.png'
    }
    else if(level > 75 && level <= 100 ){
      return 'https://s3-us-west-1.amazonaws.com/lootbox1/public/red.png'
    }

  }
  componentDidMount() {
    const percent = 250
    this.setState({ percent });
    axios.get('http://ec2-54-245-184-179.us-west-2.compute.amazonaws.com/trash_level')
      .then(res => {
        console.log(res.data)
        const percent = res.data;
        console.log(percent)
        percent = 50
        this.setState({ percent });
      })
  }

  render() {
    
    const markers = []
    var i = 0
    containers.forEach((c) => {
      const l = this.state.percent 
      const url = this.checkLevel(l)
      const level = this.percentify(l)
      console.log(l)
      console.log(this.state)
      markers.push(
      <Marker
        icon={url}
        key={c._id}
        onClick={this.onMarkerClick}
        name={c.name}
        description={c.description}
        url={c.url}
        id={c._id}
        level={l}
        percent={this.state.percent}
        address={c.address}
        city={c.city}
        owner={c.owner}
        type={c.type}
        position = {{
          lat: 37.3356,
          lng: -121.885
         }}
      />);
      i = i + .010
    });
    const container = this.state.selectedPlace
    return (
      
      <Map
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
        >
          
          <div>
            
            <div className="mapContainer">
              <div>
                <img width="128" height="128" src={this.state.selectedPlace.url}></img>
              </div>
              <div className="description">
                <div className="titleContainer">
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                  </div>
                  <div className="id">
                    <h5><span className="badge badge-secondary">{this.state.selectedPlace.id}</span></h5>
                  </div>
                  <div style={{marginLeft:"1rem"}}>
                    <button type="button" className="btn btn-outline-success"><i class="fas fa-sync-alt"></i></button>
                  </div>
                </div>
                <div>
                  <h6>{container.type}</h6>
                </div>
                <div className="progress" style={{marginBottom: ".5rem"}}>
                  <div className="progress-bar bg-success progress-bar-striped" style={{width: this.state.selectedPlace.level}}></div>
                </div>
                <div>
                  {container.address} {container.city}
                </div>
                <div>
                  {container.owner}
                </div>
                
              </div>
            </div>
            <div className="footerContainer">

                <div>
                <button type="button" className="details btn btn-outline-success">Details</button>
                </div>
                <div>
                <button type="button" className="btn btn-outline-success">Edit</button>
                </div>
                <div>
                  <button type="button" className="btn btn-outline-success">Remove</button>
                </div>
              </div>

          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDnBifHmtNb87N7huYJyhNIZyFd5gP4zyI')
})(MapContainer)

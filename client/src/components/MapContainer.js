import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import containers from '../static/test';
import '../static/Map.css';
import customStyle from '../static/customStyle.json'

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
    selectedPlace: {}
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


  render() {
    const markers = []
    var i = 0
    containers.forEach((c) => {
    
      markers.push(
      <Marker
        icon={'https://cdn4.iconfinder.com/data/icons/6x16-free-application-icons/16/Trash.png'}
        key={c._id}
        onClick={this.onMarkerClick}
        name={c.name}
        description={c.description}
        url={c.url}
        id={c._id}
        level={c.level}
        address={c.address}
        city={c.city}
        owner={c.owner}
        type={c.type}
        position = {{
          lat: 37.3300 + i,
          lng: -121.8811
        }}
      />);
      i = i + .010
    });
    const container = this.state.selectedPlace
    return (
      
      <Map
        google={this.props.google}
        mapTypeControl={false}
        streetViewControl={false}
        zoom={14}
        style={mapStyles}
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
                    <h5><span class="badge badge-secondary">{this.state.selectedPlace.id}</span></h5>
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
            <button type="button" class="btn btn-success">Details</button>
            <button type="button" class="btn btn-success">Edit</button>
            <button type="button" class="btn btn-success">Remove</button>
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
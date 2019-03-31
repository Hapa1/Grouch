import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import containers from '../../static/test';
import '../../static/Map.css';
import customStyle from '../../static/customStyle.json'
import axios from 'axios';
import Menu from '../Menu';
import MarkerInfo from './MarkerInfo';
import { getContainersQuery } from '../../queries/queries'

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

    this.state = {
      showingInfoWindow: false,
      boxes: null, 
      activeMarker: {},
      selectedPlace: {},
      percent: 0
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (param) => (e) => {
    e.preventDefault();
    this.setState({
      boxes: param,
    })
    console.log(this.state)
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

  render() {
    const markers = []
    var i = 0
    containers.forEach((c) => {
      const percentLevel = this.state.percent
      const url = this.checkLevel(c)
      var displayedContainers = []
      if(this.state.boxes){
        for (let [k,v] of this.state.boxes){
          if (v == true){
            displayedContainers.push(k)
          }
          
        }
      }
      console.log(displayedContainers)
      markers.push(
        <Marker
          icon={url}
          key={c._id}
          onClick={this.onMarkerClick}
          name={c.name}
          description={c.description}
          url={c.url}
          id={c._id}
          level={percentLevel}
          percent={this.state.percent}
          address={c.address}
          city={c.city}
          owner={c.owner}
          type={c.type}
          position={{
            lat: 37.3356,
            lng: -121.885
          }}
        />);
      i = i + .010
    });
    const container = this.state.selectedPlace
    return (
      <div>
        <Menu onChange={this.handleChange} value={this.state.boxes}></Menu>

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
            <MarkerInfo
              container={this.state.selectedPlace}
            />
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDnBifHmtNb87N7huYJyhNIZyFd5gP4zyI')
})(MapContainer)

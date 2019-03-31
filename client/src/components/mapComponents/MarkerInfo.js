import React, { Component } from 'react';
class MarkerInfo extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        var container = this.props.container
        return (
        <div>
             
            
            <div className="mapContainer">
              <div>
                <img width="128" height="128" src={container.url}></img>
              </div>
              <div className="description">
                <div className="titleContainer">
                  <div>
                    <h4>{container.name}</h4>
                  </div>
                  <div className="id">
                    <h5><span className="badge badge-secondary">{container.id}</span></h5>
                  </div>
                  <div style={{marginLeft:"1rem"}}>
                    <button type="button" className="btn btn-outline-success"><i className="fas fa-sync-alt"></i></button>
                  </div>
                </div>
                <div>
                  <h6>{container.type}</h6>
                </div>
                <div className="progress" style={{marginBottom: ".5rem"}}>
                  <div className="progress-bar bg-success progress-bar-striped" style={{width: container.level}}></div>
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
        );
    }
}

export default MarkerInfo;
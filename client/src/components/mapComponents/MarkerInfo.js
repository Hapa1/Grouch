import React, { Component, Fragment  } from 'react';
import { Query, graphql, withApollo, compose } from 'react-apollo';
import { getContainersQuery, getContainer, deleteContainerMutation  } from '../../queries/queries'


class MarkerInfo extends Component {

    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.updateContainer= this.updateContainer.bind(this);
        this.state = {
          level: this.props.container.level,
          refetch: false
        }
    }

    handleClick(e) {
      console.log("remove!")
      var container = this.props.container
      //this.props.deleteContainerMutation({
      //  variables: {
      //    id: this.props.container.id
      //  }
      //})
    }
    /** 
    updateContainer(e) {
      e.preventDefault()
      var id = e.target.name
      //this.props.getContainer({
      //  variables: { id },
      // refetchQueries: [{query: getContainersQuery}]
      //});
      console.log(this.props)
      console.log(this.props.getContainersQuery)
      //if (this.state.refetch == true){
      //  var data = this.props.getContainersQuery.refetch() 
      //}
      //else {
        var data = this.props.getContainersQuery
      //  this.state.refetch = true
      //}
      var level = (data.containers[2].emptyLevel - data.containers[2].wasteLevels[data.containers[2].wasteLevels.length-1]) + '%'
      console.log(data.containers[2].wasteLevels[0])
      this.setState({
        level
      });
      console.log(this.state)
      console.log(data.containers[2].wasteLevels)
    }
*/

    updateContainer(e) {
      
      
      e.preventDefault()
      this.props.getContainersQuery.refetch().then( (response) => {
        for (var i = 0; i < response.data.containers.length; i++){
          
          if (this.props.container.id == response.data.containers[i].id){
            var level = (response.data.containers[i].emptyLevel - response.data.containers[i].wasteLevels[response.data.containers[i].wasteLevels.length-1]) + '%'
          }
        }
        this.setState({
          level
        });
      })
    }
    render() {
        
        //var data = this.props.getContainersQuery
        const level = this.state.level
        var container = this.props.container
        return (
        <Fragment>
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
                    <button name={container.id} onClick={this.updateContainer} type="button" className="btn btn-outline-success"><i className="fas fa-sync-alt"></i></button>
                  </div>
                </div>
                <div>
                  <h6>{container.ctype} of {container.type}</h6>
                </div>
                
                <div className="progress" style={{marginBottom: ".5rem"}}>
                  <div className="progress-bar bg-success progress-bar-striped" style={{width: level}}></div>
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
                <div >
                    <button id={container.id} onClick={this.props.onRemove} type="button" className="btn btn-outline-success">Remove</button>
                </div>
              </div>
        </div>
        </Fragment>
        );
    }
}



MarkerInfo = compose(
  graphql(getContainersQuery, { name: "getContainersQuery"}),
  graphql(getContainer, { name: "getContainer"}),
  graphql(deleteContainerMutation, { name: "deleteContainerMutation"})
)(MarkerInfo);
export default MarkerInfo;
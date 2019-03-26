import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getContainersQuery } from '../queries/queries'
import Line from './charts/line';

class Dashboard extends Component {

    displayContainers(){
        var data = this.props.data;
        if(data.loading){
            return( <div>
                loading...
            </div>)
        } else {
            return data.containers.map(container => {
                return(
                    <div>
                        <li key={ container.id }>
                        {container.name}
                        </li>
                    </div>
                    
                )
            });
            
        }
    }
    render() {
        return (
        <div>
            My graph
            <Line></Line>
        </div>
        
        );
    }
    }

export default graphql(getContainersQuery)(Dashboard);

//<ul id="container-list">
//    {this.displayContainers()}
//</ul>
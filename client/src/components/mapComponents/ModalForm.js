import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addContainerMutation, getContainersQuery } from '../../queries/queries';

class ModalForm extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            fields: {},
            errors: {},
            lat: props.lat,
            lng: props.lng,
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let valid = true;
        if(!fields["name"]){
            valid = false;
            errors["name"] = "Cannot be empty";
        }
        if(!fields["type"]){
            valid = false;
            errors["type"] = "Cannot be empty";
        }
        this.setState({errors});
        return valid
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.handleValidation()){
            console.log(this.props)
            console.log(this.state)
            this.props.addContainerMutation({ //addContainerMutation from export default compose 
                variables: {
                    name: this.state.name,
                    type: this.state.type,
                    lat: this.props.lat,
                    lng: this.props.lng,
                },
                refetchQueries: [{query: getContainersQuery}]
            })
            var modal = document.getElementById('myModal');
            modal.style.display = "none";
        }
        else {
            console.log("error!")
        }
        
    }

    render() {
    
    return (
        <form onSubmit={this.handleSubmit}>
        <div>
            <label>
                Name:
                <input onChange={this.handleChange.bind(this, "name")} type="text" name="name"/>
            </label>
            {this.state.errors["name"]}
        </div>
        <div>
            <label>
                Type:
                <input onChange={this.handleChange.bind(this, "type")} type="text" name="type"/>
            </label>
            {this.state.errors["type"]}
        </div>
                <input type="submit" value="Submit" />
        </form>
    );
  }
}

export default compose(
    graphql(addContainerMutation, { name: "addContainerMutation" })
)(ModalForm);
import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addContainerMutation, getContainersQuery } from '../../queries/queries';
import '../../static/ModalForm.css';

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
        if(!fields["id"]){
            valid = false;
            errors["id"] = "Cannot be empty";
        }
        if(!fields["ctype"]){
            valid = false;
            errors["ctype"] = "Cannot be empty";
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
            this.props.addContainerMutation({ //addContainerMutation from export default compose 
                variables: {
                    name: this.state.name,
                    type: this.state.type,
                    ctype: this.state.ctype,
                    id: this.state.id,
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
        <div className="formFlex">
            <div style={{marginTop:'35px', marginLeft:'25px',marginRight:'100px'}}>
                <div style={{marginTop:'10px'}}  >
                    
                    <div>Device ID</div>
                    <div><input onChange={this.handleChange.bind(this, "id")} type="text" name="id"/></div>
                    
                    {this.state.errors["id"]}
                </div>
                <div style={{marginTop:'10px'}} >
                    <div>Add a Friendly Name</div>
                        
                    <div><input onChange={this.handleChange.bind(this, "name")} type="text" name="name"/>
                    </div>

                    {this.state.errors["name"]}
                </div>
                <div style={{marginTop:'15px'}}>
                    <center><input type="submit" className="btn btn-success" value="Submit" /></center>
                </div>
            </div>
            
        <div>
            <div>
                <label>
                    Waste Type
                    <label class="container">
                        <input onChange={this.handleChange.bind(this, "type")} type="radio" name="type" value="Solid Rubbish"/>Solid Rubbish
                        <span className="checkmark"></span>
                    </label>
                    <label class="container">
                        <input onChange={this.handleChange.bind(this, "type")} type="radio" name="type" value="Green Waste"/> Green Waste
                        <span className="checkmark"></span>
                    </label>
                    <label class="container">
                        <input onChange={this.handleChange.bind(this, "type")} type="radio" name="type" value="Recyclables"/>Recyclables
                        <span className="checkmark"></span>
                    </label>
                </label>
                {this.state.errors["type"]}
            </div>
            <div>
                <label>
                    Container Type
                    <label class="container">
                        <input onChange={this.handleChange.bind(this, "ctype")} type="radio" name="ctype" value="Can"/>Can
                        <span className="checkmark"></span>
                    </label>
                    <label class="container">
                        <input onChange={this.handleChange.bind(this, "ctype")} type="radio" name="ctype" value="Bin"/>Bin
                        <span className="checkmark"></span>
                    </label>
                    <label class="container">
                        <input onChange={this.handleChange.bind(this, "ctype")} type="radio" name="ctype" value="Dumpster"/>Dumpster
                        <span className="checkmark"></span>
                    </label>
                    {this.state.errors["ctype"]}
                </label>
            </div>
        </div>
        </div>
                
        </form>
    );
  }
}

export default compose(
    graphql(addContainerMutation, { name: "addContainerMutation" })
)(ModalForm);
import React, { Component } from 'react';
import '../../static/Modal.css';
import ModalForm from './ModalForm'

class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            placeMarker: true,
        }
    
        this.onClickOpen = this.onClickOpen.bind(this);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickAnywhere = this.onClickAnywhere.bind(this);
    }

    onClickOpen() {
        console.log(this.props)
        if (this.state.placeMarker == true){
            console.log("blocked")
        }
        else {
            var modal = document.getElementById('myModal');
            modal.style.display = "block";
            
        }
        
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
    
    render() {
        console.log(this.state)
        return (
        <div> 
            <button onClick={this.onClickOpen} className="btn btn-success">Add Marker</button>
            <div onClick={this.onClickAnywhere} id="myModal" className="modal">
            <div className="modal-content" style={{marginTop: '200px'}}>
                <span onClick={this.onClickClose} className="close">&times;</span>
                <ModalForm></ModalForm>
            </div>
            </div>
        </div>
        );
    }
}

export default Modal;

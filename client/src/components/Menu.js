import React, { Component } from 'react';
import '../static/Menu.css';

export class Menu extends Component {


    render() {
        return (
            <div class="down">
                <button class="btn">MENU</button>
                <div class="down-content">
                <div class="form-check">
                <div>
                    <label class="form-check-label" for="check1">
                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"/>Solid Rubbish
                    </label>
                </div>
                <div>
                <label class="form-check-label" for="check2">
                   
                    <input type="checkbox" class="form-check-input" id="check2" name="option2" value="something"/>Recyclables
                    
                </label>
                </div>
                <div>
                <label class="form-check-label" for="check3">
                    
                    <input type="checkbox" class="form-check-input" id="check3" name="option3" value="something"/>Organic Waste
                </label>
                </div>
                </div>

                </div>
            </div>
            
        )
       
    }
}
export default Menu
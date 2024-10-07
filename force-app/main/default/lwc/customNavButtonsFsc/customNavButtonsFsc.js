/*
 * customNavButtonsFsc LWC is used to replace the standard footer within a flow. Rather than navigating 
 * back, both buttons navigate next but pass the action being performed as an output to the flow. 
 * A decision element can then be used to validate and route the flow accordingly. This gets around 
 * problems when navigating back sometimes where values aren't cleared out from variables properly.
 *
 * DISCLAIMER: This is sample code only released under the CC0.
 * It is not of production quality, and is not warranted for quality or fitness 
 * for purpose by me or my employer.
*/

import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class CustomNavButtonsFsc extends LightningElement {

    // Inputs
    @api leftButtonsInput;
    @api centerButtonsInput;
    @api rightButtonsInput;

    @api renderButtons = false;

    // Outputs
    _action;
    @api get action() {
        return this._action;
    }
    set action(value) {
        this._action = value;
        this.dispatchEvent(new FlowNavigationNextEvent());
    }

    // Screen
    get leftButtons() {
        return this.buildButtonData(this.leftButtonsInput);
    }
    get centerButtons() {
        return this.buildButtonData(this.centerButtonsInput);
    }
    get rightButtons() {
        return this.buildButtonData(this.rightButtonsInput);
    }


    handleAction(event) {
        console.log('** Custom Footer Action Clicked');
        const action = event.currentTarget.dataset.action;
        console.log('Action: ' + action);
        this.dispatchEvent(new FlowAttributeChangeEvent('action', action));
    }

    buildButtonData(buttonsInput) {
        let buttonOutput = [];
        if(buttonsInput) {
            const buttons = buttonsInput.split(',');
            buttons.forEach((buttonInput, index) => {
                buttonInput = buttonInput.trim();
                const buttonParts = buttonInput.split('|');
                if(buttonParts.length >= 2) {
                    let button = {
                        label: buttonParts[0].trim(),
                        action: buttonParts[1].trim(),
                        num: index
                    };
                    button.className = (index > 0) ? 'slds-m-left_xx-small nav-button' : 'nav-button';
                    button.variant = (buttonParts[2] && buttonParts[2].trim()) ? buttonParts[2].trim() : 'neutral';
                    button.icon = (buttonParts[3] && buttonParts[3].trim()) ? buttonParts[3].trim() : '';
                    button.iconPosition = (buttonParts[4] && buttonParts[4].trim()) ? buttonParts[4].trim() : '';
                    buttonOutput.push(button);
                }
            });
        }
        return buttonOutput;
    }

}
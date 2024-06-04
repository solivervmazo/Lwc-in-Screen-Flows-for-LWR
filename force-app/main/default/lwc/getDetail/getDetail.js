import { LightningElement, api } from "lwc";
import {
  FlowAttributeChangeEvent,
  FlowNavigationNextEvent
} from "lightning/flowSupport";
export default class GetDetail extends LightningElement {
  _firstName;
  _lastName;
  @api firstName = "";
  @api lastName = "";
  @api
  availableActions = [];
  hasError;

  @api
  validate() {
    this.hasError = !this.firstName || !this.lastName;
    return {
      isValid: !this.hasError,
      errorMessage: this.hasError ? "All fields required" : ""
    };
  }

  handleChange(event) {
    const field = event.target.name;
    const _field = `_${field}`;
    this[_field] = event.target.value;
    this.notifyFlow(field, this[_field]);
  }

  notifyFlow(prop, val) {
    const attributeChangeEvent = new FlowAttributeChangeEvent(prop, val);
    this.dispatchEvent(attributeChangeEvent);
  }

  handleGoNext() {
    // check if NEXT is allowed on this screen
    if (this.availableActions.find((action) => action === "NEXT")) {
      // navigate to the next screen
      const navigateNextEvent = new FlowNavigationNextEvent();
      this.dispatchEvent(navigateNextEvent);
    }
  }
}

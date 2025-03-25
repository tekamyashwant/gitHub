import { LightningElement } from "lwc";

export default class ConditionalRendering extends LightningElement {
  displayMessage = false;
  changeHandler(event) {
    this.displayMessage = !this.displayMessage;
  }
}

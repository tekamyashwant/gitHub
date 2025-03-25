import { LightningElement } from "lwc";

export default class ParentCustomEvent extends LightningElement {
  displayMessage = false;
  displaymsgHandler(event) {
    this.displayMessage = !this.displayMessage;
  }
}

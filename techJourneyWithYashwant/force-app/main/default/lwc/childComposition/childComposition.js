import { LightningElement } from "lwc";

export default class ChildComposition extends LightningElement {
  clickHandler(event) {
    let cusEve = new CustomEvent("fire", {
      composed: false,
      bubbles: false
    });
    this.dispatchEvent(cusEve);
  }
}

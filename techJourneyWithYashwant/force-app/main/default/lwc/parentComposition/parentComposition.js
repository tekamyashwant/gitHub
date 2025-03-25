import { LightningElement } from "lwc";

export default class ParentComposition extends LightningElement {
  fireChildHandler(event) {
    console.log("Event Handled at Parent - at child level");
  }

  fireDivChildHandler(event) {
    console.log("Event Handled at Parent Div - at child level");
  }
}

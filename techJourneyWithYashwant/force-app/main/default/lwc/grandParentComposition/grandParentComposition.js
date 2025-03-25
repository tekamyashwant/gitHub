import { LightningElement } from "lwc";

export default class GrandParentComposition extends LightningElement {
  fireParentHandler(event) {
    console.log("Event Handled at GrandParent - at parent level");
  }
}

import { LightningElement } from "lwc";

export default class ChildCustomEvent extends LightningElement {
  showLabel = "Show Message";
  clickHandler(event) {
    this.showLabel =
      this.showLabel === "Hide Message" ? "Show Message" : "Hide Message";
    let myCustomEve = new CustomEvent("displaymsg");
    this.dispatchEvent(myCustomEve);
  }
}

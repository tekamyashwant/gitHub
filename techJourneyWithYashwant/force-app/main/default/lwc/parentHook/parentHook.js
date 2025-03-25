import { LightningElement } from "lwc";

export default class ParentHook extends LightningElement {
  invokeChild;
  constructor() {
    super();
    console.log("Constructor of Parent");
  }

  connectedCallback() {
    console.log("Connected Callback of Parent");
  }

  renderedCallback() {
    console.log("Rendered Callback of Parent");
  }

  disconnectedCallback() {
    console.log("Disconnected Callback of Parent");
  }

  errorCallback(error, stack) {
    console.log("error", error);
    console.log("Stack Callback of Parent", stack);
  }

  changeHandler(event) {
    this.invokeChild = event.target.checked;
  }
}

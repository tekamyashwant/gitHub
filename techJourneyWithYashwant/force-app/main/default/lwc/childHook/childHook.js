import { LightningElement } from "lwc";

export default class ChildHook extends LightningElement {
  constructor() {
    super();
    console.log("Constructor of ChildHook");
  }

  connectedCallback() {
    console.log("Connected Callback of ChildHook");
    throw new Error("Error thrown in ChildHook connectedCallback() method");
  }

  renderedCallback() {
    console.log("Rendered Callback of ChildHook");
  }

  disconnectedCallback() {
    console.log("Disconnected Callback of ChildHook");
  }

  errorCallback(error, stack) {
    console.log("Error Callback of ChildHook", error);
    console.log("Stack Callback of ChildHook", stack);
  }
}

import { api, LightningElement } from "lwc";
import { FlowAttributeChangeEvent } from "lightning/flowSupport";
export default class LwcFlowDemo extends LightningElement {
  @api inputName;
  changeHandler(event) {
    this.inputName = event.target.value;
    const attributeChangeEvent = new FlowAttributeChangeEvent(
      "inputName",
      this.inputName
    );
    this.dispatchEvent(attributeChangeEvent);
  }
}

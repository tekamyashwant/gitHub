import { api, LightningElement } from "lwc";
import { FlowAttributeChangeEvent } from "lightning/flowSupport";
export default class Calculatorflow extends LightningElement {
  @api numberone;
  @api numbertwo;
  @api outputResult;
  clickHandler(event) {
    let name = event.target.name;
    if (name === "add") {
      this.outputResult = Number(this.numberone) + Number(this.numbertwo);
    } else if (name === "sub") {
      this.outputResult = Number(this.numberone) - Number(this.numbertwo);
    } else if (name === "mul") {
      this.outputResult = Number(this.numberone) * Number(this.numbertwo);
    } else if (name === "div") {
      this.outputResult = Number(this.numberone) / Number(this.numbertwo);
    }
    const attributeChangeEvent = new FlowAttributeChangeEvent(
      "outputResult",
      this.outputResult
    );
    this.dispatchEvent(attributeChangeEvent);
  }
}

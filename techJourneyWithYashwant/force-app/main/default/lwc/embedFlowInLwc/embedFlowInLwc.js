import { api, LightningElement } from "lwc";

export default class EmbedFlowInLwc extends LightningElement {
  @api recordId;

  get inputVariables() {
    return [
      { name: "accountId", type: "String", value: this.recordId },
      { name: "operationType", type: "String", value: "Create Contact" }
    ];
  }

  handleFlowStatusChange(event) {
    if (event.detail.status === "FINISHED") {
      for (let i = 0; i < event.detail.outputVariables.length; i++) {
        let outputVariable = event.detail.outputVariables[i];
        if (outputVariable.name === "accountIdOutput") {
          console.log("this.recordId", outputVariable.value);
        }
        if (outputVariable.name === "operationTypeOutput") {
          console.log("operationType", outputVariable.value);
        }
      }
    }
  }
}

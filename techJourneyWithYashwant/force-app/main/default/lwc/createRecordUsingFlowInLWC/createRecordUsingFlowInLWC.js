import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class CreateRecordUsingFlowInLWC extends LightningElement {
  statusChangeHandler(event) {
    if (event.detail.status === "FINISHED") {
      const showEvent = new ShowToastEvent({
        title: "Success",
        message: "Record Created Successfully",
        variant: "success"
      });
      this.dispatchEvent(showEvent);
    }
  }
}

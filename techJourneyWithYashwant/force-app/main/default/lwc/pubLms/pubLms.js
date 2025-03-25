import { LightningElement, wire } from "lwc";
import recordSelected from "@salesforce/messageChannel/pubSubData__c";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { MessageContext, publish } from "lightning/messageService";
export default class PubLms extends LightningElement {
  @wire(MessageContext)
  msgContext;

  clickHandler(event) {
    publish(this.msgContext, recordSelected, {
      lmsData: "Welcome to learn LWC"
    });
    this.dispatchToast();
  }

  dispatchToast() {
    this.dispatchEvent(
      new ShowToastEvent({
        title: "Message Send to Subscriber",
        message: "Message Send to Subscriber",
        variant: "success"
      })
    );
  }
}

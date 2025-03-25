import { LightningElement, wire } from "lwc";
import getContactList from "@salesforce/apex/contactController.getContactList";
import { publish, MessageContext } from "lightning/messageService";
import sendData from "@salesforce/messageChannel/sendData__c";
export default class ContactList extends LightningElement {
  selectedContactselectedId;
  selectedContact;

  @wire(MessageContext) msgContext;
  @wire(getContactList) contacts;
  selectedContactHandler(event) {
    this.selectedId = event.detail;
    console.log("this.selectedId", this.selectedId);
    this.selectedContact = this.contacts.data.find(
      (currItem) => currItem.Id === this.selectedId
    );
    console.log("this.selectedContact", this.selectedContact);
    let payLoad = { sendContact: this.selectedContact };
    publish(this.msgContext, sendData, payLoad);
  }
}

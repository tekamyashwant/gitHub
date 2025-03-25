import { LightningElement, wire } from "lwc";
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import getContactList from "@salesforce/apex/ContactBrowserController.getContactList";
import { NavigationMixin } from "lightning/navigation";
const columns = [
  { label: "Name", fieldName: "Name" },
  { label: "Email", fieldName: "Email", type: "url" },
  { label: "Phone", fieldName: "Phone", type: "phone" }
];
export default class ContactBrower extends NavigationMixin(LightningElement) {
  accountId = "";
  accIndustry = "";
  columns = columns;
  @wire(getContactList, {
    accountId: "$accountId",
    accIndustry: "$accIndustry"
  })
  contacts;

  accIdIndustryHandler(event) {
    console.log("event.detail", event.detail);
    this.accountId = event.detail.accountId;
    console.log("contacts this.accountId", this.accountId);

    this.accIndustry = event.detail.accIndustry;
    console.log("contacts this.accIndustry", this.accIndustry);
  }

  contactSearchClickHandler(event) {
    let selectedItemId = event.currentTarget.dataset.item;

    let pageRef = {
      type: "standard__recordPage",
      attributes: {
        recordId: selectedItemId,
        objectApiName: CONTACT_OBJECT,
        actionName: "edit"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }
}

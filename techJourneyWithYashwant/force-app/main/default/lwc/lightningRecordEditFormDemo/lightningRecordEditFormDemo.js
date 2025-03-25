import { api, LightningElement } from "lwc";
import ACC_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACC_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import ACC_RATING_FIELD from "@salesforce/schema/Account.Rating";
import ACC_SLAEXPIRATION_FIELD from "@salesforce/schema/Account.SLAExpirationDate__c";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";
export default class LightningRecordEditFormDemo extends NavigationMixin(
  LightningElement
) {
  @api recordId;
  @api objectApiName;
  fieldsList = {
    Name: ACC_NAME_FIELD,
    Industry: ACC_INDUSTRY_FIELD,
    Rating: ACC_RATING_FIELD,
    SLAExpirationDate: ACC_SLAEXPIRATION_FIELD
  };

  successHandler(event) {
    this.navigateToRecordPage(event.detail.id);
    this.showToastEventNotify(
      "Success!!!",
      "Record Created successfully",
      "success"
    );
  }

  errorHandler(event) {
    console.log("Error", JSON.stringify(event.detail));
    this.showToastEventNotify("Error!!!", event.detail.message, "error");
  }

  submitHandler(event) {
    event.preventDefault();
    let fields = event.detail.fields;
    console.log("event submit", fields);
    if (!fields.Industry) {
      fields.Industry = "Agriculture";
    }
    this.template.querySelector("lightning-record-edit-form").submit(fields);
  }

  resetHandler(event) {
    let fieldsallList = this.template.querySelectorAll("lightning-input-field");
    fieldsallList.forEach((currField) => currField.reset());
  }

  showToastEventNotify(title, message, variant) {
    const showEvent = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(showEvent);
  }

  navigateToRecordPage(recordPageId) {
    let pageRef = {
      type: "standard__recordPage",
      attributes: {
        recordId: recordPageId,
        objectApiName: this.objectApiName,
        actionName: "view"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }
}

import { api, LightningElement } from "lwc";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import RATING_FIELD from "@salesforce/schema/Account.Rating";
import TYPE_FIELD from "@salesforce/schema/Account.Type";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";
export default class LightningRecordFormDemo extends NavigationMixin(
  LightningElement
) {
  @api recordId;
  @api objectApiName;
  fieldsList = [
    NAME_FIELD,
    REVENUE_FIELD,
    INDUSTRY_FIELD,
    RATING_FIELD,
    TYPE_FIELD
  ];

  showToastNotify(event) {
    const showToastEvent = new ShowToastEvent({
      title: "Success!!!",
      message: "Record Updated Successfully.",
      variant: "success"
    });
    this.dispatchEvent(showToastEvent);
  }

  navigateToRecordPage(event) {
    //console.log("event.detail", JSON.stringify(event.detail));
    let pageRef = {
      type: "standard__recordPage",
      attributes: {
        recordId: event.detail.id,
        objectApiName: this.objectApiName,
        actionName: "view"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
    this.showToastNotify(event);
  }
}

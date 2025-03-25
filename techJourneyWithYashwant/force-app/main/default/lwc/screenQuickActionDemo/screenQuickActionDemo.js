import { api, LightningElement } from "lwc";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import ACCOUNT_INDUSTRY from "@salesforce/schema/Account.Industry";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { CloseActionScreenEvent } from "lightning/actions";
export default class ScreenQuickActionDemo extends LightningElement {
  @api recordId;
  @api objectApiName;

  fields = {
    accountName: ACCOUNT_NAME,
    accountIndustry: ACCOUNT_INDUSTRY
  };

  successHandler(event) {
    this.showToastNotify();
    this.dispatchEvent(new CloseActionScreenEvent());
  }

  showToastNotify() {
    const cusEvent = new ShowToastEvent({
      title: "Success",
      message: "Record Edit successfully.",
      variant: "success"
    });
    this.dispatchEvent(cusEvent);
  }

  clickhandler() {
    this.dispatchEvent(new CloseActionScreenEvent());
  }
}

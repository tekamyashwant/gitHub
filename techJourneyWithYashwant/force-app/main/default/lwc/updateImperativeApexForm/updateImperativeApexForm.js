import { api, LightningElement, wire } from "lwc";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import ACCOUNT_TICKERSYMBOL from "@salesforce/schema/Account.TickerSymbol";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import updateAccountRecord from "@salesforce/apex/AccountHelper.updateAccountRecord";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { notifyRecordUpdateAvailable } from "lightning/uiRecordApi";

export default class UpdateImperativeApexForm extends LightningElement {
  @api recordId;
  accName = "";
  accTicker = "";
  isLoading = false;

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [ACCOUNT_NAME, ACCOUNT_TICKERSYMBOL]
  })
  accountRecordFunction({ data, error }) {
    if (data) {
      console.log("data", data);
      this.accName = getFieldValue(data, ACCOUNT_NAME);
      this.accTicker = getFieldValue(data, ACCOUNT_TICKERSYMBOL);
    } else if (error) {
      console.log("Error occured while fetching account record", error);
    }
  }

  changeHandler(event) {
    this.accTicker = event.target.value;
  }

  async handleClick() {
    try {
      this.isLoading = true;
      let response = await updateAccountRecord({
        recordId: this.recordId,
        tickerSymbol: this.accTicker
      });
      console.log("response", response);
      await notifyRecordUpdateAvailable([{ recordId: this.recordId }]);

      this.showToastNotify(
        "Success",
        "Account Updated Successfully",
        "success"
      );
      this.isLoading = false;
    } catch (error) {
      console.log("error", error);
    }
  }

  showToastNotify(title, message, variant) {
    const showEvent = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(showEvent);
  }
}

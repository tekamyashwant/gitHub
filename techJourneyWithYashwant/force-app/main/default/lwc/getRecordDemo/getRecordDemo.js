import { api, LightningElement, wire } from "lwc";
import ACCOUNT_NAME from "@salesforce/schema/account.Name";
import ACCOUNT_REVENUE from "@salesforce/schema/account.AnnualRevenue";
import ACCOUNT_INDUSTRY from "@salesforce/schema/account.Industry";
import {
  getFieldDisplayValue,
  getFieldValue,
  getRecord
} from "lightning/uiRecordApi";

export default class GetRecordDemo extends LightningElement {
  @api recordId;
  accName = "";
  accIndustry = "";
  accAnnualRevenue = "";
  @wire(getRecord, {
    recordId: "$recordId",
    fields: [ACCOUNT_NAME, ACCOUNT_REVENUE, ACCOUNT_INDUSTRY]
  })
  outputFunction({ data, error }) {
    if (data) {
      console.log("data", data);
      this.accName = getFieldValue(data, ACCOUNT_NAME);
      this.accIndustry = getFieldValue(data, ACCOUNT_INDUSTRY);
      this.accAnnualRevenue = getFieldDisplayValue(data, ACCOUNT_REVENUE);
    } else if (error) {
      console.log("error", error);
    }
  }
}

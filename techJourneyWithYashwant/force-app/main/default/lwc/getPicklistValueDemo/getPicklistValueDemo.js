import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import { LightningElement, wire } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_INDUSTRY from "@salesforce/schema/Account.Industry";

export default class GetPicklistValueDemo extends LightningElement {
  industryValues;
  industryError;
  value;
  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT }) objectInfo;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_INDUSTRY
  })
  industryValuesFunction({ data, error }) {
    if (data) {
      console.log("Data", data);
      this.industryValues = data;
      this.industryError = undefined;
    } else if (error) {
      console.log("error", error);
      this.industryValues = undefined;
      this.industryError = error;
    }
  }

  handleChange(event) {
    this.value = event.target.value;
  }
}

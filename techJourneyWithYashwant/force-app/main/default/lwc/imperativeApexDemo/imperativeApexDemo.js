import { LightningElement, wire } from "lwc";
import getAccountRecordsImperative from "@salesforce/apex/AccountHelper.getAccountRecordsImperative";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";

const columns = [
  { label: "Name", fieldName: "Name" },
  { label: "Industry", fieldName: "Industry" },
  { label: "Rating", fieldName: "Rating" }
];
export default class ImperativeApexDemo extends LightningElement {
  accountRecords = [];
  columns = columns;
  selectedIndustry = "";

  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT.objectApiName
  })
  accountObjectInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$accountObjectInfo.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_INDUSTRY_FIELD
  })
  industryPickListValues;

  handleChange(event) {
    this.selectedIndustry = event.target.value;
  }

  async clickHandler(event) {
    try {
      let response = await getAccountRecordsImperative({
        inputIndustry: this.selectedIndustry
      });
      this.accountRecords = response;
      console.log("response", response);
    } catch (error) {
      console.log("error", error);
    }
  }

  get showDataTableRecord() {
    return this.accountRecords ? true : false;
  }
}

import {
  getObjectInfo,
  getPicklistValuesByRecordType
} from "lightning/uiObjectInfoApi";
import { LightningElement, wire } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class GetPicklistValuesByRecordTypeId extends LightningElement {
  accountPicklistValues;
  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  accountObjectInfo;
  @wire(getPicklistValuesByRecordType, {
    objectApiName: ACCOUNT_OBJECT,
    recordTypeId: "$accountObjectInfo.data.defaultRecordTypeId"
  })
  accountObjectPickListInfo({ data, error }) {
    if (data) {
      console.log("data", data);
      this.accountPicklistValues = data;
    } else if (error) {
      console.log("error", error);
    }
  }
}

import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { LightningElement, wire } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class GetObjectInfoApiDemo extends LightningElement {
  accountinfo;
  accounterror;
  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT }) outputFunction({
    data,
    error
  }) {
    if (data) {
      console.log("data", data);
      this.accountinfo = data;
    } else if (error) {
      console.log("error", error);
      this.accounterror = error;
    }
  }
}

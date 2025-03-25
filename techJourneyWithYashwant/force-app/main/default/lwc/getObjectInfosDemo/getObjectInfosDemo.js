import { getObjectInfos } from "lightning/uiObjectInfoApi";
import { LightningElement, wire } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import CONTACT_OBJECT from "@salesforce/schema/Contact";

export default class GetObjectInfosDemo extends LightningElement {
  objectData;
  objectError;
  @wire(getObjectInfos, { objectApiNames: [ACCOUNT_OBJECT, CONTACT_OBJECT] })
  outputFunction({ data, error }) {
    if (data) {
      console.log("data", data);
      this.objectData = data;
      this.objectError = undefined;
    } else if (error) {
      console.log("error", error);
      this.objectData = undefined;
      this.objectError = error;
    }
  }
}

import { api, LightningElement } from "lwc";

export default class DynamicRecordAndObject extends LightningElement {
  @api recordId;
  @api objectApiName;
}

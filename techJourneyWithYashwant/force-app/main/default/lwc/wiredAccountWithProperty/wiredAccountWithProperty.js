import { LightningElement, wire } from "lwc";
import getAccountRecords from "@salesforce/apex/AccountHelper.getAccountRecords";

const columns = [
  { label: "Account Name", fieldName: "Name" },
  { label: "Account Industry", fieldName: "Industry" },
  { label: "Account Rating", fieldName: "Rating" }
];

export default class WiredAccountWithProperty extends LightningElement {
  columns = columns;
  @wire(getAccountRecords) accounts;
}

import { LightningElement, wire } from "lwc";
import getAccountRecords from "@salesforce/apex/AccountHelper.getAccountRecords";
const columns = [
  { label: "Account Name", fieldName: "Name" },
  { label: "Account Industry", fieldName: "Industry" },
  { label: "Account Rating", fieldName: "Rating" }
];
export default class WiredAccountWithFunction extends LightningElement {
  columns = columns;
  accounts;
  errors;
  @wire(getAccountRecords) accountFunction({ data, error }) {
    if (data) {
      let updatedAccounts = data.map((currItem) => {
        let updatedItem = {};
        if (!currItem.hasOwnProperty("Rating")) {
          updatedItem = { ...currItem, Rating: "Warm" };
        } else {
          updatedItem = { ...currItem };
        }
        return updatedItem;
      });
      this.accounts = [...updatedAccounts];
      console.log("accounts", this.accounts);
      this.errors = undefined;
    } else if (error) {
      this.errors = error;
      this.accounts = undefined;
    }
  }
}

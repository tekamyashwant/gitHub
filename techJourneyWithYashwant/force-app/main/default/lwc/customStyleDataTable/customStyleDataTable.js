import { LightningElement, wire } from "lwc";
import getContactListForDataTable from "@salesforce/apex/contactController.getContactListForDataTable";
const columns = [
  {
    label: "Name",
    type: "customName",
    typeAttributes: {
      contactName: {
        fieldName: "Name"
      }
    }
  },
  {
    label: "Account Name",
    fieldName: "accountId",
    type: "url",
    typeAttributes: {
      label: {
        fieldName: "accountName"
      },
      target: "_blank"
    }
  },
  {
    label: "Title",
    fieldName: "Title",
    type: "text",
    cellAttributes: {
      class: {
        fieldName: "titlecolor"
      }
    }
  },
  {
    label: "Rank",
    fieldName: "Rank__c",
    type: "customRank",
    typeAttributes: {
      contactRank: {
        fieldName: "rankIcon"
      }
    }
  },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Email", fieldName: "Email", type: "email" },
  {
    label: "Picture",
    type: "customPicture",
    typeAttributes: {
      contactPicture: {
        fieldName: "Picture__c"
      }
    },
    cellAttributes: {
      alignment: "center"
    }
  }
];

export default class CustomStyleDataTable extends LightningElement {
  columns = columns;
  contacts;
  @wire(getContactListForDataTable) contactsFunction({ data, error }) {
    if (data) {
      //this.contacts = data;
      this.contacts = data.map((record) => {
        let recordData = [];
        if (record.Account) {
          console.log("Account Available");
          if (record.Account.Name) {
            console.log("Account Name Available");
            recordData = {
              ...record,
              accountId: "/" + record.AccountId,
              accountName: record.Account.Name,
              titlecolor: "slds-text-color_success",
              rankIcon: record.Rank__c > 5 ? "utility:ribbon" : ""
            };
          }
        } else {
          recordData = {
            ...record,
            titlecolor: "slds-text-color_success",
            rankIcon: record.Rank__c > 5 ? "utility:ribbon" : ""
          };
        }
        return recordData;
      });

      console.log("contacts", this.contacts);
      //console.log("Data", data);
    } else if (error) {
      console.log("error", error);
    }
  }
}

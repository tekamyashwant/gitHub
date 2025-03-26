import { LightningElement, wire } from "lwc";
import getAccounts from "@salesforce/apex/AccountWithOppsController.getAccounts";
import deleteAccount from "@salesforce/apex/AccountWithOppsController.getAccounts";
import { NavigationMixin } from "lightning/navigation";
import CONTACT from "@salesforce/schema/Contact";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
export default class DisplayAccountWithOpp extends NavigationMixin(
  LightningElement
) {
  columns = [
    {
      label: "Account Name",
      fieldName: "accId",
      type: "url",
      typeAttributes: { label: "accName", target: "_blank" }
    },
    { label: "Type", fieldName: "accType", type: "text" },
    { label: "Billing Country", fieldName: "accBillingCountry", type: "text" },
    {
      label: "Number of Opportunities",
      fieldName: "noOfOpportunities",
      type: "phone"
    },
    {
      type: "button",
      typeAttributes: {
        label: "Create Contact",
        name: "Create Contact",
        variant: "brand",
        iconPosition: "left"
      }
    },
    {
      type: "button",
      typeAttributes: {
        label: "Delete Contact",
        name: "Delete Contact",
        variant: "destructive",
        iconPosition: "left"
      }
    }
  ];

  @wire(getAccounts) accounts;

  get showAccountsData() {
    return this.accounts.data ? true : false;
  }

  handleRowAction(event) {
    const action = event.detail.action;
    const row = event.detail.row;
    console.log("row", JSON.stringify(row));
    console.log("action", JSON.stringify(row));
    let accRecordId = row.accId;
    console.log("accRecordId", accRecordId);

    switch (action.name) {
      case "Create Contact":
        this.createContact(accRecordId);
        break;
      case "Delete Contact":
        this.deleteAccountMethod(accRecordId);
        break;
    }
  }

  createContact(accRecordId) {
    console.log("createContact");

    const defaultValues = encodeDefaultFieldValues({
      AccountId: accRecordId
    });
    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: CONTACT.objectApiName,
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  async deleteAccountMethod(accRecordId) {
    console.log("deleteAccountMethod");

    try {
      await deleteAccount({ accountId: accRecordId });
      this.showToastNotify("Succes", "Contact Deleted Successfully", "success");
      await refreshApex(this.accounts);
    } catch (error) {
      this.showToastNotify("Error", error.body.message(), "error");
    }
  }

  showToastNotify(title, message, variant) {
    const showEvent = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(showEvent);
  }
}

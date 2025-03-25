import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import { LightningElement, wire } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_FIELD_INDUSTRY from "@salesforce/schema/account.Industry";
import { NavigationMixin } from "lightning/navigation";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";

export default class ContactFilter extends NavigationMixin(LightningElement) {
  selectedAccountId = "";
  selectedIndustry = "";
  isDisabled = true;

  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT }) objectInfoData;
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfoData.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_FIELD_INDUSTRY
  })
  accountIndustryPicklist;

  accSelectionHandler(event) {
    this.selectedAccountId = event.detail;
    console.log("this.selectedAccountId ", this.selectedAccountId);
    this.isDisabled = false;
    this.sendSelectioToParentHandler();
  }

  industryChangeHandler(event) {
    this.selectedIndustry = event.target.value;
    console.log("this.selectedIndustry", this.selectedIndustry);
    this.sendSelectioToParentHandler();
  }

  addNewContactClickHandler(event) {
    let defaultValues = encodeDefaultFieldValues({
      AccountId: this.selectedAccountId
    });

    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Contact",
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  sendSelectioToParentHandler(event) {
    const sendToParentEvent = new CustomEvent("sendtoparent", {
      detail: {
        accountId: this.selectedAccountId,
        accIndustry: this.selectedIndustry
      }
    });
    this.dispatchEvent(sendToParentEvent);
  }
}

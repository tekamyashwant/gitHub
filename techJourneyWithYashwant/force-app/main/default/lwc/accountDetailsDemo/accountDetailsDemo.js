import { api, LightningElement, wire } from "lwc";
import getParentAccounts from "@salesforce/apex/AccountHelper.getParentAccounts";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_PARENT_FIELD from "@salesforce/schema/Account.ParentId";
import ACCOUNT_SLAEXPIRY_FIELD from "@salesforce/schema/Account.SLAExpirationDate__c";
import ACCOUNT_SLATYPE_FIELD from "@salesforce/schema/Account.SLA__c";
import ACCOUNT_NOOFLOCATION_FIELD from "@salesforce/schema/Account.NumberofLocations__c";
import ACCOUNT_DESCRIPTION_FIELD from "@salesforce/schema/Account.Description";
import ACCOUNT_ID from "@salesforce/schema/Account.Id";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import {
  createRecord,
  deleteRecord,
  getFieldValue,
  getRecord,
  updateRecord
} from "lightning/uiRecordApi";
import { NavigationMixin } from "lightning/navigation";
const FIELDSTOLOAD = [
  ACCOUNT_NAME_FIELD,
  ACCOUNT_PARENT_FIELD,
  ACCOUNT_SLAEXPIRY_FIELD,
  ACCOUNT_SLATYPE_FIELD,
  ACCOUNT_NOOFLOCATION_FIELD,
  ACCOUNT_DESCRIPTION_FIELD
];

export default class AccountDetailsDemo extends NavigationMixin(
  LightningElement
) {
  parentAccountOptions = [];
  parentAccount = "";
  accountName = "";
  sladate = null;
  slatype = "";
  nooflocations = "1";
  description = "";
  @api recordId;
  @wire(getRecord, {
    recordId: "$recordId",
    fields: FIELDSTOLOAD
  })
  wiredRecordDetails({ data, error }) {
    if (data) {
      console.log("Existing record data :", data);
      this.parentAccount = getFieldValue(data, ACCOUNT_PARENT_FIELD);
      this.accountName = getFieldValue(data, ACCOUNT_NAME_FIELD);
      this.sladate = getFieldValue(data, ACCOUNT_SLAEXPIRY_FIELD);
      this.slatype = getFieldValue(data, ACCOUNT_SLATYPE_FIELD);
      this.nooflocations = getFieldValue(data, ACCOUNT_NOOFLOCATION_FIELD);
      this.description = getFieldValue(data, ACCOUNT_DESCRIPTION_FIELD);
    } else if (error) {
      console.log("Record Retrival Failed.", error);
    }
  }

  @wire(getParentAccounts) parentAccountfunction({ data, error }) {
    if (data) {
      console.log("Data", data);
      this.parentAccountOptions = data.map((currItem) => ({
        label: currItem.Name,
        value: currItem.Id
      }));
    } else if (error) {
      console.log("error", error);
    }
  }

  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT }) accountObjectInfo;
  @wire(getPicklistValues, {
    recordTypeId: "$accountObjectInfo.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_SLATYPE_FIELD
  })
  slaTypePickListValues;

  handleChange(event) {
    let { name, value } = event.target;
    if (name === "parentaccount") {
      this.parentAccount = value;
    }
    if (name === "accountname") {
      this.accountName = value;
    }
    if (name === "sladate") {
      this.sladate = value;
    }
    if (name === "slatype") {
      this.slatype = value;
    }
    if (name === "noofloactions") {
      this.nooflocations = value;
    }
    if (name === "description") {
      this.description = value;
    }
  }

  async handleClick(event) {
    if (this.validate()) {
      let fields = {};
      fields[ACCOUNT_NAME_FIELD.fieldApiName] = this.accountName;
      fields[ACCOUNT_PARENT_FIELD.fieldApiName] = this.parentAccount;
      fields[ACCOUNT_SLAEXPIRY_FIELD.fieldApiName] = this.sladate;
      fields[ACCOUNT_SLATYPE_FIELD.fieldApiName] = this.slatype;
      fields[ACCOUNT_NOOFLOCATION_FIELD.fieldApiName] = this.nooflocations;
      fields[ACCOUNT_DESCRIPTION_FIELD.fieldApiName] = this.description;

      if (this.recordId) {
        fields[ACCOUNT_ID.fieldApiName] = this.recordId;
        let recordInput = {
          fields: fields
        };
        this.updateRecordFunction(recordInput);
      } else {
        let recordInput = {
          apiName: ACCOUNT_OBJECT.objectApiName,
          fields: fields
        };
        this.createRecordFunction(recordInput);
      }
    }
  }

  validate() {
    let elements = Array.from(this.template.querySelectorAll(".validateme"));
    let isValid = elements.every((currItem) => currItem.checkValidity());
    return isValid;
  }

  showToastNotify(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(event);
  }

  navigateToRecordPage(accountRecordId) {
    let pageRef = {
      type: "standard__recordPage",
      attributes: {
        recordId: accountRecordId,
        objectApiName: ACCOUNT_OBJECT.objectApiName,
        actionName: "view"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  get formTitle() {
    return this.recordId == null ? "Create Record" : "Edit Record";
  }

  get buttonLabel() {
    return this.recordId == null ? "Save Record" : "Edit Record";
  }

  get isDeleteAvailable() {
    return this.recordId != null ? true : false;
  }

  async createRecordFunction(recordInput) {
    try {
      let response = await createRecord(recordInput);
      console.log("Create Record response", response);
      this.showToastNotify(
        "Success!!!",
        "Account Record created successfully",
        "success"
      );
      this.navigateToRecordPage(response.id);
    } catch (error) {
      console.log("Create Record Error", error);
      this.showToastNotify("Error", "Account creation failed.", "error");
    }
  }

  async updateRecordFunction(recordInput) {
    try {
      let response = await updateRecord(recordInput);
      console.log("Update Record response", response);
      this.showToastNotify(
        "Success!!!",
        "Account Record updated successfully",
        "success"
      );
    } catch (error) {
      console.log("Update Record Error", error);
      this.showToastNotify("Error", "Account updation failed.", "error");
    }
  }

  async deleteRecordHandler() {
    try {
      await deleteRecord(this.recordId);
    } catch (error) {
      console.log("Delete Record Error", error);
    }
    let pageRef =
      // Navigates to account list with the filter set to Recent.
      {
        type: "standard__objectPage",
        attributes: {
          objectApiName: ACCOUNT_OBJECT.objectApiName,
          actionName: "list"
        },
        state: {
          filterName: "Recent"
        }
      };
    this[NavigationMixin.Navigate](pageRef);
  }
}

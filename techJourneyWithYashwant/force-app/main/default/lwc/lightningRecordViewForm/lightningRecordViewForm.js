import { api, LightningElement } from "lwc";
import ACC_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACC_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import ACC_REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import ACC_RATING_FIELD from "@salesforce/schema/Account.Rating";

export default class LightningRecordViewForm extends LightningElement {
  @api recordId;
  @api objectApiName;
  fieldsList = {
    Name: ACC_NAME_FIELD,
    Industry: ACC_INDUSTRY_FIELD,
    AnnualRevenue: ACC_REVENUE_FIELD,
    Rating: ACC_RATING_FIELD
  };
}

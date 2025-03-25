import { LightningElement, wire } from "lwc";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import Contact_NAME from "@salesforce/schema/Contact.Name";
import { getRecords } from "lightning/uiRecordApi";
export default class GetRecordsDemo extends LightningElement {
  outputRecords;
  errors;
  @wire(getRecords, {
    records: [
      {
        recordIds: ["001dL00000eyKZVQA2", "001dL00000mNn7dQAC"],
        fields: [ACCOUNT_NAME]
      },
      {
        recordIds: ["003dL00000Cqo1pQAB", "003dL00000CJiHlQAL"],
        fields: [Contact_NAME]
      }
    ]
  })
  outputFunction(data, error) {
    if (data) {
      console.log("data", data);
      console.log("data.data", data.data);
      this.outputRecords = data.data;
      this.errors = undefined;
    } else if (error) {
      console.log("error", error);
      this.errors = error;
      this.records = undefined;
    }
  }
}

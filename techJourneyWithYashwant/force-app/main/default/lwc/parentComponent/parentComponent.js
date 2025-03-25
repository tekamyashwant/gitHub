import LastName from "@salesforce/schema/CampaignMember.LastName";
import { LightningElement } from "lwc";

export default class ParentComponent extends LightningElement {
  greeting = "Welcome to learn LWC";
  information = {
    fname: "Yashwant",
    lname: "Tekam",
    occupation: "Salesforce Developer"
  };
}

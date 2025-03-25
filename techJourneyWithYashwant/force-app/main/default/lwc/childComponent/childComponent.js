import { api, LightningElement } from "lwc";

export default class ChildComponent extends LightningElement {
  @api display;
  @api displayGreeting;
  useroccupation;
  @api isAvailable = false;

  @api
  get myDetails() {
    return this.useroccupation;
  }

  set myDetails(value) {
    let user = { ...value };
    this.useroccupation = user.occupation.toUpperCase();
  }
}

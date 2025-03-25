import { api, LightningElement } from "lwc";

export default class ChildLwcComponent extends LightningElement {
  @api message;
  firstname = "";
  lastname = "";

  @api getAuraMessage(greeting) {
    alert(greeting);
  }

  changeHandler(event) {
    let { name, value } = event.target;
    if (name === "firstname") {
      this.firstname = value;
    } else if (name === "lastname") {
      this.lastname = value;
    }
  }

  clickHandler() {
    let fullName = `${this.firstname} ${this.lastname}`.toUpperCase();
    let childEvent = new CustomEvent("childmsg", {
      detail: {
        fullName: fullName
      }
    });
    this.dispatchEvent(childEvent);
    console.log("fullName", fullName);
  }
}

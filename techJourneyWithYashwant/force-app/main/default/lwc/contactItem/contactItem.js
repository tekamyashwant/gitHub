import { api, LightningElement } from "lwc";

export default class ContactItem extends LightningElement {
  @api contact;
  clickHandler(event) {
    event.preventDefault();
    let selectedContact = new CustomEvent("selectedcontactid", {
      detail: this.contact.Id
    });
    this.dispatchEvent(selectedContact);
  }
}

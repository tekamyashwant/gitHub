import { api, LightningElement, track } from "lwc";

export default class ObjectsForFlow extends LightningElement {
  @track _contacts;
  set getContact(contacts = []) {
    this._contacts = [...contacts];
  }

  @api
  get getContact() {
    return this._contacts;
  }

  @api
  get items() {
    let pillContainer = this._contacts.map((currItem) => {
      return {
        type: "icon",
        label: currItem.Email,
        name: currItem.Email,
        iconName: "standard:contact",
        alternativeText: "Contact Email"
      };
    });
    return pillContainer;
  }
}

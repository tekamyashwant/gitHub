import { api, LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";
export default class HeadlessQuickActionDemo extends NavigationMixin(
  LightningElement
) {
  @api invoke() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Contact",
        actionName: "home"
      }
    });
  }
}

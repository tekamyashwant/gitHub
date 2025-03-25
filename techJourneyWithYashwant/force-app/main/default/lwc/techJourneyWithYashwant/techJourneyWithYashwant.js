import { LightningElement, track } from "lwc";

export default class TechJourneyWithYashwant extends LightningElement {
  greeting = "Hello";
  @track welcome = "Tech Journey With Yashwant";

  changeHandler(event) {
    this.greeting = "Namaste";
    this.welcome = "Tech Journey With Yashwant Again";
    console.log("Change Handler Called");
  }
}

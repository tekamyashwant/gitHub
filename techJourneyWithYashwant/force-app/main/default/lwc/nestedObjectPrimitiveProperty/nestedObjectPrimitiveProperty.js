import { LightningElement, track } from "lwc";

export default class NestedObjectPrimitiveProperty extends LightningElement {
  myDetails = { fname: "Yashwant", lname: "Tekam" };
  myTask = ["Office", "Meeting", "Bootcamp"];
  clickHandler(event) {
    console.log("Event", event);
    this.myDetails.fname = "Suraj";
  }

  addTaskHandler(event) {
    this.myTask.push("Dance");
  }

  refreshHandler(event) {
    this.myDetails = { fname: "Virat", lname: "Kohli" };
    this.myTask = [...this.myTask, "Gym"];
  }
}

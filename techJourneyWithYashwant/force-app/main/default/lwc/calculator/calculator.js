import { LightningElement } from "lwc";

export default class Calculator extends LightningElement {
  numberOne = "";
  numberTwo = "";
  result = 0;
  displayResult = false;

  changeHandler(event) {
    let { name, value } = event.target;
    if (name === "numberone") {
      this.numberOne = value;
    } else if (name === "numbertwo") {
      this.numberTwo = value;
    }
  }

  clickHandler(event) {
    this.displayResult = true;
    let { name } = event.target;
    if (name === "add") {
      this.result = parseInt(this.numberOne) + parseInt(this.numberTwo);
      console.log("Result", this.result);
    } else if (name === "sub") {
      this.result = parseInt(this.numberOne) - parseInt(this.numberTwo);
      console.log("Result", this.result);
    } else if (name === "mul") {
      this.result = parseInt(this.numberOne) * parseInt(this.numberTwo);
      console.log("Result", this.result);
    } else if (name === "div") {
      this.result = parseInt(this.numberOne) / parseInt(this.numberTwo);
      console.log("Result", this.result);
    } else if (name === "reset") {
      this.displayResult = false;
      this.numberOne = "";
      this.numberTwo = "";
      this.result = 0;
    }
  }
}

import { LightningElement } from "lwc";
import LightningAlert from "lightning/alert";
import LightningConfirm from "lightning/confirm";
import LightningPrompt from "lightning/prompt";

export default class AlertConfirmPromtDemo extends LightningElement {
  async alertHandler() {
    await LightningAlert.open({
      message: "Alert message",
      theme: "error", // a red theme intended for error states
      label: "Error!" // this is the header text
    });
  }

  async confirmHandler() {
    let result = await LightningConfirm.open({
      message: "Prompt message",
      variant: "header",
      theme: "success"
      // setting theme would have no effect
    });
    console.log("result", result);
  }

  async promptHandler() {
    let message = await LightningPrompt.open({
      message: "this is the prompt message",
      //theme defaults to "default"
      label: "Please Respond", // this is the header text
      defaultValue: "Welcome to learn LWC", //this is optional
      theme: "warning"
    });
    console.log("Message Prompt", message);
  }
}

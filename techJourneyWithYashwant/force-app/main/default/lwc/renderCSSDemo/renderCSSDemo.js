import { LightningElement } from "lwc";

export default class RenderCSSDemo extends LightningElement {
  pColor = "bgcolor";
  clickHandler(event) {
    let { label } = event.target;
    if (label === "Add CSS")
      this.template.querySelector("p").classList.add("addborder");
    else if (label === "Remove CSS")
      this.template.querySelector("p").classList.remove("addborder");
    else if (label === "Toggle CSS")
      this.template.querySelector("p").classList.toggle("addborder");
  }
}

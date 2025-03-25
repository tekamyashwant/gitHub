import { LightningElement, wire, api } from "lwc";
import getRecords from "@salesforce/apex/genericCustomLookup.getRecords";
const DELAY = 300;
export default class CustomLookup extends LightningElement {
  @api objectLabel = "";
  @api apiName = "";
  @api objectIconName = "";
  searchItem = "";
  delayTimeOut;
  displayOutput = false;
  selectedItem = {
    selectedId: "",
    selectedName: ""
  };

  @wire(getRecords, { objectApiName: "$apiName", searchKey: "$searchItem" })
  outputs;

  get checkSelection() {
    return this.selectedItem.selectedId === "" ? false : true;
  }

  changeHandler(event) {
    window.clearTimeout(this.delayTimeOut);
    this.displayOutput = true;
    let inputsearch = event.target.value;
    this.delayTimeOut = setTimeout(() => {
      this.searchItem = inputsearch;
    }, DELAY);
    this.selectedItem = {
      selectedId: "",
      selectedName: ""
    };
  }

  clickHandler(event) {
    let selectedItemId = event.currentTarget.dataset.item;
    console.log("selectedItemId", selectedItemId);
    let selectedItemObject = this.outputs.data.find(
      (currItem) => currItem.Id === selectedItemId
    );

    this.selectedItem = {
      selectedId: selectedItemObject.Id,
      selectedName: selectedItemObject.Name
    };
    console.log("selectedItem", this.selectedItem);
    this.sendSelection();
    this.displayOutput = false;
  }

  closeHandler(event) {
    console.log("close");
    this.selectedItem = {
      selectedId: "",
      selectedName: ""
    };
    this.sendSelection();
  }

  sendSelection() {
    let selectionEvent = new CustomEvent("selection", {
      detail: this.selectedItem.selectedId
    });
    this.dispatchEvent(selectionEvent);
  }
}

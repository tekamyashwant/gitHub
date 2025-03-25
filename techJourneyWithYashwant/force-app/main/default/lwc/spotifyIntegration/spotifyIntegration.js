import { LightningElement } from "lwc";
import searchWithSpotify from "@salesforce/apex/SpotifyIntegration.searchWithSpotify";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class SpotifyIntegration extends LightningElement {
  searchTrack;
  changeHandler(event) {
    this.searchTrack = event.target.value;
  }

  async searchHandler(event) {
    let isValid = this.validateInput();
    if (isValid) {
      try {
        let responseString = await searchWithSpotify({
          trackname: this.searchTrack
        });
        let response = JSON.parse(responseString); //parse convert string into json
        console.log("response", response);
      } catch (error) {
        console.log("error", error);
        this.showToast("Error", "Something went wrong.", "error");
      }
    }
  }

  validateInput() {
    let isValid = true;
    let element = this.template.querySelector("lightning-input");
    if (!element.checkValidity()) {
      element.reportValidity();
      isValid = false;
    }
    return isValid;
  }

  showToast(title, message, variant) {
    const showEvent = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(showEvent);
  }
}

import { api, LightningElement } from "lwc";
import { notifyRecordUpdateAvailable } from "lightning/uiRecordApi";
import {
  subscribe,
  unsubscribe,
  onError,
  setDebugFlag,
  isEmpEnabled
} from "lightning/empApi";
export default class RefeshDisplayMessage extends LightningElement {
  @api recordId;
  showWarning = false;
  channelName = "/data/AccountChangeEvent";
  subscription = {};
  isLoaded = false;

  connectedCallback() {
    this.handleSubscribe();
    // Register error listener
  }

  disconnectedCallback() {
    this.handleUnsubscribe();
  }

  handleSubscribe() {
    // Callback invoked whenever a new event message is received
    const messageCallback = (response) => {
      console.log("New message received: ", JSON.stringify(response));
      // Response contains the payload of the new message received
      this.changeDateCaptureEventHandle(response);
    };

    // Invoke subscribe method of empApi. Pass reference to messageCallback
    subscribe(this.channelName, -1, messageCallback).then((response) => {
      // Response contains the subscription information on subscribe call
      console.log(
        "Subscription request sent to: ",
        JSON.stringify(response.channel)
      );
      this.subscription = response;
    });
  }

  handleUnsubscribe() {
    // Invoke unsubscribe method of empApi
    unsubscribe(this.subscription, (response) => {
      console.log("unsubscribe() response: ", JSON.stringify(response));
      // Response is true for successful unsubscribe
    });
  }

  registerErrorListener() {
    // Invoke onError empApi method
    onError((error) => {
      console.log("Received error from server: ", JSON.stringify(error));
      // Error contains the server-side error
    });
  }

  changeDateCaptureEventHandle(response) {
    console.log("Response", JSON.stringify(response));
    if (response.data.hasOwnProperty("payload")) {
      let payLoad = response.data.payload;
      if (payLoad.hasOwnProperty("ChangeEventHeader")) {
        let changeEventHeader = payLoad.ChangeEventHeader;
        console.log("changeEventHeader", changeEventHeader);
        if (changeEventHeader.changeType === "UPDATE") {
          let isRecordAvailable = changeEventHeader.recordIds.find(
            (currItem) => currItem === this.recordId
          );
          console.log("isRecordAvailable", isRecordAvailable);

          if (isRecordAvailable) {
            this.showWarning = true;
          }
        }
      }
    }
  }

  async refreshHandler() {
    this.isLoaded = true;
    //this.showToastNofity("UPDATE", "Task Updated Successfully", "success");
    // showSpinner();
    // Notify LDS that you've changed the record outside its mechanisms
    // Await the Promise object returned by notifyRecordUpdateAvailable()
    await notifyRecordUpdateAvailable([{ recordId: this.recordId }]);
    this.showWarning = false;
    this.isLoaded = false;
    //hideSpinner();
  }
}

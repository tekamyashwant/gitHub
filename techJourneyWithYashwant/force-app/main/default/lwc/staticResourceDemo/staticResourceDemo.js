import { LightningElement, wire } from "lwc";
import LOGO from "@salesforce/resourceUrl/LogoDisplay";
import DISPLAY_ASSET from "@salesforce/contentAssetUrl/Salesforce_Asset_Content";
import GREETING from "@salesforce/label/c.greeting";
import PLATFORM from "@salesforce/label/c.salesforcePlatform";
import USER_ID from "@salesforce/user/Id";
import USERNAME_FIELD from "@salesforce/schema/User.Name";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import DISPLAY_TEXT_PERMISSION from "@salesforce/customPermission/displayText";
import ANIMATE from "@salesforce/resourceUrl/ThirdPartyCss";
import MOMENT from "@salesforce/resourceUrl/ThirdPartyJS";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";

export default class StaticResourceDemo extends LightningElement {
  logo = LOGO;
  assetContent = DISPLAY_ASSET;
  label = {
    greeting: GREETING,
    platform: PLATFORM
  };
  userName = "";
  isLoadThirdParty = true;
  displayDate = "";

  @wire(getRecord, { recordId: USER_ID, fields: [USERNAME_FIELD] })
  wiredUserRecord({ data, error }) {
    if (data) {
      console.log("data", data);
      this.userName = getFieldValue(data, USERNAME_FIELD);
    } else if (error) {
      console.log("Error", error);
    }
  }

  renderedCallback() {
    if (this.isLoadThirdParty) {
      Promise.all([loadStyle(this, ANIMATE), loadScript(this, MOMENT)])
        .then(() => {
          this.fetchDate();
          this.isLoadThirdParty = false;
        })
        .catch((error) => {
          console.log("Error loading third party script", error);
        });
    }
  }

  get checkPermisson() {
    return DISPLAY_TEXT_PERMISSION ? true : false;
  }

  fetchDate() {
    this.displayDate = moment().format("LLLL");
  }
}

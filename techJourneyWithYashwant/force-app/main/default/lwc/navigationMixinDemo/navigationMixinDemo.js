import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
export default class NavigationMixinDemo extends NavigationMixin(
  LightningElement
) {
  navHomeClickHandler(event) {
    let pageRef = {
      type: "standard__namedPage",
      attributes: {
        pageName: "home"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  navListViewClickHandler(event) {
    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "list"
      },
      state: {
        filterName: "PlatinumandGoldSLACustomers"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  navCreateAccRecordClickHandler(event) {
    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "new"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  navCreateAccRecordDefaultValuesClickHandler(event) {
    const defaultValues = encodeDefaultFieldValues({
      Name: "Navigate",
      Rating: "Hot",
      Industry: "Media"
    });
    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  navEditAccRecordClickHandler(event) {
    let pageRef = {
      type: "standard__recordPage",
      attributes: {
        recordId: "001dL00000eyKZVQA2",
        objectApiName: "Account",
        actionName: "edit"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }
}

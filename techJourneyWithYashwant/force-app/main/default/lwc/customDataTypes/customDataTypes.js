import LightningDatatable from "lightning/datatable";
import customContactName from "./customContactName.html";
import customContactRank from "./customContactRank.html";
import customContactPicture from "./customContactPicture.html";

export default class CustomDataTypes extends LightningDatatable {
  static customTypes = {
    customName: {
      template: customContactName,
      standardCellLayout: true,
      typeAttributes: ["contactName"]
    },
    customRank: {
      template: customContactRank,
      standardCellLayout: false,
      typeAttributes: ["contactRank"]
    },
    customPicture: {
      template: customContactPicture,
      standardCellLayout: true,
      typeAttributes: ["contactPicture"]
    }
  };
}

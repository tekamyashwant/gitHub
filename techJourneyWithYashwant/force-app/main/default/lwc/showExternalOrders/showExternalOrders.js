import { LightningElement, wire } from "lwc";
import getOrdersList from "@salesforce/apex/ShowExternalOrdersController.getOrdersList";
export default class ShowExternalOrders extends LightningElement {
  @wire(getOrdersList)  ;
}

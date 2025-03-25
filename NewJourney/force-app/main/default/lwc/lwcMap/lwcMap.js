import { api, LightningElement } from 'lwc';
import getUIDataController from '@salesforce/apex/LWCMapController.getDataForUI';
export default class LwcMap extends LightningElement {
    @api objectApiName;
    mapMarkers;

    connectedCallback(){
        this.getMapMarkers();
    }

    getMapMarkers(){
        getUIDataController({"objectApiName":this.objectApiName, "uiType":"MapMarker"}).then(markers =>{
            this.mapMarkers=markers;
            console.log('mapMarkers: '+this.mapMarkers);
        });
    }

}
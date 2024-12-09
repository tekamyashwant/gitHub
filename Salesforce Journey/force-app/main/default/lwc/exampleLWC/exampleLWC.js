import { LightningElement, track } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { wire } from 'lwc';

export default class ExampleLWC extends LightningElement {
    @track param;

    @wire(CurrentPageReference)
    getPageReference(pageRef) {
        if (pageRef && pageRef.state && pageRef.state.c__param) {
            this.param = pageRef.state.c__param;
        }
    }
}

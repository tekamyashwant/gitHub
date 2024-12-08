import { api, LightningElement,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
export default class CallAurainLwcComponent24 extends NavigationMixin(LightningElement) {

    @api recordId;

    @wire(CurrentPageReference)
    getPageReference(pageRef) {
        if (pageRef && pageRef.state) {
            this.recordId = pageRef.state.c__recordId; // Fetch recordId from URL state
        }
    }

    handleClick(event) {
            this[NavigationMixin.Navigate]({
                type: 'standard__component',
                attributes: {
                    componentName: 'c__auraComponent24',
                   url: '/lightning/cmp/c__auraComponent24?c__myParam=value',
                    target: '_blank'
                },
                state: {
                    c__id: this.recordId
                }
            });
        }


    }

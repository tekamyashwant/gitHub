import { LightningElement, wire } from 'lwc';
import { subscribe,unsubscribe,MessageContext } from 'lightning/messageService';
import UPDATE_COUNT_CHANNEL from '@salesforce/messageChannel/update_count__c';
export default class SubLwc extends LightningElement {
    counter=0;
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                UPDATE_COUNT_CHANNEL,
                (message) => this.handleMessage(message)
                
            );
        }
    }

    handleMessage(message){
        if(message.operator==='add'){
            this.counter = this.counter+1;
            console.log('this.counter',this.counter);
        }else if(message.operator==='sub'){
            this.counter = this.counter-1;
            console.log('this.counter',this.counter);

        }else if(message.operator==='mul'){
            this.counter = this.counter*2;
            console.log('this.counter',this.counter);
        }
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

}
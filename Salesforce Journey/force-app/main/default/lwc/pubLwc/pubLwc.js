import { LightningElement, wire } from 'lwc';
import { publish,MessageContext } from 'lightning/messageService';
import UPDATE_COUNT_CHANNEL from '@salesforce/messageChannel/update_count__c';

export default class PubLwc extends LightningElement {
    @wire(MessageContext)
    messageContext;

    clickHandler(event){
        let {name}=event.target;
        console.log('event',event)
        if(name==='add'){
            const payload={
                operator:'add',
                constant:1
            }
            publish(this.messageContext,UPDATE_COUNT_CHANNEL,payload);
            console.log('payload',payload);
           
        }else if(name==='sub'){
            const payload={
                operator:'sub',
                constant:1
            }
            publish(this.messageContext,UPDATE_COUNT_CHANNEL,payload);
            console.log('payload',payload);


        }else if(name==='mul'){
            const payload={
                operator:'mul',
                constant:2
            }
            publish(this.messageContext,UPDATE_COUNT_CHANNEL,payload);
            console.log('payload',payload);


        }
    }
}
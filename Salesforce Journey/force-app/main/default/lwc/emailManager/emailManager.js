import { LightningElement, api, track } from 'lwc';
import getEmailThreads from '@salesforce/apex/EmailManagerController.getEmailThreads';
import sendEmail from '@salesforce/apex/EmailManagerController.sendEmail';

export default class EmailManager extends LightningElement {
    @api recordId; // Parent record ID (e.g., Case or Opportunity)
    @track emailThreads = [];
    subject = '';
    body = '';
    toAddresses = '';
    ccAddresses = '';
    emailThreadsShow=false;

    connectedCallback() {
        this.loadEmailThreads();
    }

    // Fetch email threads
    loadEmailThreads() {
        getEmailThreads({ recordId: this.recordId })
            .then(result => {
                console.log('result',result);
                this.emailThreads=result;
                this.emailThreadsShow=true;
              //  this.emailThreads = result;
              //  console.log('this.emailThreads',this.emailThreads);
            })
            .catch(error => {
                console.error('Error fetching email threads:', error);
            });
    }

    // Handle input changes
    handleInputChange(event) {
        // const field = event.target.dataset.id;
        // this[field] = event.target.value;
        // console.log('field',field);
        let {name,value}=event.target;
        if(name==='toAddresses'){
            this.toAddresses=value;
            console.log('this.toAddresses',this.toAddresses);
        }
        else if(name==='ccAddresses'){
            this.ccAddresses=value;
            console.log('this.ccAddresses',this.ccAddresses);
        }else if(name==='subject'){
            this.subject=value;
            console.log('this.subject',this.subject);
        }else if(name==='body'){
            this.body=value;
            console.log('this.body',this.body);
        }
    }

    // Handle "Reply All" button click
    handleReplyAll() {
        if (this.emailThreads.length > 0) {
            const latestEmail = this.emailThreads[0];
            this.toAddresses = latestEmail.ToAddress;
            this.ccAddresses = latestEmail.CcAddress || '';
            this.subject = `Re: ${latestEmail.Subject}`;
            this.body = `\n\n--- Previous Message ---\n${latestEmail.TextBody}`;
        }
    }

    // Send email
    handleSendEmail() {
        sendEmail({
            subject: this.subject,
            body: this.body,
            toAddresses: this.toAddresses.split(','),
            ccAddresses: this.ccAddresses.split(','),
            recordId: this.recordId
        })
            .then(() => {
                this.loadEmailThreads(); // Refresh threads
                this.subject = '';
                this.body = '';
                this.toAddresses = '';
                this.ccAddresses = '';
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
    }
}

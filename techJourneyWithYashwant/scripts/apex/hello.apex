// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);

NotificationOops_Interface notify = new EmailNotification();
notify.sendNotification('Test Email');
notify = new SmsNotification();
notify.sendNotification('Test SMS');
notify = new PushNotification();
notify.sendNotification('Test Push');

SpecialDiscountCalculator d = new SpecialDiscountCalculator();
decimal dd = d.specialDiscountCalculatorMethod(1000);
System.debug('totalDiscount===' + dd);

BankBalanceOpps bb = new BankBalanceOpps();
bb.debitAmount(30);
system.debug('bb.getBalance()==' + bb.getBalance());
bb.creditAmount(20);
system.debug('bb.getBalance()==' + bb.getBalance());

DynamicPaymentProcessingOops p = new CashPaymentProcessingOops();
p.makePayment();
p = new CardPaymentProcessingOops();
p.makePayment();
p = new QRCodePaymentProcessingOops();
p.makePayment();

System.debug('Url : ' + System.URL.getOrgDomainUrl());

SpotifyIntegration.searchWithSpotify('Despacito');

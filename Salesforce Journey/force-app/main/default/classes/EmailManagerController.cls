public with sharing class EmailManagerController {
    @AuraEnabled(cacheable=true)
    public static List<EmailMessage> getEmailThreads(Id recordId) {
        return [
            SELECT Id, Subject, FromAddress, ToAddress, CcAddress, TextBody, CreatedDate
            FROM EmailMessage
            WHERE RelatedToId = :recordId
            ORDER BY CreatedDate DESC
        ];
    }

    @AuraEnabled
    public static void sendEmail(String subject, String body, List<String> toAddresses, List<String> ccAddresses, Id recordId) {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setSubject(subject);
        email.setPlainTextBody(body);
        email.setToAddresses(toAddresses);
        email.setCcAddresses(ccAddresses);
        email.setWhatId(recordId); // Associate email with the record
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { email });
    }
}

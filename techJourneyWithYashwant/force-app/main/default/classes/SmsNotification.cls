public with sharing class SmsNotification implements NotificationOops_Interface {
  public void sendNotification(string message) {
    System.debug('Sms Notification Sent to the Recipient List: ' + message);
  }
}

public with sharing class EmailNotification implements NotificationOops_Interface {
  public void sendNotification(string message) {
    System.debug('Email Notification Sent to the Recipient List: ' + message);
  }
}

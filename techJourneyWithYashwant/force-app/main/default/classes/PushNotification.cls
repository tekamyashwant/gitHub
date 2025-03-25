public with sharing class PushNotification implements NotificationOops_Interface {
  public void sendNotification(string message) {
    System.debug('Push Notification Sent to the Recipient List: ' + message);
  }
}

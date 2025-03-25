public with sharing class QRCodePaymentProcessingOops extends DynamicPaymentProcessingOops {
  public override void makePayment() {
    System.debug('Payment is done : QRCode');
  }
}

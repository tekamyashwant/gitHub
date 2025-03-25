public with sharing class CardPaymentProcessingOops extends DynamicPaymentProcessingOops {
  public override void makePayment() {
    System.debug('Payment is done : Card');
  }
}

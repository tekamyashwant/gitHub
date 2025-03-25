public with sharing class CashPaymentProcessingOops extends DynamicPaymentProcessingOops {
  public override void makePayment() {
    System.debug('Payment is done : Cash');
  }
}

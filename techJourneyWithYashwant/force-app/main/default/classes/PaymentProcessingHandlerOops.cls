public with sharing class PaymentProcessingHandlerOops {
  public void makepayment(decimal amount) {
    System.debug('Payment is done using : Cash');
  }
  public void makepayment(decimal amount, string cardNo) {
    System.debug('Payment is done using : Card');
  }
  public void makepayment(decimal amount, string qrCode, string phone) {
    System.debug('Payment is done using : QRCode');
  }
  public void processPayment(
    string paymentType,
    decimal amount,
    string cardNo,
    string qrCode,
    string phone
  ) {
    if (paymentType == 'Cash') {
      makepayment(amount);
    } else if (paymentType == 'Card') {
      makepayment(amount, cardNo);
    } else if (paymentType == 'QRCode') {
      makepayment(amount, qrCode, phone);
    } else {
      System.debug('Payment type is invalid.');
    }
  }
}

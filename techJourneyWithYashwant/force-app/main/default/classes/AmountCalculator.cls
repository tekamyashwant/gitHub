public with sharing class AmountCalculator {
  public decimal totalAmount(decimal amount) {
    return amount + this.taxCalculator(amount);
  }

  private decimal taxCalculator(decimal amount) {
    return amount * 0.10;
  }
}

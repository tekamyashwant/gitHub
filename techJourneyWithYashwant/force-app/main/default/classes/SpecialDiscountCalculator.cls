public with sharing class SpecialDiscountCalculator extends DiscountCalculatorOops {
  public decimal specialDiscountCalculatorMethod(decimal amount) {
    decimal normalDiscount = discountCalculator(amount);
    decimal specialDiscount = amount * 0.20;
    return (normalDiscount + specialDiscount);
  }
}

public with sharing virtual class DiscountCalculatorOops {
  protected decimal normalDiscount = 0.10;
  protected decimal discountCalculator(decimal amount) {
    return amount * normalDiscount;
  }
}

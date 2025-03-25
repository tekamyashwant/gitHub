public with sharing class BankBalanceOpps {
  private decimal balance = 100;
  public void debitAmount(decimal amount) {
    balance -= amount;
  }

  public void creditAmount(decimal amount) {
    balance += amount;
  }

  public decimal getBalance() {
    return balance;
  }
}

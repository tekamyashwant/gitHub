public with sharing abstract class AccountHandlerOops {
  public string accountId;
  public AccountHandlerOops(string accountId) {
    this.accountId = accountId;
  }

  public string getAccountName() {
    Account acc = [
      SELECT id, name
      FROM Account
      WHERE Id = :accountId
      WITH USER_MODE
    ];

    return acc.name;
  }
}

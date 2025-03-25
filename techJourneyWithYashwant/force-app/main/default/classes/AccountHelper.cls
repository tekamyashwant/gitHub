public with sharing class AccountHelper {
  @AuraEnabled(cacheable=true)
  public static list<Account> getAccountRecords() {
    try {
      return [
        SELECT id, Name, Industry, Rating
        FROM Account
        WITH USER_MODE
        LIMIT 30
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static list<Account> getAccountRecordsImperative(
    String inputIndustry
  ) {
    try {
      return [
        SELECT id, Name, Industry, Rating
        FROM Account
        WHERE industry = :inputIndustry
        WITH USER_MODE
        LIMIT 30
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static list<Account> getParentAccounts() {
    try {
      return [
        SELECT id, name
        FROM Account
        WHERE AnnualRevenue != NULL
        WITH USER_MODE
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static String updateAccountRecord(
    string recordId,
    string tickerSymbol
  ) {
    list<Account> accList = new List<Account>();
    Account acc = new Account(Id = recordId, TickerSymbol = tickerSymbol);
    accList.add(acc);
    try {
      update as USER accList;
      return 'Record updated successfully.';
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

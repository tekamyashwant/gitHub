public with sharing class AccountTriggerSN74Handler {
  public static void afterUpdate(
    list<Account> accList,
    Map<Id, Account> accOldMap
  ) {
    Map<id, Account> accMap = new Map<Id, Account>();
    list<Opportunity> oppListUpdate = new List<Opportunity>();
    for (Account acc : accList) {
      if (
        acc.AnnualRevenue != null &&
        acc.AnnualRevenue != accOldMap.get(acc.Id).AnnualRevenue
      ) {
        accMap.put(acc.Id, acc);
      }
    }
    if (!accMap.isEmpty()) {
      List<Opportunity> oppList = [
        SELECT id, amount, accountId
        FROM Opportunity
        WHERE accountId IN :accMap.keySet()
        WITH USER_MODE
      ];
      for (Opportunity opp : oppList) {
        opp.Amount = (accMap.get(opp.AccountId).AnnualRevenue) / oppList.size();
        oppListUpdate.add(opp);
      }
    }
    if (!oppListUpdate.isEmpty()) {
      try {
        update as USER oppListUpdate;
      } catch (Exception ex) {
        System.debug('Error while updating Opportunity.' + ex.getMessage());
      }
    }
  }
}

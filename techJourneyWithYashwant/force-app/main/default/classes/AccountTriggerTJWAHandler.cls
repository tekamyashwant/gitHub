public with sharing class AccountTriggerTJWAHandler {
  public static void beforeInsert(list<Account> accList) {
    if (!accList.isEmpty()) {
      for (Account acc : accList) {
        if ((acc.AnnualRevenue < 1000000) || (acc.AnnualRevenue == null)) {
          acc.Rating = 'Cold';
        } else if (
          (acc.AnnualRevenue >= 1000000) && (acc.AnnualRevenue < 10000000)
        ) {
          acc.Rating = 'Warm';
        } else if (acc.AnnualRevenue >= 10000000) {
          acc.Rating = 'Hot';
        }
      }
    }
  }
}

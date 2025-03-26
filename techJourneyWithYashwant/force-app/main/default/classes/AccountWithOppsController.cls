public with sharing class AccountWithOppsController {
  @AuraEnabled(Cacheable=true)
  public static list<OutputWrapper> getAccounts() {
    try {
      list<OutputWrapper> outputList = new List<OutputWrapper>();
      for (Account acc : [
        SELECT id, name, type, billingCountry, (SELECT id FROM Opportunities)
        FROM Account
        WHERE ownerID = :UserInfo.getUserId()
        LIMIT 100
      ]) {
        OutputWrapper wrapper = new OutputWrapper();
        wrapper.accId = '/' + acc.id;
        wrapper.accName = acc.name;
        wrapper.accType = acc.Type;
        wrapper.accBillingCountry = acc.billingCountry;
        wrapper.noOfOpportunities = acc.Opportunities.size();
        outputList.add(wrapper);
      }
      return outputList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  public static void deleteAccount(String accountId) {
    Account acc = [
      SELECT id, (SELECT id FROM Opportunities WHERE isClosed__c = FALSE)
      FROM Account
      WHERE id = :accountId
    ];
    if (acc.Opportunities.size() > 0) {
      throw new AuraHandledException(
        'you cannot delete account which has open OPPORTUNITIES'
      );
    } else {
      try {
        delete acc;
        System.debug('Record Deleted');
      } catch (Exception ex) {
        throw new AuraHandledException(ex.getMessage());
      }
    }
  }

  public class OutputWrapper {
    @AuraEnabled
    public string accName;

    @AuraEnabled
    public string accId;

    @AuraEnabled
    public string accType;

    @AuraEnabled
    public string accBillingCountry;

    @AuraEnabled
    public integer noOfOpportunities;
  }
}

public with sharing class contactController {
  @AuraEnabled(cacheable=true)
  public static list<Contact> getContactList() {
    try {
      list<Contact> conList = [
        SELECT Id, Name, FirstName, LastName, Title, Email, PhotoUrl, Phone
        FROM Contact
        WHERE PhotoUrl != NULL
        WITH USER_MODE
        LIMIT 10
      ];
      return conList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static list<Contact> getContactListForDataTable() {
    try {
      list<Contact> conList = [
        SELECT
          Id,
          Name,
          Title,
          Rank__c,
          Picture__c,
          Email,
          Phone,
          AccountId,
          Account.Name
        FROM Contact
        WITH USER_MODE
      ];
      return conList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

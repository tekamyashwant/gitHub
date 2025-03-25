public with sharing class ContactBrowserController {
  @AuraEnabled(cacheable=true)
  public static list<Contact> getContactList(
    String accountId,
    String accIndustry
  ) {
    try {
      String query = 'SELECT Id,Name,Email,PhotoUrl,Phone from Contact';
      list<String> filters = new List<String>();
      list<Contact> conList = new List<Contact>();
      if (String.isNotBlank(accountId)) {
        filters.add('AccountId =:accountId');
      }
      if (String.isNotBlank(accIndustry)) {
        filters.add('Contact.Account.Industry =:accIndustry');
      }
      if (!filters.isEmpty()) {
        query += ' WHERE ' + String.join(filters, ' AND ');
        query += ' WITH USER_MODE ORDER By Name';
        conList = Database.query(query);
        System.debug('conList' + conList);
      }
      return conList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

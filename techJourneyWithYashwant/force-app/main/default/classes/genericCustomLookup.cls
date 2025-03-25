public with sharing class genericCustomLookup {
  @AuraEnabled(cacheable=true)
  public static list<sObject> getRecords(
    String objectApiName,
    String searchKey
  ) {
    try {
      list<sObject> sObjectList = new List<sObject>();
      if (String.isNotBlank(searchKey)) {
        string key = '%' + searchKey + '%';
        string query =
          'Select id,Name from ' +
          objectApiName +
          ' where Name like :key';
        sObjectList = Database.query(query, accessLevel.USER_MODE);
      }
      return sObjectList;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

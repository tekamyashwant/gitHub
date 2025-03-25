public with sharing class ToDoApplicationController {
  @AuraEnabled(cacheable=true)
  public static list<Task_Manager__c> getAllIncompleteTasks() {
    try {
      return [
        SELECT id, name, Task_Date__c, Completed_Date__c, is_Completed__c
        FROM Task_Manager__c
        WHERE ownerID = :UserInfo.getUserId() AND is_Completed__c = FALSE
        WITH USER_MODE
        ORDER BY Task_Date__c ASC
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static list<Task_Manager__c> getAllCompletedTasks() {
    try {
      return [
        SELECT id, name, Task_Date__c, Completed_Date__c, is_Completed__c
        FROM Task_Manager__c
        WHERE ownerID = :UserInfo.getUserId() AND is_Completed__c = TRUE
        WITH USER_MODE
        ORDER BY Task_Date__c DESC
      ];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

public with sharing class ShowExternalOrdersController {
  @AuraEnabled(Cacheable=true)
  public static list<External_Order__x> getOrdersList() {
    try {
      return [SELECT id, DisplayUrl FROM External_Order__x LIMIT 20];
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

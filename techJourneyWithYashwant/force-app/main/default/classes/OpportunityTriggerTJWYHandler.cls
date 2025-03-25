public with sharing class OpportunityTriggerTJWYHandler {
  public static void beforeInsert(list<Opportunity> oppList) {
    if (!oppList.isEmpty()) {
      Map<Id, String> oppAccountIdMap = new Map<id, String>();
      for (Opportunity opp : [
        SELECT id, Amount, AccountId, Account.BillingCity
        FROM Opportunity
        WHERE Id IN :oppList
      ]) {
        if (opp.Amount == null || opp.Amount < 50000) {
          opp.StageName = 'Prospecting';
        } else if (opp.Amount >= 50000 && opp.Amount < 250000) {
          opp.StageName = 'Negotiation/Review';
        } else if (opp.Amount >= 250000) {
          opp.StageName = 'Closed Won';
        }
        if (opp.AccountId != null) {
          oppAccountIdMap.put(opp.Id, (String) opp.Account.BillingCity);
        }
      }
      if (!oppAccountIdMap.isEmpty()) {
        for (Opportunity opp : oppList) {
          if (String.isBlank(oppAccountIdMap.get(opp.Id))) {
            opp.addError('Opportunity cannot be created.');
            // System.debug('Opportunity already exist for this account');')
          }
        }
      }
    }
  }

  public static void beforeDelete(List<Opportunity> oppList) {
    if (!oppList.isEmpty()) {
      set<id> oppWithRelatedActivities = new Set<Id>();
      for (Opportunity opp : [
        SELECT
          id,
          (SELECT id, whatid FROM tasks),
          (SELECT id, whatid FROM events)
        FROM Opportunity
        WHERE id IN :oppList
      ]) {
        list<task> taskList = opp.tasks;
        list<event> eventList = opp.events;
        if (!taskList.isEmpty() || !eventList.isEmpty()) {
          oppWithRelatedActivities.add(opp.Id);
        }
      }
      if (!oppWithRelatedActivities.isEmpty()) {
        for (Opportunity opp : oppList) {
          if (oppWithRelatedActivities.contains(opp.Id)) {
            opp.addError('You cannot delete this opportunity');
          }
        }
      }
    }
  }
}

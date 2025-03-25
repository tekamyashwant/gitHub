public with sharing class CaseTriggerTJWYHandler {
  public static void beforeInsert(list<Case> caseList) {
    if (!caseList.isEmpty()) {
      set<String> caseEmailSet = new Set<String>();
      for (Case cs : caseList) {
        if (cs.SuppliedEmail != null && cs.contactId == null) {
          caseEmailSet.add(cs.SuppliedEmail.toLowerCase());
        }
      }

      Map<String, Id> emailIdMap = new Map<String, Id>();

      for (contact con : [
        SELECT Id, email
        FROM Contact
        WHERE email IN :caseEmailSet
      ]) {
        emailIdMap.put(con.Email, con.Id);
      }

      if (!emailIdMap.isEmpty()) {
        for (case cs : caseList) {
          if (emailIdMap.containsKey(cs.SuppliedEmail.toLowerCase())) {
            cs.ContactId = emailIdMap.get(cs.SuppliedEmail);
          }
        }
      }
    }
  }

  public static void beforeUpdate(
    list<Case> caseList,
    Map<id, case> caseOldMap
  ) {
    if (!caseList.isEmpty()) {
      for (Case cs : caseList) {
        if (
          cs.Status != caseOldMap.get(cs.id).Status &&
          cs.Status == 'Escalated'
        ) {
          cs.Priority = 'High';
        }
      }
    }
  }
}

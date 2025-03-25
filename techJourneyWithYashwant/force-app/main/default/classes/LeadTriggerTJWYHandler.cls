public with sharing class LeadTriggerTJWYHandler {
  public static void beforeInsert(list<Lead> leadList) {
    if (!leadList.isEmpty()) {
      set<String> allowedDomains = new Set<String>();
      allowedDomains.add('example.com');
      allowedDomains.add('gmail.com');
      allowedDomains.add('yahoo.com');
      allowedDomains.add('company.com');
      for (Lead l : leadList) {
        if (String.isNotBlank(l.Email)) {
          string emailDomain = l.email.substringAfter('@').toLowerCase();
          if (!allowedDomains.contains(emailDomain)) {
            l.Email = null;
          }
        }
      }
    }
  }

  public static void beforeUpdate(
    list<Lead> leadList,
    Map<id, lead> leadOldMap
  ) {
    if (!leadList.isEmpty()) {
      set<String> allowedDomains = new Set<String>();
      allowedDomains.add('example.com');
      allowedDomains.add('gmail.com');
      allowedDomains.add('yahoo.com');
      allowedDomains.add('company.com');
      for (Lead l : leadList) {
        if (
          l.Email != leadOldMap.get(l.id).Email && String.isNotBlank(l.Email)
        ) {
          String emailDomain = l.email.substringAfter('@').toLowerCase();
          if (!allowedDomains.contains(emailDomain)) {
            l.Email = null;
          }
        }
      }
    }
  }
}

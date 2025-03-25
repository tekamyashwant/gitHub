trigger OpportunityTriggerTJWY on Opportunity(before insert, before delete) {
  if (Trigger.isBefore) {
    if (Trigger.isInsert) {
      OpportunityTriggerTJWYHandler.beforeInsert(Trigger.new);
    } else if (Trigger.isDelete) {
      OpportunityTriggerTJWYHandler.beforeDelete(Trigger.old);
    }
  }
}

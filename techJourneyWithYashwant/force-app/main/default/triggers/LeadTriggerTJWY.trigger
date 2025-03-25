trigger LeadTriggerTJWY on Lead(before insert, before update) {
  if (Trigger.isBefore) {
    if (Trigger.isInsert) {
      LeadTriggerTJWYHandler.beforeInsert(Trigger.new);
    } else if (Trigger.isUpdate) {
      LeadTriggerTJWYHandler.beforeUpdate(Trigger.new, Trigger.oldMap);
    }
  }
}

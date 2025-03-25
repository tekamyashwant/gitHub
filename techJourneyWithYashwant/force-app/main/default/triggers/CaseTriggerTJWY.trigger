trigger CaseTriggerTJWY on Case(before insert, before update) {
  if (Trigger.isBefore) {
    if (Trigger.isInsert) {
      CaseTriggerTJWYHandler.beforeInsert(Trigger.new);
    } else if (Trigger.isUpdate) {
      CaseTriggerTJWYHandler.beforeUpdate(Trigger.new, Trigger.oldMap);
    }
  }
}

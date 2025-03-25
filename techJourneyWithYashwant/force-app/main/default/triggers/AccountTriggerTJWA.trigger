trigger AccountTriggerTJWA on Account(before insert) {
  if (Trigger.isBefore) {
    if (Trigger.isInsert) {
      AccountTriggerTJWAHandler.beforeInsert(Trigger.new);
    }
  }
}

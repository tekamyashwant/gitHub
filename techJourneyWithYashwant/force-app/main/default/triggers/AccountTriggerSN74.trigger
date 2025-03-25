trigger AccountTriggerSN74 on Account(after update) {
  if (Trigger.isAfter && Trigger.isUpdate) {
    AccountTriggerSN74Handler.afterUpdate(Trigger.new, Trigger.oldMap);
  }
}

trigger ContactChangeDataCaptureTrigger on ContactChangeEvent(after insert) {
  if (Trigger.isAfter) {
    if (Trigger.isInsert) {
      ContactChangeDataCaptureTriggerHandler.afterInsert(Trigger.new);
    }
  }
}

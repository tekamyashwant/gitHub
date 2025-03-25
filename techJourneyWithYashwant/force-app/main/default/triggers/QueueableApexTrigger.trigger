trigger QueueableApexTrigger on Account(after insert) {
  if (Trigger.isAfter && Trigger.isInsert) {
    System.enqueueJob(new QueueableApexTriggerClass(Trigger.new));
  }
}

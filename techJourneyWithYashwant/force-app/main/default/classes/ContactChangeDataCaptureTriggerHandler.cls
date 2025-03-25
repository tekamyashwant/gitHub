public with sharing class ContactChangeDataCaptureTriggerHandler {
  public static void afterInsert(
    list<ContactChangeEvent> ContactChangeEventList
  ) {
    if (!ContactChangeEventList.isEmpty()) {
      list<task> taskList = new List<task>();
      for (ContactChangeEvent event : ContactChangeEventList) {
        System.debug('Event ==>' + event);
        EventBus.ChangeEventHeader header = event.ChangeEventHeader;
        if (header.changetype == 'CREATE') {
          //create task
          for (String recordId : header.recordids) {
            task t = new task();
            t.Subject = 'Contact created successfully : Contact Creation';
            t.Priority = 'Normal';
            t.WhoId = recordId;
            t.OwnerId = header.commituser;
            taskList.add(t);
          }
        } else if (header.changetype == 'UPDATE') {
          if (header.changedfields.contains('Email')) {
            for (String recordId : header.recordids) {
              task t = new task();
              t.Subject = 'Contact updation successfully : Contact Updation';
              t.Priority = 'Normal';
              t.WhoId = recordId;
              t.OwnerId = header.commituser;
              taskList.add(t);
            }
          }
        }
      }
      if (!taskList.isEmpty()) {
        try {
          insert taskList;
        } catch (Exception ex) {
          System.debug('Error' + ex.getMessage());
        }
      }
    }
  }
}

public interface DisplayWrapper_Interface {
    list<sObject> getRecords();
    list<Object> wrapRecordsForUI(list<sObject> sObjectRecords);
}
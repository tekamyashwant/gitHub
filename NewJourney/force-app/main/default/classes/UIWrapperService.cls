public with sharing class UIWrapperService {
    private static Map<String,Type> objectAndUITypeToWrapperImpl=new Map<String,Type>{
        'LeadMapMarker' =>LeadMapMaker_Imple.class
    };

    public static list<sObject> getRecords(String objectAPIName, String UIType){
        DisplayWrapper_Interface wrapperInterface=(DisplayWrapper_Interface)objectAndUITypeToWrapperImpl.get(objectAPIName+UIType).newInstance();
        return wrapperInterface.getRecords();
    }

    public static list<Object> wrapRecordsForUI(List<SObject> sObjectRecords,String UIType){
        DisplayWrapper_Interface wrapperInterface=(DisplayWrapper_Interface)objectAndUITypeToWrapperImpl.get(sObjectRecords[0].getSObjectType()+''+UIType).newInstance();
            return wrapperInterface.wrapRecordsForUI(sObjectRecords);
    }

}
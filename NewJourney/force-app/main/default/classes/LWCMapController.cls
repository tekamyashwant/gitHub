public with sharing class LWCMapController {
    @AuraEnabled
    public static list<Object> getDataForUI(String objectApiName, String uiType){
        list<sObject> objList=UIWrapperService.getRecords(objectApiName, uiType);
        System.debug('objList'+objList);
        return UIWrapperService.wrapRecordsForUI(objList,uiType);
    }
}
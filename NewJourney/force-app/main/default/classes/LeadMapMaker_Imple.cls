public with sharing class LeadMapMaker_Imple implements DisplayWrapper_Interface{
    public list<sObject> getRecords(){
        list<lead> leadRecords=[Select id,State,PostalCode,Country, City,Name,Street,Description from lead
        where City!=null and Street!=null and State!=null and Country!=null and PostalCode!=null];
        return leadRecords;
    }
    public list<Object> wrapRecordsForUI(list<sObject> sObjectRecords){
        list<MapMarker> mapMarkers=new list<MapMarker>();
        for(lead leadRecord:(list<lead>)sObjectRecords){
            MapMarker marker=new MapMarker();
            MapLocation mapLocation=new MapLocation();
            mapLocation.Country=leadRecord.Country;
            mapLocation.PostalCode=leadRecord.PostalCode;
            mapLocation.Street=leadRecord.Street;
            mapLocation.City=leadRecord.City;
            marker.location=mapLocation;
            marker.title=leadRecord.Name;
            marker.description=leadRecord.Description;
            mapMarkers.add(marker);
        }
        return mapMarkers;
    }
}
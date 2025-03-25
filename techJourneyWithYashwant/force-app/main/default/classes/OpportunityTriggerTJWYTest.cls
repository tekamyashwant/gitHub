@isTest
public with sharing class OpportunityTriggerTJWYTest {
  @isTest
  public static void beforeInsertTest() {
    list<Opportunity> oppList = new List<Opportunity>();
    for (integer i = 0; i < 100; i++) {
      Opportunity opp = new Opportunity();
      opp.Name = 'Test Opp' + i;
      opp.StageName = 'Need Analysis';
      opp.CloseDate = Date.today();
      if (i < 30) {
        opp.Amount = 10000;
      } else if (i >= 30 && i < 80) {
        opp.Amount = 200000;
      } else if (i >= 80) {
        opp.Amount = 300000;
      }
      opplist.add(opp);
    }
    if (!oppList.isEmpty()) {
      Test.startTest();
      insert oppList;
      Test.stopTest();
    }
    list<Opportunity> oppListTest = [
      SELECT id, name, StageName
      FROM Opportunity
      WHERE name LIKE 'Test Opp%'
      LIMIT 1
    ];
    system.assertEquals('Prospecting', oppListTest[0].StageName);
  }
}

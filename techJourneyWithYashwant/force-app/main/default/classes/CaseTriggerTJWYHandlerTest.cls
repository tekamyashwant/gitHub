@isTest
public with sharing class CaseTriggerTJWYHandlerTest {
  @isTest
  public static void beforeInsertTest() {
    list<Contact> conList = new List<Contact>();
    for (integer i = 0; i <= 10; i++) {
      Contact con = new Contact();
      con.LastName = 'Test' + i;
      con.Email = 'test' + i + '@gmail.com';
      conList.add(con);
    }
    insert conList;

    list<Case> caseList = new List<Case>();
    for (integer i = 0; i <= 10; i++) {
      Case cs = new Case();
      cs.Origin = 'Email';
      cs.SuppliedEmail = 'test' + i + '@gmail.com';
      caseList.add(cs);
    }
    test.startTest();
    insert caseList;
    test.stopTest();
  }
  list<Contact> conListToCheck = [
    SELECT id, email
    FROM Contact
    WHERE email = 'test0@gmail.com'
  ];

  list<case> caseListToCheck = [
    SELECT id, contactId
    FROM case
    WHERE SuppliedEmail = :conListToCheck[0].Email
  ];
  integer caseCount = caseListToCheck.size();
  system.assertEquals(1, caseCount);
}

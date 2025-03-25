@isTest
public with sharing class ContactChangeDataCaptureTriggerTest {
  @isTest
  static void validateBeforeInsert() {
    Test.enableChangeDataCapture();
    Contact con = new Contact(
      lastName = 'Test CDC',
      Email = 'Test@company.com'
    );
    insert con;

    Test.getEventBus().deliver();

    list<Task> taskList = [
      SELECT id, subject
      FROM task
      WHERE subject = 'Contact created successfully : Contact Creation'
    ];
    System.assertEquals(1, taskList.size());

    Contact updateCon = new Contact(Email = 'Test@gmail.com', id = con.id);
    update updateCon;
    Test.getEventBus().deliver();
    list<Task> taskListUpdated = [
      SELECT id, subject
      FROM task
      WHERE subject = 'Contact updation successfully : Contact Updation'
    ];
    System.assertEquals(1, taskList.size());
  }
}

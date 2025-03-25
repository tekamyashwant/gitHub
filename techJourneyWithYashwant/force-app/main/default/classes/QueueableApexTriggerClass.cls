public with sharing class QueueableApexTriggerClass implements Queueable {
  list<Account> accListNewCreated;
  public QueueableApexTriggerClass(list<Account> accListNewCreated) {
    this.accListNewCreated = accListNewCreated;
  }
  public void execute(QueueableContext qCtxt) {
    list<Contact> conList = new List<Contact>();
    for (Account acc : accListNewCreated) {
      Contact con = new Contact();
      con.LastName = acc.Name;
      con.AccountId = acc.Id;
      conList.add(con);
    }
    if (conList.size() > 0) {
      try {
        insert conList;
      } catch (Exception ex) {
        System.debug('Error ==>  ' + ex.getMessage());
      }
    }
  }
}

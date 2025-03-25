public with sharing class PersonOpps {
  public string name;
  public integer age;
  public date birthdate;
  public void bioData() {
    System.debug('Name ' + name);
    System.debug('Age ' + age);
    System.debug('Birthdate ' + birthdate);
  }
}

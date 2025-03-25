public with sharing class VirtualSubClassDemoOpps extends VirtualClassDemoOpps {
  public override void virtualClassDemoMethod() {
    super.virtualClassDemoMethod();
    System.debug('This debug is from virtual sub class demo opps');
  }
}

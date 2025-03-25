public with sharing class OpportunityManagerOpps {
  public string oppName;
  public string oppStage;
  public date oppCloseDate;
  public void createOpp() {
    Opportunity op = new Opportunity();
    op.Name = oppName;
    op.StageName = oppStage;
    op.CloseDate = oppCloseDate;
    insert op;
    System.debug('op :' + op);
  }
}

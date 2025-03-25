public with sharing class PartnerAccountHandler extends AccountHandlerOops {
  public PartnerAccountHandler(string accountId) {
    super(accountId);
  }

  public string createTask(string subject) {
    task tt = new task();
    tt.subject = subject;
    tt.WhatId = accountId;
    tt.Status = 'New';
    insert tt;
    return tt.id;
  }
}

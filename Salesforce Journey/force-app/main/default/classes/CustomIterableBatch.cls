global with sharing class CustomIterableBatch implements Database.Batchable<SObject> {
    
    global Iterable<SObject> start(Database.BatchableContext BC) {
        return new CustomIterable();
    }

    global void execute(Database.BatchableContext BC, List<SObject> scope) {
        for (SObject record : scope) {
            Account acc = (Account)record;
            System.debug('Processing account: ' + acc.Name);
        }
    }

    global void finish(Database.BatchableContext BC) {
        System.debug('Batch processing complete.');
    }
}
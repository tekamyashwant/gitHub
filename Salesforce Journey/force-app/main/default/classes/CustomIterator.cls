global with sharing class CustomIterator implements Iterator<SObject> {
    private Integer index = 0;
    private List<Account> accounts;

    global CustomIterator() {
        accounts = [SELECT Id, Name FROM Account LIMIT 50];
    }

    global Boolean hasNext() {
        return index < accounts.size();
    }

    global SObject next() {
        return accounts[index++];
    }
}
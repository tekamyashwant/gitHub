global with sharing class CustomIterable implements Iterable<SObject> {
    global Iterator<SObject> iterator() {
        return new CustomIterator();
    }
}
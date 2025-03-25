public with sharing class LibraryOpps {
  public static integer totalBooks = 0;
  public LibraryOpps(integer books) {
    totalBooks += books;
  }

  public static void totalBooksCount() {
    System.debug('Total Books Count' + totalBooks);
  }
}

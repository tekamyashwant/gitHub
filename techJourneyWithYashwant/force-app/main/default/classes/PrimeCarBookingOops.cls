public with sharing class PrimeCarBookingOops extends CabBookingSevicesOops {
  public override void primeCarBookingService() {
    System.debug('This is primeCarBookingService abstract method ');
  }

  public override void bookACab() {
    super.bookACab();
    System.debug('No more a Common Method.');
  }
}

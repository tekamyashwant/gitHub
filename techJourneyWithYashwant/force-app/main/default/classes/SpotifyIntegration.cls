public with sharing class SpotifyIntegration {
  @AuraEnabled
  public static string searchWithSpotify(string trackname) {
    Http http = new http();
    HttpRequest request = new HttpRequest();
    request.setMethod('GET');
    //'https://api.spotify.com/v1/search?q=despacito&type=album&limit=1&offset=1'
    string encodedUrl = encodingUtil.urlEncode(trackname, 'UTF-8');

    request.setEndpoint(
      'callout:Spotify_NC/v1/search?q=' +
        'encodedUrl' +
        '&type=track&limit=1&offset=1'
    );
    //request.setEndpoint('https:);

    try {
      HttpResponse response = http.send(request);
      if (response.getStatusCode() == 200) {
        System.debug('response.getStatus()' + response.getStatus());
        System.debug('response.getStatusCode()' + response.getStatusCode());
        System.debug('response.getBody()' + response.getBody());
        return response.getBody();
      } else {
        throw new AuraHandledException(response.getBody());
      }
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}

/*
 * Simple functions to get an XML file whether it is stored locally or remotely.
 *
 * To run on localhost with local XML file on Chrome have to run with the following 
 * command:
 * 
 * Mac: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files
 * or open -a Google\ Chrome --args --allow-file-access-from-files
 * Linux: google-chrome --allow-file-access-from-files
 * Windows: path to your chrome installation\chrome.exe --allow-file-access-from-files
 *
 * Check flags here: chrome://version/
 *
 * WARNING: Restart Chrome without this flag before accessing the web as this flag
 *          introduces security issues.
 *          blog.chromium.org/2008/12/security-in-depth-local-web-pages.html
 *
 * @author Martin Goodfellow
 */

/*
 * Gets and returns an XML file whether it is stored locally or remotely
 */
function getXMLFile(url) {
	var xmlhttp;
	if(url.indexOf("http") != -1) {
		xmlhttp = createCORSRequest('GET', url);
      // If CORS isn't supported alert the user
  		if (!xmlhttp) {
    		alert('CORS not supported');
    		return;
  		}
  	} else {
      // XML file is local
  		xmlhttp=new XMLHttpRequest();
  		xmlhttp.open("GET",url,false);
  	}

	xmlhttp.send();
  return xmlhttp;
}

/*
 * Creates a CORS request, if supported.
 *
 * Credit to Nicholas Zakas and Monsur Hossain (http://www.html5rocks.com/en/tutorials/cors/)
 */
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}
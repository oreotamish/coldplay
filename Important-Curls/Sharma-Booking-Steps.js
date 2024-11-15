// Booking step referer needs to be booking-step/venue

fetch("https://in.bookmyshow.com/api/le/events/info/ET00131954", {
  headers: {
    "sec-ch-ua": '"Not?A_Brand";v="99", "Chromium";v="130"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "x-app-code": "WEB",
    "x-bms-le-app-code": "WEB",
    "x-region-code": "MRDG",
    Referer:
      "https://in.bookmyshow.com/events/piyush-sharma-live/ET00131954/booking-step/venue",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: null,
  method: "GET",
});

//In case of coldplay since there is only a single venue we would redirect with the following
fetch("https://in.bookmyshow.com/api/le/events/info/ET00131954", {
  headers: {
    "sec-ch-ua": '"Not?A_Brand";v="99", "Chromium";v="130"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "x-app-code": "WEB",
    "x-bms-le-app-code": "WEB",
    "x-region-code": "MRDG",
    Referer:
      "https://in.bookmyshow.com/events/piyush-sharma-live/ET00131954/booking-step/tickets?city=Mumbai&date=20241117&time=1730&venueCode=HOLN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: null,
  method: "GET",
});

// in next step we have a combination of these params - city, time, venueCode - which we already know through info
// we will use this second option since bookmyshow will most likely not show this menu if there is only one venue -- NEED TO CROSS CHECK
// From this we get a sessionId from info api - SessionID
//Check Updates - Just checked all 4 times this api is being hit it returns a single sessionId which they most likely keep in redis and increment as new users come -- NEED TO
//CROSS CHECK

//This next api is interesting as it returns max and min tickets and ticketId
fetch(
  "https://in.bookmyshow.com/nm-api/de/getEventTicketLock/ET00131954/HOLN/10030",
  {
    headers: {
      "sec-ch-ua": '"Not?A_Brand";v="99", "Chromium";v="130"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      Referer:
        "https://in.bookmyshow.com/events/piyush-sharma-live/ET00131954/booking-step/tickets?city=Mumbai&date=20241117&time=1730&venueCode=HOLN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  }
);

//Book api returns txnId and bookId and uId - Post api, figure out to work with Post request
fetch("https://in.bookmyshow.com/api/le/v1/tickets/book/HOLN/10030", {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    pragma: "no-cache",
    priority: "u=1, i",
    "sec-ch-ua": '"Not?A_Brand";v="99", "Chromium";v="130"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-app-code": "WEB",
    "x-bms-le-app-code": "WEB",
    "x-event-code": "ET00131954",
    "x-lsid": "VR52P6VDY7VR5ZDASPV9",
    "x-member-id": "72508932",
    "x-region-code": "MRDG",
    cookie:
      'bmsId=1.1472350279.1725543533802; preferences=%7B%22ticketType%22%3A%22M-TICKET%22%7D; G_ENABLED_IDPS=google; cohorts=%22Star%22; __cfruid=3a02a32b979a3b3d9815dcbe910b1eda4242f5f8-1731652064; userDetails=%7B%22deemedUserEmail%22%3A%22sinhatamish%40gmail.com%22%2C%22deemedUserMobile%22%3A%227838318839%22%2C%22countryCode%22%3A%22%2B91%22%7D; _cfuvid=hm6nEm4zIuN3nYSHyCKkbYSfZVA9v7koPdOpJFKK2s8-1731664879329-0.0.1.1-604800000; geolocation=%7B%22x-location-shared%22%3Atrue%2C%22x-location-selection%22%3A%22auto%22%2C%22lat%22%3A28.591383734178063%2C%22lon%22%3A77.44364846640008%2C%22timestamp%22%3A1731664984844%2C%22geoLocationCity%22%3A%7B%22regionCode%22%3A%22MRDG%22%2C%22regionName%22%3A%22Muradnagar%22%2C%22subCode%22%3A%22%22%2C%22subName%22%3A%22%22%2C%22regionNameSlug%22%3A%22muradnagar%22%2C%22regionCodeSlug%22%3A%22mrdg%22%2C%22Lat%22%3A%2228.768979%22%2C%22Long%22%3A%2277.483395%22%2C%22GeoHash%22%3A%22ttp%22%7D%7D; etCode=ET00131954; cf_clearance=Fs5EXnBGF5kudAlx3lVduCNx7tRSvwBNOdZVwJY7Kes-1731668385-1.2.1.1-GNOGzgKNMzb70hS0rnV0PCNsoDm0acDdsWX0poGNbWmsu1nqxY6zfZftFBEPOjEHaPicQml7xgoyYC86bUzcbXGuZZ84elIFKGmU0TkXvTZ4IKPDhqBJ5RE5MZGHNcCVzNiBmhIDfnS1dFVauRBKk5ofxckrpZaammlYxfNLNCBhuOlfh33iv2kE1CzwghR0XhYL30.7ZGiuv3zRnZeXYZL9NOLSEaSyF.0.X.0gYCJw2T7wegvA__RWOpbciGLYjVOXGn3_IeOE4jQAUnoVlWbd5NlsY3HX0mi1pGrdCvZCtOzVim6KPs54eP0TRoCZ0pcj98V6LI.k0QXBapP3RzmnrJmcqhO7TxXGiGuDQdQ9M.4S7elunIZwVfH1VOXyJxhjAZbeK_Tx8PnpcJ4SMw; platform=%7B%22code%22%3A%22WEB%22%7D; __cf_bm=jkKyG65j4n94DWf_HjK0v.sxBb4tihuubLg1fR9E1Jo-1731669071-1.0.1.1-EK6naJ4Hw_9T4duu6rh4blpKd4XSsLeKqTqoYM3LCCZrh8y6m2KEweWUbLkavYeyV4FQE76KaJPgjNaaBcisoQ; rgn={"regionNameSlug":"muradnagar","regionCodeSlug":"mrdg","regionName":"Muradnagar","regionCode":"MRDG","subName":"","subCode":"","Lat":"","Long":""}; ud={"MEMBERID":"72508932","MEMBEREMAIL":"sinhatamish@gmail.com","LSID":"VR52P6VDY7VR5ZDASPV9","SEQUENCE":"11","EXPIRY":"08/30/2123 10:12:28 pm","ISFCONNECTLOGIN":"","ISPLUSLOGIN":"Y","STATUS":"A","OTPMOBVERIFIED":"Y","EMAILVERIFIED":"Y","ACCOUNTLINKED":"NA","MOBILE":"7838318839","EMAILSUBSCRIPTION":"N","MOBILESUBSCRIPTION":"Y","NAME":"Tamish","LASTNAME":"Sinha","ISVERIFIEDMOB":"","LOYALTYVARIANTID":"","LOYALTYISSUBSCRIBED":"N","LOYALTYISTARGETTED":"N","LASTLOGIN":"2024-11-15T16:41:41+0530"}',
    Referer:
      "https://in.bookmyshow.com/events/piyush-sharma-live/ET00131954/booking-step/tickets?city=Mumbai&date=20241117&time=1730&venueCode=HOLN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: '{"body":"84YznwCKbFPxe007bH8mSsSHo/59+n3WW3UeVTV5e/FM7rXybDej7t9N/Dy6u45eVXip0D4n2Jur4F4KgQitZL9O/m9xjuv47S+91hZCZiYFLmvOPX0taUWpjOQFCLdMp9b+FajTun8/cq4IyBXrZg=="}',
  method: "POST",
});

//Now frontend would want to find booking info with all breakdowns and coupons/promotions
//Post api - referrer obviously would be ticket-options
fetch("https://in.bookmyshow.com/api/le/v1/booking-info", {
  headers: {
    accept: "*/*",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    pragma: "no-cache",
    priority: "u=1, i",
    "sec-ch-ua": '"Not?A_Brand";v="99", "Chromium";v="130"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-bms-le-app-code": "WEB",
    "x-member-id": "72508932",
    cookie:
      'bmsId=1.1472350279.1725543533802; preferences=%7B%22ticketType%22%3A%22M-TICKET%22%7D; G_ENABLED_IDPS=google; cohorts=%22Star%22; __cfruid=3a02a32b979a3b3d9815dcbe910b1eda4242f5f8-1731652064; userDetails=%7B%22deemedUserEmail%22%3A%22sinhatamish%40gmail.com%22%2C%22deemedUserMobile%22%3A%227838318839%22%2C%22countryCode%22%3A%22%2B91%22%7D; _cfuvid=hm6nEm4zIuN3nYSHyCKkbYSfZVA9v7koPdOpJFKK2s8-1731664879329-0.0.1.1-604800000; geolocation=%7B%22x-location-shared%22%3Atrue%2C%22x-location-selection%22%3A%22auto%22%2C%22lat%22%3A28.591383734178063%2C%22lon%22%3A77.44364846640008%2C%22timestamp%22%3A1731664984844%2C%22geoLocationCity%22%3A%7B%22regionCode%22%3A%22MRDG%22%2C%22regionName%22%3A%22Muradnagar%22%2C%22subCode%22%3A%22%22%2C%22subName%22%3A%22%22%2C%22regionNameSlug%22%3A%22muradnagar%22%2C%22regionCodeSlug%22%3A%22mrdg%22%2C%22Lat%22%3A%2228.768979%22%2C%22Long%22%3A%2277.483395%22%2C%22GeoHash%22%3A%22ttp%22%7D%7D; etCode=ET00131954; cf_clearance=Fs5EXnBGF5kudAlx3lVduCNx7tRSvwBNOdZVwJY7Kes-1731668385-1.2.1.1-GNOGzgKNMzb70hS0rnV0PCNsoDm0acDdsWX0poGNbWmsu1nqxY6zfZftFBEPOjEHaPicQml7xgoyYC86bUzcbXGuZZ84elIFKGmU0TkXvTZ4IKPDhqBJ5RE5MZGHNcCVzNiBmhIDfnS1dFVauRBKk5ofxckrpZaammlYxfNLNCBhuOlfh33iv2kE1CzwghR0XhYL30.7ZGiuv3zRnZeXYZL9NOLSEaSyF.0.X.0gYCJw2T7wegvA__RWOpbciGLYjVOXGn3_IeOE4jQAUnoVlWbd5NlsY3HX0mi1pGrdCvZCtOzVim6KPs54eP0TRoCZ0pcj98V6LI.k0QXBapP3RzmnrJmcqhO7TxXGiGuDQdQ9M.4S7elunIZwVfH1VOXyJxhjAZbeK_Tx8PnpcJ4SMw; platform=%7B%22code%22%3A%22WEB%22%7D; __cf_bm=jkKyG65j4n94DWf_HjK0v.sxBb4tihuubLg1fR9E1Jo-1731669071-1.0.1.1-EK6naJ4Hw_9T4duu6rh4blpKd4XSsLeKqTqoYM3LCCZrh8y6m2KEweWUbLkavYeyV4FQE76KaJPgjNaaBcisoQ; rgn={"regionNameSlug":"muradnagar","regionCodeSlug":"mrdg","regionName":"Muradnagar","regionCode":"MRDG","subName":"","subCode":"","Lat":"","Long":""}; ud={"MEMBERID":"72508932","MEMBEREMAIL":"sinhatamish@gmail.com","LSID":"VR52P6VDY7VR5ZDASPV9","SEQUENCE":"11","EXPIRY":"08/30/2123 10:12:28 pm","ISFCONNECTLOGIN":"","ISPLUSLOGIN":"Y","STATUS":"A","OTPMOBVERIFIED":"Y","EMAILVERIFIED":"Y","ACCOUNTLINKED":"NA","MOBILE":"7838318839","EMAILSUBSCRIPTION":"N","MOBILESUBSCRIPTION":"Y","NAME":"Tamish","LASTNAME":"Sinha","ISVERIFIEDMOB":"","LOYALTYVARIANTID":"","LOYALTYISSUBSCRIBED":"N","LOYALTYISTARGETTED":"N","LASTLOGIN":"2024-11-15T16:41:41+0530"}; selectedQty=2; lngTransId=4468070673; UID=783d3684-4f3d-4076-82da-91f691d1339f; bookingId=HOLN0117PBEBZS; transactionInformation=%7B%22transactionId%22%3A%224468070673%22%2C%22transactionUID%22%3A%22783d3684-4f3d-4076-82da-91f691d1339f%22%2C%22bookingId%22%3A%22HOLN0117PBEBZS%22%2C%22userPreference%22%3A%7B%22ticketType%22%3A%22mTicket%22%7D%2C%22numberOfTickets%22%3A2%2C%22eventCode%22%3A%22ET00131954%22%2C%22venueCode%22%3A%22HOLN%22%2C%22flow%22%3A%22events%22%2C%22eventType%22%3A%22CT%22%2C%22presaleUUID%22%3A%22%22%7D',
    Referer:
      "https://in.bookmyshow.com/events/piyush-sharma-live/ET00131954/ticket-options",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: '{"UID":"783d3684-4f3d-4076-82da-91f691d1339f","transactionID":4468070673,"isNewUrl":false}',
  method: "POST",
});

//final Payment Step
fetch(
  "https://in.bookmyshow.com/payment/?webview=true&cid=&sid=10030&ety=&ec=ET00131954&event_code=ET00131954",
  {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      priority: "u=0, i",
      "sec-ch-ua": '"Not?A_Brand";v="99", "Chromium";v="130"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "service-worker-navigation-preload": "true",
      "upgrade-insecure-requests": "1",
      cookie:
        "bmsId=1.1472350279.1725543533802; preferences=%7B%22ticketType%22%3A%22M-TICKET%22%7D; G_ENABLED_IDPS=google; __cfruid=3a02a32b979a3b3d9815dcbe910b1eda4242f5f8-1731652064; userDetails=%7B%22deemedUserEmail%22%3A%22sinhatamish%40gmail.com%22%2C%22deemedUserMobile%22%3A%227838318839%22%2C%22countryCode%22%3A%22%2B91%22%7D; _cfuvid=hm6nEm4zIuN3nYSHyCKkbYSfZVA9v7koPdOpJFKK2s8-1731664879329-0.0.1.1-604800000; geolocation=%7B%22x-location-shared%22%3Atrue%2C%22x-location-selection%22%3A%22auto%22%2C%22lat%22%3A28.591383734178063%2C%22lon%22%3A77.44364846640008%2C%22timestamp%22%3A1731664984844%2C%22geoLocationCity%22%3A%7B%22regionCode%22%3A%22MRDG%22%2C%22regionName%22%3A%22Muradnagar%22%2C%22subCode%22%3A%22%22%2C%22subName%22%3A%22%22%2C%22regionNameSlug%22%3A%22muradnagar%22%2C%22regionCodeSlug%22%3A%22mrdg%22%2C%22Lat%22%3A%2228.768979%22%2C%22Long%22%3A%2277.483395%22%2C%22GeoHash%22%3A%22ttp%22%7D%7D; etCode=ET00131954; venueAppType=BT; venueCode=HOLN; isWebView=N; platform=%7B%22code%22%3A%22WEB%22%2C%22version%22%3A0%2C%22eventType%22%3A%22ET%22%7D; Rgn=%7CCode%3DMRDG%7Cslug%3Dmuradnagar%7Ctext%3DMuradnagar%7C; APPDETAILS_ALL=%7B%22FB%22%3A%22%7CFB_APPID%3D165665113451029%7CFB_PRIVILEGES%3Demail%2Cpublic_profile%2Cuser_birthday%2Cuser_gender%7CAPPID_LIST%3D165665113451029%7CCHECKLIST%3DY%7CFB_URL%3Dhttps%3A%2F%2Fgraph.facebook.com%2Fv3.2%7C%22%2C%22PLUS%22%3A%22%7CGOOGLELOGIN_ACTION%3Dhttp%3A%2F%2Fschemas.google.com%2FAddActivity%7CGOOGLELOGIN_CLIENTID%3D990572338172-iibth2em4l86htv30eg1v44jia37fuo5.apps.googleusercontent.com%7CGOOGLELOGIN_PRIVILEGES%3Dprofile%26nbsp%3B%20openid%26nbsp%3Bemail%7C%22%7D; cf_clearance=680jz05KRceb_KZRm4.I8ijdPeZm02tP55tbJ68EAUY-1731669944-1.2.1.1-EXfpYuCtgn7qoKzL0MfJt6U5aBaYaIt_JP1a44kXZ.wSRq0zOZA5AvUp3zbU5CLImQlB.x3.h3Mqgs19XzCFjExvSVdWLm0IAlcg4kv7C.uN4dXGuQuMd_6fAZDDaKFzfQi_nzCEnWeJzRO5X.Z.NJPbNkoGyR7XHbZJeh86CptIStFMVufILKJfUyas.Rwy6Fqr49NL6Ifer0Eljql_rPvPt2LcqxJbiMf6hIfS9YOVe5GWdkn1X18pBOR7dfGIo8GWi8uBAentyWN5u17w2kTZxAytLdQwIdJYBxueFVovF_i4Kq3tZ7qrS2.PD2.B4pxBsJarLW_2RKV5xZFqGDJ3dtrSYlSFAk3E_UQy_AbhutwcyjlcG7w4mHus3xCAR2k89dY2idJtG2zGEuO5Ww; ld=%7CMEMBERID%3D72508932%7CMEMBEREMAIL%3Dsinhatamish%40gmail.com%7CLSID%3DVR52P6VDY7VR5ZDASPV9%7CSEQUENCE%3D11%7CEXPIRY%3D08%2F30%2F2123%2010%3A12%3A28%20pm%7CISFCONNECTLOGIN%3D%7CISPLUSLOGIN%3DY%7CSTATUS%3DA%7COTPMOBVERIFIED%3DY%7CEMAILVERIFIED%3DY%7CACCOUNTLINKED%3DNA%7CMOBILE%3D7838318839%7CEMAILSUBSCRIPTION%3DN%7CMOBILESUBSCRIPTION%3DY%7CNAME%3DTamish%7CLASTNAME%3DSinha%7CISVERIFIEDMOB%3D%7CLOYALTYVARIANTID%3D%7CLOYALTYISSUBSCRIBED%3DN%7CLOYALTYISTARGETTED%3DN%7CLASTLOGIN%3D2024-11-15T16%3A55%3A41%2B0530%7CLASTLOGIN%3D2024-11-15T16%3A55%3A50%2B0530%7C; selectedQty=1; userCine=%7COtpRebookLink%3Dhttp%253A%252F%252Fin.bookmyshow.com%252Fevents%252Fbanker-op-in-the-house-ft-piyush-sharma%252FET00131954%253Fcid%253DHOLN%2526sid%253D10030%7CRP%3DY%7CPAYTAB%3DDebitCreditCard%7CRPT%3D4468074329%7CRPC%3D1%7Cety%3DCT%7CSSID%3D10030%7CSVC%3DHOLN%7C; __cf_bm=85zm5h.g_lIqlYBq0yjIGl_leJr4PyV.dC8rnOMIlxE-1731669972-1.0.1.1-YdLUWKg6W7g2KlI5G3xNOHuvkVSsYVkB.WOzhqN83yLPPr7f16jwTSbPklnzbMm.pv9Xaala4WFI94wnmtzu1g; ud=%7B%22MEMBERID%22%3A%2272508932%22%2C%22MEMBEREMAIL%22%3A%22sinhatamish%40gmail.com%22%2C%22LSID%22%3A%22VR52P6VDY7VR5ZDASPV9%22%2C%22SEQUENCE%22%3A%2211%22%2C%22EXPIRY%22%3A%2208%2F30%2F2123%2010%3A12%3A28%20pm%22%2C%22ISFCONNECTLOGIN%22%3A%22%22%2C%22ISPLUSLOGIN%22%3A%22Y%22%2C%22STATUS%22%3A%22A%22%2C%22OTPMOBVERIFIED%22%3A%22Y%22%2C%22EMAILVERIFIED%22%3A%22Y%22%2C%22ACCOUNTLINKED%22%3A%22NA%22%2C%22MOBILE%22%3A%227838318839%22%2C%22EMAILSUBSCRIPTION%22%3A%22N%22%2C%22MOBILESUBSCRIPTION%22%3A%22Y%22%2C%22NAME%22%3A%22Tamish%22%2C%22LASTNAME%22%3A%22Sinha%22%2C%22ISVERIFIEDMOB%22%3A%22%22%2C%22LOYALTYVARIANTID%22%3A%22%22%2C%22LOYALTYISSUBSCRIBED%22%3A%22N%22%2C%22LOYALTYISTARGETTED%22%3A%22N%22%2C%22LASTLOGIN%22%3A%222024-11-15T16%3A55%3A50%2B0530%22%7D; rgn=%7B%22regionNameSlug%22%3A%22muradnagar%22%2C%22regionCodeSlug%22%3A%22mrdg%22%2C%22regionName%22%3A%22Muradnagar%22%2C%22regionCode%22%3A%22MRDG%22%2C%22subName%22%3A%22%22%2C%22subCode%22%3A%22%22%2C%22Lat%22%3A%22%22%2C%22Long%22%3A%22%22%7D; cohorts=%22Star%22; lngTransId=4468074632; UID=3dfae444-4de8-4faf-bf5d-5de8e19f12b1; bookingId=HOLN011864EFUG; transactionInformation=%7B%22transactionId%22%3A%224468074632%22%2C%22transactionUID%22%3A%223dfae444-4de8-4faf-bf5d-5de8e19f12b1%22%2C%22bookingId%22%3A%22HOLN011864EFUG%22%2C%22userPreference%22%3A%7B%22ticketType%22%3A%22mTicket%22%7D%2C%22numberOfTickets%22%3A1%2C%22eventCode%22%3A%22ET00131954%22%2C%22venueCode%22%3A%22HOLN%22%2C%22flow%22%3A%22events%22%2C%22eventType%22%3A%22CT%22%2C%22presaleUUID%22%3A%22%22%2C%22eTicket%22%3Afalse%2C%22mTicket%22%3Afalse%2C%22hdTicket%22%3Afalse%2C%22pkTicket%22%3Afalse%7D",
      Referer:
        "https://in.bookmyshow.com/events/piyush-sharma-live/ET00131954/ticket-options",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  }
);

("https://in.bookmyshow.com/events/coldplay-music-of-the-spheres-world-tour/ET00418889/ticket-options");

("https://in.bookmyshow.com/payment/?webview=true&cid=&sid=10088&ety=&ec=ET00418889&event_code=ET00418889");

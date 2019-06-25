var HTTPS = require('https');
var cool = require('cool-ascii-faces');
const fetch = require('node-fetch');
const dateFns = require('date-fns');

var botID = process.env.BOT_ID;
let mostRecentID = '';

const base = 'https://api.aerisapi.com/lightning/';
const clientID = process.env.CLIENT_ID;
const secret = process.env.SECRET;

// fetch lightning information from aeris API
// location: wildwood, mo
// radius: 10 mi
const getData = async () => {

  const response = await fetch(base + `closest?p=wildwood,mo&format=json&radius=10mi&filter=cg&limit=1&client_id=${clientID}&client_secret=${secret}`);
  const data = await response.json();
  return data;

};

const check = async () => {
  const info = await getData();

  if (!info.error){
    const when = dateFns.distanceInWordsToNow(
        info.response[0].ob.dateTimeISO,
        { addSuffix: true }
    );

    const distance = info.response[0].relativeTo.distanceMI;
    const long = info.response[0].loc.long;
    const lat = info.response[0].loc.lat;

    const msg = `Lightning struck ${distance} miles away ${when}`;
    if (info.response[0].id !== mostRecentID){
      postWithLoc(msg, long, lat);
    }
    mostRecentID = info.response[0].id;
  }

  const now = dateFns.format(new Date(), 'MMM Do [at] h:m:s a');
  console.log(`checked for lightning at: ${now}, ${info.error.description}`);
};

function respond() {
  this.res.writeHead(200);

  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/cool guy$/;
  const checkRegex = /^\/check$/;
  const benRegex = /ben/;

  if(request.text && botRegex.test(request.text)) {
    postMessage(cool());
  } else if (request.text && checkRegex.test(request.text)){
    getData().then(data => postMessage(JSON.stringify(data)));
  } else if (request.text && benRegex.test(request.text.toLowerCase())){
    postMessage('that\'s the name of my creator!!');
  } else {
    console.log("don't care");
  }
  this.res.end();
}

function postMessage(botResponse) {
  var options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

const postWithLoc = (botResponse, long, lat) => {
  var options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse,
    "attachments" : [
      {
        "type"  : "location",
        "lng"   : long.toString(),
        "lat"   : lat.toString(),
        "name"  : "Nearest lightning"
      }
    ]
  };

  console.log('sending ' + botResponse + ' WITH LOCATION to ' + botID);

  botReq = HTTPS.request(options, res => {
      if(res.statusCode != 202) {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });
  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
};


exports.respond = respond;
exports.check = check;
exports.postMessage = postMessage;
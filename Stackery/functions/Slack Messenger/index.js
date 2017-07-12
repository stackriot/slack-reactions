const stackery = require('stackery');
const https = require('https');
const querystring = require('querystring');

module.exports = function slackMessenger(message = 'Testing...') {
  const postData = querystring.stringify({
    'token': 'xoxb-208403178736-ltUgJR1vruwFMwDD8za0HdCl',
    'channel': 'general',
    'text': 'Hello fuckface',
  });
  const options = {
    hostname: 'slack.com',
    path: '/api/chat.postMessage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  // is a promise really necessary here?
  return new Promise((resolve, reject) => {
    const request = https.request(options, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        const err = new Error(`Request failed (${response.statusCode})`);
        console.log(err);
        reject(err);
      } else {
        const data = [];
        response.on('data', (chunk) => data.push(chunk));
        response.on('end', () => {
          console.log(data.join(''));
          resolve(data.join(''));
        });
      }
    });
    request.on('error', (err) => {
      console.log(err);
      reject(err);
    });
    request.write(postData);
    request.end();
  }); 
}

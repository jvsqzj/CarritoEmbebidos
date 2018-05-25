const TelegramBot = require('node-telegram-bot-api');
var os = require('os');
 

//Read server ip
var ifaces=os.networkInterfaces();
var ips = [];
for (var dev in ifaces) {
  var alias=0;
  ifaces[dev].forEach(function(details){
    if (details.family=='IPv4') {
      ips.push(details.address);
      ++alias;
    }
  });
}
var ip = ips.filter(function(d) {
  return d != '127.0.0.1';
})[0];
var port = 8080;


// replace the value below with the Telegram token you receive from @BotFather
const token = '367979567:AAG9MlxEjb1dontUthBCvtTrIsxLLEP8DrU';
 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
 
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message
 
  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
 
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});
 
// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
 
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, ip + ":" + port);
});
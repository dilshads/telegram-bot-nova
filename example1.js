// Require the TelegramBot class.
const TelegramBot = require('./telegram-bot-nova')

// Declare a new instance and connect by your bot token.
var bot = new TelegramBot('YOUR_BOT_TOKEN')

// Setup catched events to make your bot responsive.
bot.on('command', (chat, date, from, messageId, text, command, commandData) => {
  'use strict'

  // start command example.
  if (command === 'start') {
    bot.sendText(chat.id, 'Hi ' + from.first_name + '. Try typing: /run hello world')
    return
  }

  // Another command example.
  if (command === 'run') {
    let lines = [
      'chat: ' + chat.id,
      'chat.type: ' + chat.type,
      'date: ' + date,
      'from.first_name: ' + from.first_name,
      'command: ' + command,
      'commandData: ' + commandData
    ]
    bot.sendText(chat.id, lines.join('\n'))
  }
})

'use strict'

// Require the TelegramBot class.
const TelegramBot = require('./telegram-bot-nova')

// Declare a new instance and connect by your bot token.
var bot = new TelegramBot('YOUR_BOT_TOKEN')

// Example value that can be changed by pressing the Inline Keyboard Toggle button.
var bool = true

// Setup events to make your bot responsive.
bot.on('command', (chat, date, from, messageId, text, command, commandData) => {
  if (command === 'start') {
    var lines = [
      '/example1 Inline Keyboard',
      '',
      '/example2 Reply Keyboard'
    ]
    bot.sendText(chat.id, lines.join('\n'))
  }

  if (command === 'example1') {
    // The first array determines the line of the button.
    // The second array inside determines the column of that line.
    // The object inside the secondary array is the button objects.
    let keyboard = {
      'inline_keyboard': [
        [
          {'text': 'Google Link', 'url': 'http://www.google.com/'},
          {'text': 'Toggle ' + (bool ? 'Off' : 'On'), 'callback_data': 'run_example1'}
        ]
      ]
    }

    // The reply_markup property requires to have a JSON.stringify of the keyboard object contents.
    // Having the object without it stringify won't work.
    let data = {
      'reply_markup': JSON.stringify(keyboard)
    }

    // The message will at least need some text.
    bot.sendText(chat.id, 'Inline Keyboard\nSetting: ' + (bool ? 'On' : 'Off'), data)
    return
  }

  if (command === 'example2') {
    // Be aware that the "keyboard" button objects aren't the same as "inline_keyboard" ones.
    let keyboard = {
      'keyboard': [
        [
          {'text': '1'},
          {'text': '2'},
          {'text': '3'}
        ],
        [
          {'text': '/close'}
        ]
      ]
    }

    let data = {
      'reply_markup': JSON.stringify(keyboard)
    }

    bot.sendText(chat.id, '' + bool, data)
    return
  }

  if (command === 'close') {
    // You'll need to use this to be able to close the keyboard.
    var keyboard = {
      'remove_keyboard': true
    }

    var data = {
      'reply_markup': JSON.stringify(keyboard)
    }

    bot.sendText(chat.id, 'Keyboard Closed', data)
  }
})

bot.on('KeyboardCallbackData', (chat, from, messageId, callbackData) => {
  'use-strict'

  // The "callbackData" value contains the "callback_data" from this button above.
  // {"text": "Toggle " + (bool ? "Off" : "On"), "callback_data": "run_example1"}

  // This example shows how to toggle a value and show the changes.
  if (callbackData === 'run_example1') {
    if (bool === true) {
      bool = false
    } else {
      bool = true
    }

    // Notice how the value is changed before getting the new values of the keyboard.
    // This is so you can do possible validation of the toggled value.
    // One example would be checking if the user is a group administrator or not.
    var keyboard = {
      'inline_keyboard': [
        [
          {'text': 'Google Link', 'url': 'http://www.google.com/'},
          {'text': 'Toggle ' + (bool ? 'Off' : 'On'), 'callback_data': 'run_example1'}
        ]
      ]
    }

    var data = {
      'reply_markup': JSON.stringify(keyboard)
    }

    // After the status value is changed. This will update the message with the button on.
    // This is so it'll display the new correct value while returning an updated keyboard.
    bot.editText(chat.id, messageId, 'Inline Keyboard\nSetting: ' + (bool ? 'On' : 'Off'), data)
  }
})

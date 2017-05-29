# TelegramBot Node.js getUpdates Method

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![completion](https://img.shields.io/badge/completion-97%25-orange.svg)]()
[![contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](#contributing)
[![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)]()
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![status](https://img.shields.io/badge/status-stable-brightgreen.svg)]()

Badges from [Shields.io](http://shields.io)

* [Setting Up](#setting-up)
* [Declaring](#declaring)
    * [Simple Method](#simple-method)
    * [Advanced Method](#advanced-method)
* [Events](#events)
    * [onAny](#onany)
    * [onAudio](#onaudio)
    * [onCommand](#oncommand)
    * [onContact](#oncontact)
    * [onEditText](#onedittext)
    * [onError](#onerror)
    * [onFile](#onfile)
    * [onForwardAny](#onforwardany)
    * [onForwardAudio](#onforwardaudio)
    * [onForwardContact](#onforwardcontact)
    * [onForwardFile](#onforwardfile)
    * [onForwardPhoto](#onforwardphoto)
    * [onForwardSticker](#onforwardsticker)
    * [onForwardText](#onforwardtext)
    * [onForwardVenue](#onforwardvenue)
    * [onForwardVideo](#onforwardVideo)
    * [onForwardVoice](#onforwardvoice)
    * [onGroupJoin](#ongroupjoin)
    * [onGroupLeft](#ongroupleft)
    * [onInlineQuery](#oninlinequery)
    * [onKeyboardCallbackData](#onkeyboardcallbackdata)
    * [onPhoto](#onphoto)
    * [onPinnedAny](#onpinnedany)
    * [onPinnedAudio](#onpinnedaudio)
    * [onPinnedContact](#onpinnedcontact)
    * [onPinnedFile](#onpinnedfile)
    * [onPinnedPhoto](#onpinnedphoto)
    * [onPinnedSticker](#onpinnedsticker)
    * [onPinnedText](#onpinnedtext)
    * [onPinnedVenue](#onpinnedvenue)
    * [onPinnedVideo](#onpinnedvideo)
    * [onPinnedVoice](#onpinnedvoice)
    * [onStartup](#onstartup)
    * [onSticker](#onsticker)
    * [onText](#ontext)
    * [onVenue](#onvenue)
    * [onVideo](#onvideo)
    * [onVoice](#onvoice)
* [Actions](#actions)
    * [answerInlineQuery](#answerinlinequery)
    * [deleteMessage](#deletemessage)
    * [editHtml / editMarkdown / editText](#edithtml--editmarkdown--edittext)
    * [forwardMessage](#forwardmessage)
    * [getBotUsername](#getbotusername)
    * [getChat](#getchat)
    * [getChatAdministrators](#getchatadministrators)
    * [getChatMember](#getchatmember)
    * [getChatMembersCount](#getchatmemberscount)
    * [getDebug](#getdebug)
    * [getLoopDelay](#getloopdelay)
    * [getMe](#getme)
    * [getPort](#getport)
    * [getStartupTime](#getstartuptime)
    * [getUserProfilePhotos](#getuserprofilephotos)
    * [kickChatMember](#kickchatmember)
    * [leaveChat](#leavechat)
    * [sendAudio](#sendaudio)
    * [sendChatAction](#sendchataction)
    * [sendContact](#sendcontact)
    * [sendFile](#sendfile)
    * [sendPhoto](#sendphoto)
    * [sendHtml / sendMarkdown / sendText](#sendhtml--sendmarkdown--sendtext)
    * [sendVenue](#sendvenue)
    * [sendVideo](#sendvideo)
    * [sendVoice](#sendvoice)
    * [setDebug](#setdebug)
    * [setLoopDelay](#setloopdelay)
    * [setPort](#setport)
    * [toString](#tostring)
    * [unbanChatMember](#unbanchatmember)
* [Object Dictionary](#object-dictionary)
* [FAQ](#faq)

All the returned objects can be found under this section on the [Telegram Bot API/Available Types](https://core.telegram.org/bots/api#available-types) page. The first 2 **{Chat Object}** and **{User Object}** will be the most common ones. Keep note of their values that are optional since you'll need to condition check if they are given or not.

**Note: This documentation and class aren't yet complete.**

## Setting Up
In order to setup your bot. You'll need to download the .zip and extract the contents on your drive. Your Desktop will be fine.

Next you'll need to open **example1.js** in your preferred code editor. Some example software are:

* **Linux**: [Bluefish](http://bluefish.openoffice.nl), [Visual Studio Code](https://code.visualstudio.com)
* **Mac**: Sorry I don't know what to suggest for Mac.
* **Windows**: [Notepad++](https://notepad-plus-plus.org), [Visual Studio Code](https://code.visualstudio.com)

Inside, replace `YOUR_BOT_TOKEN` with your bot token you obtained from BotFather. If you do not have a bot token. Open your Telegram app and search for [@BotFather](https://t.me/BotFather) and PM him. This is used for setting up a bot account and being given an URL code for it.

Now you're ready to run and test the example. You should already have Node.js installed on your operating system. For Windows it's just a simple install, for other OS you may have issues.

To test if it's installed. Open Command Prompt if you're on Windows or Terminal if you're on Linux and enter: `node --version` which just prints the current version of node installed.

If success. Simple have your command terminal open and enter: `node "location/of/example1.js"` Operating system directories are different so, if your command terminal supports it, you can just click-and-drag **app.js** into it after the space.

## Declaring
In order to use this class. You'll need to require the TelegramBot.js class into your script and declare an instance.

### Simple Method

```javascript
// Require the TelegramBot class.
const TelegramBot = require('./TelegramBot')

// Declare a bot instance and connect by your bot token.
var bot = new TelegramBot('YOUR_BOT_TOKEN')

// From here. Just attach events and actions to "bot" directly.
// See the examples under events and actions here or example1.js file.
```

### Advanced Method

```javascript
// Require the TelegramBot class.
const TelegramBot = require('./TelegramBot')

// Declare a bot instance and connect by your bot token with additional settings.
var bot = new TelegramBot('YOUR_BOT_TOKEN', {
  'debug': false,
  'loopDelay': 3000,
  'method': 'POST',
  'port': 443
})
```

You can adjust these default settings during declaration under this example. Missing properties will be set as these defaults.

* `debug` **{Boolean}** Prints full JSON of the getUpdates obtained on the console screen.
* `loopDelay` **{Number}** The number of milliseconds per getUpdates request and events of processed and triggered.
* `method` **{String}** The http request method to use. Can either use "GET" or "POST". POST is default and recommended since it can send larger queries and is more secure. Although a downside there's a chance it can send a double request.
* `port` **{Number}** The port number to use.

## Events
To setup up an event. You'll need to had required the bot class and declared a bot variable. I've added easy copy and paste examples under each event to make it easily to add to your script.

### onAny
Gets called on any type of event.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who triggered the event.
* `messageId` **{Number}** The message reference.

E.g

```javascript
var userIds = []

bot.onAny = function (chat, from, messageId) {
  userIds.push(from.id)
}
```

### onAudio
Gets called every time the bot sees a `.mp3` sound file.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who send the audio.
* `messageId` **{Number}** The message reference.
* `caption` **{String}** Caption text. No caption is "".
* `audio` **{Audio Object}** Audio information. Use `audio.file_id` to keep track of the audios seen.

E.g

```javascript
var audioIds = []
bot.onAudio = function (chat, from, messageId, caption, audio) {
  if (chat.username === 'ExampleGroup') {
    audioIds.push(audio.file_id)
  }
}
```

This example shows how to effectively make your bot memorize audios.

### onCommand
Gets called every time the bot sees a command.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who used the command.
* `messageId` **{Number}** The message reference.
* `text` **{String}** Full command message.
* `command` **{String}** The command that was used. (E.g "start" when the user enters "/start".).
* `commandData` **{String}** The remaining text after the first space. No data is "". (E.g "hi" when user enters "/start hi".)

E.g

```javascript
bot.onCommand = function (chat, from, messageId, text, command, commandData) {
  if (command === 'start') {
    bot.sendText(chat.id, 'Hello world.')
  }
}
```

### onContact
Calls when a user sends a contact.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the file.
* `messageId` **{Number}** The message reference.
* `contact` **{Contact Object}** Contact information.

E.g

```javascript
bot.onContact = function (chat, from, contact, messageId) {
  console.log('Name: ' + contact.first_name)
  console.log('Number: ' + contact.phone_number)
}
```

### onEditText
Calls when a message is edited. However, this excludes supergroups if the bot isn't an administrator. Note that this event does not return the orginal text before.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the message.
* `messageId` **{Number}** Message reference.
* `newText` **{String}** Message text.

E.g

```javascript
bot.onEditText = function (chat, from, messageId, newText) {
  console.log(from.first_name + ' edited message ' + messageId)
  console.log('in ' + chat.first_name + ' with ' + newText)
}
```

### onError
Calls when an error occurs in an instance event.

*Arguments*
* `event` **{String}** Name of the event.
* `error` **{Error}** The error object that was returned.

E.g

```javascript
bot.onError = function (event, error) {
  console.error(event)
  console.error(error)
}

bot.onStartup = function () {
  undefinedFunction()
}
```

`undefinedFunction` doesn't exist so `bot.onError` will get called.

### onFile
Calls when a user sends a file. Full quality non-thumbnail images are counted files.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the file.
* `messageId` **{Number}** The message reference.
* `caption` **{String}** File caption text. Is `undefined` if one isn't included.
* `file` **{Document Object}** File information. Use `file.file_id` to keep track of the files seen.

E.g

```javascript
var files = []
bot.onFile = function (chat, from, messageId, caption, file) {
  if (chat.username === 'ExampleChannel') {
    files.push(file.file_id)
  }
}

```

This example shows how to effectively make your bot memorize files.

### onForwardAny
Gets called every time the bot sees any forward content. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. This gets called first before any other onForward events.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who forwarded the message.
* `messageId` **{Number}** Message reference.
* `user` **{User Object}** The owner of the content that was forwarded.

E.g

```javascript
bot.onForwardAny = function (chat, from, messageId, user) {
  console.log(from.first_name + ' forwarded ' + user.firstname + "'s content.")
}
```

### onForwardAudio
Gets called every time the bot sees a forwarded `.mp3` sound file. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who send the audio.
* `messageId` **{Number}** The message reference.
* `user` **{User Object}** The owner of the content that was forwarded.
* `audio` **{Audio Object}** Audio information. Use `audio.file_id` to keep track of the audios seen.

E.g

```javascript
var audioIds = []
bot.onForwardAudio = function (chat, from, messageId, user, audio) {
  if (chat.username === 'ExampleGroup') {
    audioIds.push(audio.file_id)
  }
}
```

This example shows how to effectively make your bot memorize forwarded audios.

### onForwardContact
Gets called every time the bot sees a forwarded contact. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the file.
* `messageId` **{Number}** The message reference.
* `user` **{User Object}** The owner of the content that was forwarded.
* `contact` **{Contact Object}** Contact information.

E.g

```javascript
bot.onForwardContact = function (chat, from, contact, user, messageId) {
  console.log('Forwarded Name: ' + contact.first_name)
  console.log('Forwarded Number: ' + contact.phone_number)
}
```

### onForwardFile
Gets called every time the bot sees a forwarded file. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the file.
* `messageId` **{Number}** The message reference.
* `user` **{User Object}** The owner of the content that was forwarded.
* `file` **{Document Object}** File information. Use `file.file_id` to keep track of the files seen.

E.g

```javascript
var files = []
bot.onForwardFile = function (chat, from, messageId, user, file) {
  if (chat.username === 'ExampleChannel') {
    files.push(file.file_id)
  }
}
```

This example shows how to effectively make your bot memorize files.

### onForwardPhoto
Gets called every time the bot sees a forwarded photo. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who forwarded the message.
* `messageId` **{Number}** Message reference.
* `user` **{User Object}** The owner of the content that was forwarded.
* `photo` **{Array} of {PhotoSize Object}** Provides photo information.

E.g

```javascript
var photos = []
bot.onForwardPhoto = function (chat, from, messageId, user, photo) {
  if (chat.username === '@ExampleChannel') {
    photos.push(photo[photo.length - 1].file_id)
  }
}
```

This example shows how to effectively make your bot memorize photos. Index 0 of the array is the smallest quality version of the image so having `photo.length - 1` in the index will get the largest photo file id.

### onForwardSticker
Gets called every time the bot sees a forwarded sticker. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the message.
* `messageId` **{Number}** Message reference.
* `user` **{User Object}** The owner of the content that was forwarded.
* `sticker` **{Sticker Object}** Sticker information. Use `sticker.file_id` to keep track of the stickers seen.

E.g

```javascript
bot.onForwardSticker = function (chat, from, messageId, user, sticker) {
  console.log(from.first_name + ' sent a sticker with ' + sticker.width + 'x' + sticker.height + ' resolution.')
}
```

### onForwardText
Gets called every time the bot sees a forwarded text message. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who forwarded the message.
* `messageId` **{Number}** Message reference.
* `user` **{User Object}** The owner of the content that was forwarded.
* `text` **{String}** Message text.

E.g

```javascript
bot.onForwardText = function (chat, from, messageId, user, text) {
  console.log(from.first_name + ' forwarded ' + user.firstname + "'s message.")
}
```

### onForwardVenue
Gets called every time the bot sees a forwarded venue. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the video.
* `messageId` **{Number}** Message reference.
* `user` **{User Object}** The owner of the content that was forwarded.
* `venue` **{Venue Object}** Venue information.

E.g

```javascript
bot.onForwardVenue = function (chat, from, messageId, user, venue) {
  console.log(from.firstname + ' sent this venue: ' + JSON.stringify(venue))
}
```

### onForwardVideo
Gets called every time the bot sees a forwarded video. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the video.
* `messageId` **{Number}** Message reference.
* `user` **{User Object}** The owner of the content that was forwarded.
* `video` **{Video Object}** Video information. Use `video.file_id` to keep track of the videos seen.

E.g

```javascript
var videos = []
bot.onForwardVideo = function (chat, from, messageId, user, video) {
  if (chat.username === 'ExampleChannel') {
    videos.push(video.file_id)
  }
}
```

This example shows how to effectively make your bot memorize videos. Note that PM, group, supergroup and channels may not return an `username` property so it needs to be checked first if it exists.

### onForwardVoice
Gets called every time the bot sees a forwarded `.ogg` voice message. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the voice message.
* `messageId` **{Number}** Content reference id.
* `user` **{User Object}** The owner of the content that was forwarded.
* `voice` **{Voice Object}** Voice information. Use `voice.file_id` to keep track of the voice messages seen.

E.g

```javascript
var voices = []
bot.onForwardVoice = function (chat, from, messageId, caption, voice) {
  if (chat.username === 'ExampleChannel') {
    voices.push(voice.file_id)
  }
}
```

### onGroupJoin
Gets called every time the bot sees someone joining the group.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `joiningUser` **{User Object}** The user who joined.
* `messageId` **{Number}** The message reference.
* `triggeringUser` **{User Object}** This can be the user who's in the group who added the new user or the user who joined themselves.

E.g

```javascript
bot.onGroupJoin = function (chat, joiningUser, messageId, triggeringUser) {
  bot.sendText(chat.id, 'Welcome to our group, ' + joiningUser.first_name + '.')
}
```

If you're wondering what is a good use of `joining_user` and `triggering_user` user objects. You could compare `joining_user.id === triggering_user.id` to check if that user invited themselves or `joining_user.id !== triggering_user.id` that someone else invited them.

### onGroupLeft
Gets called every time the bot sees someone leaving the group.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `leavingUser` **{User Object}** The user who left.
* `messageId` **{Number}** The message reference.
* `triggeringUser` **{User Object}**. This can be the user who's in the group who removed the user or the user who left themselves.

E.g

```javascript
bot.onGroupLeft = function (chat, leavingUser, messageId, triggeringUser) {
  bot.sendText(chat.id, leavingUser.first_name + ' left the group.')
}
```

If you're wondering what is a good use of `leavingUser` and `triggeringUser` user objects. You could compare `leavingUser.id === triggeringUser.id` to check if that user left themselves or `leavingUser.id !== triggeringUser.id` that someone else removed them.

### onInlineQuery
Gets called every time the user starts typing a query after @BotName. Don't forget to use `/setinline` on your bot with [@BotFather](https://t.me/BotFather).

* `from` **{User Object}** User who typing the query.
* `queryId` **{String}** String of the query being typed. Be aware that this is a string and not a number `typeof` id.
* `text` **{String}** String of the query being typed.

E.g

```javascript
function htmlEscape (html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

bot.onInlineQuery = function (from, queryId, text) {
  if (queryId.length < 1) {
    return
  }

  var results = [
    {
      'type': 'article',
      'id': '1',
      'title': 'Bold',
      'input_message_content': {
        'message_text': '<b>' + htmlEscape(text) + '</b>',
        'parse_mode': 'HTML'
      }
    },
    {
      'type': 'article',
      'id': '2',
      'title': 'Italic',
      'input_message_content': {
        'message_text': '<i>' + htmlEscape(text) + '</i>',
        'parse_mode': 'HTML'
      }
    }
  ]

  bot.answerInlineQuery(queryId, JSON.stringify(results))
}
```

This example produces the near same result as Telegram's Official [@bold](https://t.me/bold) bot.

### onKeyboardCallbackData
Gets called every time the bot sees a `callbackData` from a user pressing a button from InlineKeyboardButton.

* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who pressed the button.
* `messageId` **{Number}** The message reference.
* `callbackData` **{String}** The `callback_data` that was returned from the **{InlineKeyboardButton}** object.

E.g

```javascript
bot.onKeyboardCallbackData = function (chat, from, messageId, callbackData) {
  console.log(from.first_name + ' pressed a button with this callback data: ' + callbackData)
}
```

Don't forget you can use this call back to change the content of the reference messageId without sending a new message.

### onPhoto
Gets called every time the bot sees a new photo.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the photo.
* `messageId` **{Number}** The message reference.
* `caption` **{String}** File caption text. Is `undefined` if one isn't included.
* `photo` **{Array} of {PhotoSize Object}** Provides photo information.

E.g

```javascript
var photos = []
bot.onPhoto = function (chat, from, messageId, caption, photo) {
  if (chat.username === '@ExampleChannel') {
    photos.push(photo[photo.length - 1].file_id)
  }
}
```

This example shows how to effectively make your bot memorize photos. Index 0 of the array is the smallest quality version of the image so having `photo.length - 1` in the index will get the largest photo file id.

### onPinnedAny
Calls on any pinned content. This excludes supergroups if the bot isn't an administrator. This function gets called before any other pinned content.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `messageId` **{Number}** The message reference that was pinned.
* `messageUser` **{User Object}** User who wrote the pinned message.
* `pinnedUser` **{User Object}** User who pinned the message.

```javascript
var counter = 0
bot.onPinnedAny = function (chat, messageId, messageUser, pinnedUser) {
  counter += 1
  console.log('Number of pinned messages: ' + counter)
}
```

### onPinnedAudio
Calls when a user pins an audio. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `messageId` **{Number}** The message reference that was pinned.
* `messageUser` **{User Object}** User who wrote the pinned message.
* `pinnedUser` **{User Object}** User who pinned the message.
* `audio` **{Audio Object}** Provides audio information.

E.g

```javascript
bot.onPinnedAudio = function (chat, messageId, messageUser, pinnedUser, audio) {
  console.log(pinnedUser.first_name + ' pinned ' + messageUser.first_name + "'s audio.")
}
```

### onPinnedContact
Calls when a user pins a contact. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `messageId` **{Number}** The message reference that was pinned.
* `messageUser` **{User Object}** User who wrote the pinned message.
* `pinnedUser` **{User Object}** User who pinned the message.
* `contact` **{Contact Object}** Provides contact information.

E.g

```javascript
bot.onPinnedContact = function (chat, messageId, messageUser, pinnedUser, contact) {
  console.log(pinnedUser.first_name + ' pinned ' + messageUser.first_name + "'s contact.")
  console.log('Name: ' + contact.first_name)
  console.log('Number: ' + contact.phone_number)
}
```

### onPinnedFile
Calls when a user pins a file. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `messageId` **{Number}** The message reference that was pinned.
* `messageUser` **{User Object}** User who wrote the pinned message.
* `pinnedUser` **{User Object}** User who pinned the message.
* `file` **{File Object}** Provides video information.

E.g

```javascript
bot.onPinnedFile = function (chat, messageId, messageUser, pinnedUser, file) {
  console.log(pinnedUser.first_name + ' pinned ' + messageUser.first_name + "'s video.")
}
```

### onPinnedPhoto
Calls when a user pins a photo. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `messageId` **{Number}** The message reference that was pinned.
* `messageUser` **{User Object}** User who wrote the pinned message.
* `pinnedUser` **{User Object}** User who pinned the message.
* `photo` **{Array} of {PhotoSize Object}** Provides photo information.

E.g

```javascript
bot.onPinnedPhoto = function (chat, messageId, messageUser, pinnedUser, text) {
  console.log(pinnedUser.first_name + ' pinned ' + messageUser.first_name + "'s photo.")
}
```

### onPinnedSticker
Calls when a user pins a sticker. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `messageId` **{Number}** The message reference that was pinned.
* `messageUser` **{User Object}** User who wrote the pinned message.
* `pinnedUser` **{User Object}** User who pinned the message.
* `sticker` **{Sticker Object}** Provides sticker information.

E.g

```javascript
bot.onPinnedSticker = function (chat, messageId, messageUser, pinnedUser, sticker) {
  console.log(pinnedUser.first_name + ' pinned ' + messageUser.first_name + "'s sticker.")
}
```

### onPinnedText
Calls when a user pins text. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `messageId` **{Number}** The message reference that was pinned.
* `messageUser` **{User Object}** User who wrote the pinned message.
* `pinnedUser` **{User Object}** User who pinned the message.
* `text` **{String}** Message text.

E.g

```javascript
bot.onPinnedText = function (chat, messageUser, messageId, pinnedUser, text) {
  console.log(pinnedUser.first_name + ' pinned ' + messageUser.first_name + "'s message that says: " + text)
}
```

### onPinnedVenue
Calls when a user pins a venue. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `messageId` **{Number}** The message reference that was pinned.
* `messageUser` **{User Object}** User who wrote the pinned message.
* `pinnedUser` **{User Object}** User who pinned the message.
* `venue` **{Venue Object}** Provides venue information.

E.g

```javascript
bot.onPinnedVenue = function (chat, messageUser, messageId, pinnedUser, venue) {
  console.log(pinnedUser.first_name + ' pinned a venue: ' + JSON.stringify(venue))
}
```

### onPinnedVideo
Calls when a user pins a video. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `messageId` **{Number}** The message reference that was pinned.
* `messageUser` **{User Object}** User who wrote the pinned message.
* `pinnedUser` **{User Object}** User who pinned the message.
* `video` **{Video Object}** Provides video information.

E.g

```javascript
bot.onPinnedVideo = function (chat, messageUser, messageId, pinnedUser, video) {
  console.log(pinnedUser.first_name + ' pinned ' + messageUser.first_name + "'s video.")
}
```

### onPinnedVoice
Calls when a user pins a voice. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `messageId` **{Number}** The message reference that was pinned.
* `messageUser` **{User Object}** User who wrote the pinned message.
* `pinnedUser` **{User Object}** User who pinned the message.
* `voice` **{Voice Object}** Provides voice information.

E.g

```javascript
bot.onPinnedVoice = function (chat, messageUser, messageId, pinnedUser, voice) {
  console.log(pinnedUser.first_name + ' pinned ' + messageUser.first_name + "'s video.")
}
```

### onStartup
Called after when the bot instance is declared and when the getMe data is obtained. This is before the getUpdates loop is started.

*Arguments*
* `isSuccess` **{Boolean}**

E.g

```javascript
bot.onStartup = function (isSuccess) {
  if (isSuccess) {
    console.log('Loaded: ' + bot.getUsername())
    console.log('Loop calling every ' + bot.getLoopDelay() + ' milliseconds.')
    console.log('Startup Time: ' + (new Date().toLocaleTimeString()))
  } else {
    console.error('Unable to getMe with bot token. Make sure token is correct and connected to the internet.')
  }
}
```

### onSticker
Gets called every time the bot sees a new message. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the message.
* `messageId` **{Number}** Message reference.
* `sticker` **{Sticker Object}** Sticker information. Use `sticker.file_id` to keep track of the stickers seen.

E.g

```javascript
bot.onSticker = function (chat, from, messageId, sticker) {
  console.log(from.first_name + ' sent a sticker with ' + sticker.width + 'x' + sticker.height + ' resolution.')
}
```

### onText
Gets called every time the bot sees a new message. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the message.
* `messageId` **{Number}** Message reference.
* `text` **{String}** Message text.

E.g

```javascript
bot.onText = function (chat, from, messageId, text) {
  if (text.toLowerCase().indexOf('hello bot') > -1) {
    bot.sendText(chat.id, 'Hello, ' + from.first_name + '.')
  }
}
```

When someone says "hello bot" in any part of the message. This example will respond with a hello back.

### onVenue
Gets called every time the bot sees a new venue.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the video.
* `messageId` **{Number}** Message reference.
* `venue` **{Venue Object}** Venue information.

E.g

```javascript
bot.onVenue = function (chat, from, messageId, venue) {
  console.log(from.firstname + ' sent this venue: ' + JSON.stringify(venue))
}
```

### onVideo
Gets called every time the bot sees a new video.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the video.
* `messageId` **{Number}** Message reference.
* `caption` **{String}** File caption text. Is `undefined` if one isn't included.
* `video` **{Video Object}** Video information. Use `video.file_id` to keep track of the videos seen.

E.g

```javascript
var videos = []
bot.onVideo = function (chat, from, messageId, caption, video) {
  if (chat.username === 'ExampleChannel') {
    videos.push(video.file_id)
  }
}
```

This example shows how to effectively make your bot memorize videos. Note that PM, group, supergroup and channels may not return an `username` property so it needs to be checked first if it exists.

### onVoice
Gets called every time the bot sees a `.ogg` voice message.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the voice message.
* `messageId` **{Number}** Content reference id.
* `caption` **{String}** File caption text. Is `undefined` if one isn't included.
* `voice` **{Voice Object}** Voice information. Use `voice.file_id` to keep track of the voice messages seen.

E.g

```javascript
var voices = []
bot.onVoice = function (chat, from, messageId, caption, voice) {
  if (chat.username === 'ExampleChannel') {
    voices.push(voice.file_id)
  }
}
```

This example shows how to effectively make your bot memorize voices. Note that PM, group, supergroup and channels may not return an `username` property so it needs to be checked first if it exists.

## Actions
To setup up an action. You'll need to had required the bot class and declared a bot variable. I've added easy copy and paste examples under each event to make it easily to add to your script.

### answerInlineQuery
Sends a response to the `onInlineQuery`.

*Required Perimeters*
* `queryId` **{String}** The inlineQueryId of answerInlineQuery event to respond to.
* `results` **{Array of InlineQueryResult Object}** The media to respond with.

*Optional Perimeters*
* `settings` **Object** Use for providing extra perimeters.
    * `cache_time` **{Integer}** The maximum seconds the result is cache on the server. Default 300.
    * `is_personal` **{Boolean}** Having true may have results cache on server-side only for the user.
    * `next_offset` **{String}**
    * `switch_pm_text` **{String}** Passes the user to PM while sending the content.
    * `switch_pm_parameter` **{String}**
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

See [onInlineQuery](#oninlinequery) for an example.

### deleteMessage
Deletes a target message in the chat. This only works if the message was sent under 48 hours. The bot is capable of deleting its messages but requires group administrator to delete other user messsages.

*Required Perimeters*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `messageId` **{Number}** Target id of the message to delete.

*Optional Perimeters*
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.onCommand = function (chat, from, messageId, text, command, commandData) {
  if (command === 'run') {
    // Send the first message.
    bot.sendText(chat.id, 'Now you see me...', {}, function (isSuccess, messageId) {
      // Give a 3 second delay.
      setTimeout(function () {
        // Delete the last message.
        bot.deleteMessage(chat.id, messageId, function (isSuccess) {
          // Send a replacement message if success.
          if (isSuccess) {
            bot.sendText(chat.id, "Now you don't.")
          }
        })
      }, 3000)
    })
  }
}
```


### editHtml / editMarkdown / editText
Use this to replace a target message. Be aware bots can only replace their own messages that were sent in the last 3 days.

*Required Perimeters*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `messageId` **{Number}** Target id of one of the bot own messages.
* `text` **{String}** The replacement text.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `disable_web_page_preview` **{Boolean}** Default false. If a link or @username exists in the message, setting this to true will prevent it sending a thumbnail image.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove**.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.sendText('@MyGroup', 'Counter: 0', {}, function (isSuccess, messageId) {
  if (isSuccess) {
    var count = 0
    setInterval(function () {
      count += 1
      bot.editText('@MyGroup', messageId, 'Counter: ' + count)
      if (count === Number.MAX_SAFE_INTEGER) {
        clearInterval(this)
      }
    }, 1000)
  }
})

```

This example sends "Counter: 0" message to the target chat. If successful, the `setInterval` loop starts and replaces the last message with "Counter: 1", 2, 3 and so on every second.

### forwardMessage
Use this to forward a message and its content.

*Required Perimeters*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `sourceChat` Source chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `messageId` **{Number}** Message id you want to forward.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `messageId` **{Number}** Use this to keep a reference to the sent forwardMessage.

E.g

```javascript
bot.onVoice = function (caption, chat, from, messageId, voice) {
  if (chat.username === '@WatchingGroup') {
    bot.forwardMessage('@YourUsername', chat.id, messageId)
  }
}
```

### getBotUsername
Use this to return a **{String}** of the bot username. Example "MyBot".

*No Perimeters*

E.g

```javascript
console.log(bot.getUsername())
```

### getChat
Use this to return information about the target chat.

*Required*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `obtainedChat` **{Chat Object}**

E.g

```javascript
bot.getChat("@MyGroup", function (isSuccess, obtainedChat) {
  console.log(obtainedChat.first_name);
})
```

You'll notice I've named it `obtainedChat` just to avoid name collision with `chat`.

### getChatAdministrators
Returns an array containing all the users that are "administrator" status of the group. The "creator" will be the first index 0 while administrators are 1 and higher. If the bot itself is an administrator, it will also be included. However, other bots will not be included even if administrator.

*Required*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `users` **{Array}** containing a **{User Object}** per chat authority.
    * `userIds` **{Array}** containing a **{Number}** of the users' id.

E.g

```javascript
bot.getChatAdministrators('@MyGroup', function (isSuccess, users, userIds) {
  if (isSuccess) {
    var i
    var length = users.length
    while (i < length) {
      if (i === 0) {
        console.log(users[i].first_name + ' (Creator)')
      } else {
        console.log(users[i].first_name + ' (Administrator)')
      }
      i = i + 1
    }
  }
})
```

Example prints all the chat authorities and their status. Be aware that this function doesn't work in PM.

### getChatMember
Returns an **{User Object}** and a **{String}** of the user's chat status. The chat status can be either: "administrator", "creator", "kicked", "left" or "member".

*Required*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `user` **{User Object}**
    * `status` **{String}**

E.g

```javascript
bot.getChatMember('@MyGroup', userId, function (isSuccess, user, status) {
  if (isSuccess) {
    console.log(user.first_name + "'s status is: " + status)
  }
})
```

### getChatMembersCount
Returns an **{Number}** of the number of members in a chat.

*Required*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `count` **{Number}**

E.g

```javascript
bot.getChatMembersCount(chatId, function (isSuccess, count) {
  if (isSuccess) {
    console.log(count)
  }
})
```

### getFile
Use this to get information about a **file_id**.

*Required*
* `fileId` **{String}** Target file you want to obtain information about.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `file` **{File Object}**

E.g

```javascript
bot.getFile(fileId, function (isSuccess, file) {
  if (isSuccess) {
    console.log(JSON.stringify(file))
  }
})
```

### getDebug
Use this to return a **{Boolean}** if the debug messages are enabled or not.

*No Perimeters*

E.g

```javascript
console.log(bot.getDebug())
```

### getLoopDelay
Use this to return a **{Number}** of the bot loop delay in milliseconds.

*No Perimeters*

E.g

```javascript
console.log(bot.getLoopDelay())
```

### getMe
Use this to get information about the bot. By default the class automatically uses it when start.

*Required*
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `bot` **{User Object}**

E.g

```javascript
bot.getMe(function (isSuccess, bot) {
  if (isSuccess) {
    console.log(bot.first_name)
  }
})
```

### getPort
Use this to return a **{Number}** of the current port being used. By default it's **443**.

*No perimeters*

E.g

```javascript
console.log(bot.getPort())
```

### getStartupTime
Use this to return a **{Number}** millisecond value. This is a saved `Date.now()` value from when the bot was declared.

*No Perimeters*

E.g

```javascript
console.log(bot.getStartupTime())
```

### getUserProfilePhotos
Use this to return a UserProfilePhotos object.

*Required*
* `userId` **{Number}** Target user id.
* `offset` **{Number}** Starting index of photos to return. Default 0.
* `limit` **{Number}** Last index of photos to return. Default 100.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `photos`**{UserProfilePhotos Object}** An object containing information about the targets profile photos.

E.g

```javascript
bot.getUserProfilePhotos(userId, 0, 100, function (isSuccess, photos) {
  if (isSuccess) {
    console.log(JSON.stringify(photos))
  }
})
```

I know it's probably not the best example but seeing the JSON tree will be easiler to understand than explaining it.

### kickChatMember
Use this to remove a member from the target chat. Supergroups will require an unban unfortunately due to how the Telegram server handles this command.

*Required*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `targetUserId` **{Number}** Target user id to kick.

*Optional*
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.kickChatMember(targetChat, targetUserId, function (isSuccess) {
  if (isSuccess) {
    bot.unban(targetChat, targetUserId)
  }
})
```

Note that this example should bypass the user from being actually banned from a supergroup to an actual kick were they can rejoin.

### leaveChat
Use this to make your bot leave a chat.

*Required*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".

*Optional*
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.leaveChat(targetChat, function (isSuccess) {
  console.log('Left successfully: ' + isSuccess)
})

```

### toString
Returns **{String}** "[object TelegramBot]" that identifies the class.

### sendAudio
Use this to send a mp3 to a target chat. You'll need to collect the `audio.file_id` with onPhoto. Be aware that `file_id` is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work. Also they can only send up to 50 mb.

*Required Perimeters*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `targetMp3` **{String}** Target mp3 file id or url.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `caption` **{String}** Adds a caption text message to the video. 0-200 characters max.
    * `duration` **{Number}**
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `performer` **{String}**
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove**.
    * `replyToMessageId` **{Number}** Use for sending a reply to a message id.
    * `title` **{String}**
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `messageId` **{Number}** Id of the sent content.

E.g

```javascript
bot.sendAudio(targetChat, targetMp3, {}, function (isSuccess) {
  console.log('MP3 sent successfully: ' + isSuccess)
})
```

### sendChatAction
Use this to send a status notification to your bot. It's recommended only to use this if it going to perform a long action such as sending a video.

*Required*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `action` **{String}** Can either have: "find_location", "record_audio", "record_video", "typing", "upload_audio", "upload_document", "upload_photo" or "upload_video". Sending a string not matching any of those will cause the action to fail.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.sendChatAction(targetChat, "typing")
```

### sendContact
Use this to send a made contact.

*Required*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `phoneNumber` **{String}** Contact's phone number.
* `firstName` **{String}** Contact's first name.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `last_name` **{String}** Contact's last name.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove**.
    * `replyToMessageId` **{Number}** Use for sending a reply to a message id.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `messageId` **{Number}** Id of the sent content.

E.g

```javascript
bot.sendContact(targetChat, "012345 012345", "John");
```

Note this is just a random number to illistrate the example.

### sendFile
Use this to send a file to a target chat. You'll need to collect the `file.file_id` with files. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

*Required Perimeters*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `targetFile` **{String}** Target document id or url.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `caption` **{String}** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove**.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `messageId` **{Number}** Id of the sent content.

E.g

```javascript
bot.sendFile(targetChat, targetFile, {}, function (isSuccess) {
  console.log("File sent successfully: " + isSuccess)
})
```

### sendHtml / sendMarkdown / sendText
Use this to send a plain text message to a chat. Note that Telegram automatically formats links, hash tags and @username automatically.

*Required Perimeters*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `text` **{String}** Message text to send. Note that text is replaced with `html` for sendHtml and `markdown` for sendMarkdown respectively.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `disable_web_page_preview` **{Boolean}** Default false. If a link or @username exists in the message, setting this to true will prevent it sending a thumbnail image.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove**.
    * `replyToMessageId` **{Number}** Use for sending a reply to a message id.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `messageId` **{Number}** Use this to keep the `messageId` reference.

E.g

```javascript
// Short basic message.
bot.sendText(targetChat, 'Hello world.')

// Sends a message while giving it optional settings.
bot.sendText('@ChatUsername', 'Hello world.', {
  'disable_web_page_preview': true
})

// Sends a message while returning a callback telling you if the message sent successfully or not.
var settings = {}
bot.sendText('@' + chat.username, 'Hello world.', settings, function (isSuccess, messageId) {
  console.log('Message sent successfully: ' + isSuccess)
})
```

All html and markdown tags must be closed else the message won't send.

### sendPhoto
Use this to send an image to a target chat. You'll need to collect the `photo[photo.length - 1].file_id` with onPhoto. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

*Required Perimeters*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `targetImage` **{String}** Target image id or url.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `caption` **{String}** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove**.
    * `replyToMessageId` **{Number}** Use for sending a reply to a message id.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `messageId` **{Number}** Id of the sent content.

E.g

```javascript
bot.sendPhoto(targetChat, targetImage, {}, function (isSuccess) {
  console.log("Image sent successfully: " + isSuccess)
})
```

### sendVenue
Use this to send a map location.

*Required Perimeters*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `latitude` **{Float Number}** The latitude point of the location.
* `longitude` **{Float Number}** The longitude point of the location.
* `title` **{String}** The title of the location. Doesn't have to be real.
* `address` **{String}** The address of the location. Doesn't have to be real.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `foursquare_id` **{String}** Foursquare identifyer for the venue.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_to_messageId` **{Number}** Use for sending a reply to a message id.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove**.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `messageId` **{Number}** Id of the sent content.

E.g

```javascript
bot.sendVenue(targetChat, 1.00, 1.00, "Some Place", "Somewhere")
```

Note the example is just random but it works.

### sendVideo
Use this to send a video to a target chat. You'll need to collect the `video.file_id` with onVideo. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

*Required Perimeters*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `targetVideo` **{String}** Target video id or url.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `duration` **{Number}**
    * `width` **{Number}**
    * `height` **{Number}**
    * `caption` **{String}** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove**.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `messageId` **{Number}** Id of the sent content.

E.g

```javascript
var settings = {
    "caption": "Video from @MyChannel"
};
bot.sendVideo(targetChat, targetVideo, settings, function (isSuccess) {
  console.log("Video sent successfully: " + isSuccess)
})
```

### sendVoice
Use this to send a ogg voice file to a target chat. You'll need to collect the `voice.file_id` with onVoice. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work. If uploading from external source. The file needs to be .ogg with OPUS encoding to send.

*Required Perimeters*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `targetOgg` **{String}** Target ogg file id or url. 50 mb is the size limit.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `caption` **{String}** Adds a caption text message to the video. 0-200 characters max.
    * `duration` **{Number}**
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove**.
    * `replyToMessageId` **{Number}** Use for sending a reply to a message id.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `messageId` **{Number}** Id of the sent content.

E.g

```javascript
bot.sendVoice(targetChat, targetOgg, {}, function (isSuccess) {
  console.log("Voice sent successfully: " + isSuccess)
})
```

### setDebug
Used for enabling or disabling console.log debug messages of the getUpdates events. Default is false.

*Required Perimeters*
* `debug` **{Boolean}** Enable or disable.

E.g

```javascript
bot.setDebug(false)
```

### setLoopDelay
Changes the current loop delay before the bot checks for new content and passes the new values to their respective events. Default is 3000.

*Required Perimeters*
* `delay` **{Number}** Milliseconds per call.

E.g

```javascript
bot.setLoopDelay(delay)
```

### setPort
Changes the current port being used for the loop. Be aware that if the port isn't used. The bot won't be able to receive requests. Ports currently supported are: 80, 88, 443, 8443. Default is 443.

*Required Perimeters*
* `port` **{Number}** The port to change to.

E.g

```javascript
bot.setPort(port)
```

### unbanChatMember
Unbans a user from a group or supergroup. The bot has to be present and an administrator for this to work.

*Required*
* `targetChat` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `targetUser` **{Number}** Target user id to unban.

*Optional*
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.unbanChatMember(targetChat, targetUser, function (isSuccess) {
  console.log("User was unbanned: " + isSuccess)
})
```

## Object Dictionary
This section shows and explains the Telegram objects that are returned during the events. I've excluded properties that are deprecated while still providing all the values.

Some properties won't always be provided. For example: chat or user without a `username` will return undefined. These will be marked with a *.

* **{Chat Object}**
    * *`all_members_are_administrators` **{Boolean}** Are all users admins. This applies only for "group" type chats.
    * `id` **{Number}** Unique chat id.
    * *`title` **{String}** Channel, Group or Supergroup name.
    * `type` **{String}** Type of chat. Can be: "channel", "group", "private", "supergroup".
    * *`username` **{String}** The @ name tag of the chat. Example: "GroupName".

* **{User Object}**
    * `first_name` **{String}** User's first name.
    * `id` **{Number}** Unique user id.
    * *`last_name` **{String}** User's last name.
    * *`username` **{String}** The @ name tag of the user. Example: "UserName".

More to come later...

## FAQ
* Q: Missing methods?
    * A: I'm trying to add all the available methods. I can confirm these aren't available.
        * Events: onDeletedMessage, onUnPinnedMessage
        * Actions: addMember, ~~deleteMessage~~, joinChat, pinMessage, unPinMessage
* Q: Why did you make this class when there's already others available?
    * A: Some lacked how-to documentation and examples. Also, setting up a certifcate and domain for webhook method seems too complex.
* Q: Will my bot token get misused using this class?
    * A: No. If you don't believe me. Feel free to look through the source code.
* Q: It's taking a while to complete and release the project?
    * A: I am the only person who's working on it. Also I hadn't hardly received much traffic at all. I usually try add a bit more content now and then. If there's a feature you want adding. Post an issue request. Keep in mind that I only add things that are easy to use.
* Q: There's typo and a bug.
    * A: You're more than free to fix document errors and help fill in the content here. Bugs can be reported under issues unless you know how to fix it and post a request fix with the changes.
* Q: I don't know how to do something.
    * A: I've written this project to hopefully be as easy as possible. You'll need to know some basic of JavaScript and have Node.js installed. If something is not detailed enough. Post and issue and I see if I can explain something better.
* Q: For `targetChat` do I use `chat.id` or `chat.username`?
    * A: `chat.id`. Not all chats are given an username but always an id.

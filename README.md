# TelegramBot

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)]()
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![node](https://img.shields.io/badge/node->%3D6.11.4-blue.svg)]()
[![npm](https://img.shields.io/badge/npm-2.2.1-blue.svg)](https://www.npmjs.com/package/telegram-bot-nova)

Badges from [Shields.io](http://shields.io)

## Example

```javascript
'use strict'

const TelegramBot = require('telegram-bot-nova')

var bot = new TelegramBot('YOUR_BOT_TOKEN')

bot.on('command', (chat, date, from, messageId, text, command, commandData) => {
  if (command === 'start') {
    bot.sendText(chat.id, 'Hello world.')
    return
  }
})
```

## Installing

First you'll need to install the latest [node](https://nodejs.org/en/). Either from downloading it from their website for Windows or through your Terminal's package program for Linux. Once installed, you can do it either by NPM or downloadable zip.

### Via NPM (Recommended)

Open Command Prompt/Terminal and enter either of the following.

**Local**

```npm install telegram-bot-nova```

**Global**

```npm install telegram-bot-nova -g```

### Via Downloadable Zip

Download the latest release from [GitHub](https://github.com/NightfallAlicorn/telegram-bot-nova/releases) and extract the `telegram-bot-nova.js` into your project folder. Beware that you have got to `require('./telegram-bot-nova')` with ./ prefix for local directory when you install by zip.

## Index

* [TelegramBot](#telegrambot)
* [Example](#example)
* [Installing](#installing)
* [Index](#index)
* [Declaring](#declaring)
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
    * [onForwardLocation](#onforwardlocation)
    * [onForwardPhoto](#onforwardphoto)
    * [onForwardSticker](#onforwardsticker)
    * [onForwardText](#onforwardtext)
    * [onForwardVenue](#onforwardvenue)
    * [onForwardVideo](#onforwardvideo)
    * [onForwardVideoNote](#onforwardvideonote)
    * [onForwardVoice](#onforwardvoice)
    * [onGroupJoin](#ongroupjoin)
    * [onGroupLeft](#ongroupleft)
    * [onInlineQuery](#oninlinequery)
    * [onKeyboardCallbackData](#onkeyboardcallbackdata)
    * [onLocation](#onlocation)
    * [onPhoto](#onphoto)
    * [onPinnedAny](#onpinnedany)
    * [onPinnedAudio](#onpinnedaudio)
    * [onPinnedContact](#onpinnedcontact)
    * [onPinnedFile](#onpinnedfile)
    * [onPinnedLocation](#onpinnedlocation)
    * [onPinnedPhoto](#onpinnedphoto)
    * [onPinnedSticker](#onpinnedsticker)
    * [onPinnedText](#onpinnedtext)
    * [onPinnedVenue](#onpinnedvenue)
    * [onPinnedVideo](#onpinnedvideo)
    * [onPinnedVideoNote](#onpinnedvideonote)
    * [onPinnedVoice](#onpinnedvoice)
    * [onStartup](#onstartup)
    * [onSticker](#onsticker)
    * [onText](#ontext)
    * [onVenue](#onvenue)
    * [onVideo](#onvideo)
    * [onVideoNote](#onvideonote)
    * [onVoice](#onvoice)
* [Actions](#actions)
    * [answerInlineQuery](#answerinlinequery)
        * ... More inline query types to be added.
    * [deleteChatPhoto](#deletechatphoto)
    * [deleteMessage](#deletemessage)
    * [editHtml](#edithtml)
    * [editMarkdown](#editmarkdown)
    * [editMessageText](#editmessagetext)
    * [editText](#edittext)
    * [exportChatInviteLink](#exportchatinvitelink)
    * [forwardMessage](#forwardmessage)
    * [getBotUsername](#getbotusername)
    * [getChat](#getchat)
    * [getChatAdministrators](#getchatadministrators)
    * [getChatMember](#getchatmember)
    * [getChatMembersCount](#getchatmemberscount)
    * [getDevMode](#getdevmode)
    * [getFile](#getfile)
    * [getInterval](#getinterval)
    * [getMe](#getme)
    * [getPort](#getport)
    * [getStartupTime](#getstartuptime)
    * [getUserProfilePhotos](#getuserprofilephotos)
    * [kickChatMember](#kickchatmember)
    * [leaveChat](#leavechat)
    * [pinChatMessage](#pinchatmessage)
    * [promoteChatMember](#promotechatmember)
    * [restrictChatMember](#restrictchatmember)
    * [sendAudio](#sendaudio)
    * [sendChatAction](#sendchataction)
    * [sendContact](#sendcontact)
    * [sendDocument](#senddocument)
    * [sendFile](#sendfile)
    * [sendHtml](#sendhtml)
    * [sendImage](#sendimage)
    * [sendLocation](#sendlocation)
    * [sendMarkdown](#sendmarkdown)
    * [sendMessage](#sendmessage)
    * [sendPhoto](#sendphoto)
    * [sendText](#sendtext)
    * [sendVenue](#sendvenue)
    * [sendVideo](#sendvideo)
    * [sendVideoNote](#sendvideonote)
    * [sendVoice](#sendvoice)
    * [setChatDescription](#setchatdescription)
    * [setChatPhoto](#setchatphoto) «Not available.»
    * [setChatTitle](#setchattitle)
    * [setDevMode](#setdevmode)
    * [setInterval](#setinterval)
    * [setPort](#setport)
    * [toString](#tostring)
    * [unbanChatMember](#unbanchatmember)
    * [unpinChatMessage](#unpinchatmessage)

## Declaring

* `token` **string** The bot token provided by [@BotFather](https://t.me./botfather).
* `settings` **[object Object]** Use for providing extra perimeters.
    * `devMode` **boolean** Used for providing console log debugging logs. Default false.
    * `interval` **number** The rate in reach the bot checks updates in milliseconds. Default 1000.
    * `method` **string** The https method to use. Can either be 'GET' or 'POST'. Default 'POST'.
    * `port` **number** The https port to use. Ports currently supported are: 80, 88, 443, 8443. Default 443.

```javascript
// Minimum.
var bot = new TelegramBot(token)

// Optional settings.
var bot = new TelegramBot(token, {
  'devMode': false,
  'interval': 1000,
  'method': 'POST',
  'port': 443
})
```

## Events

### onAny
Called when any event is triggered.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who triggered the event.
* `messageId` **number** The message reference.

E.g.

```javascript
bot.on('any', (chat, date, from, messageId) => {
  // Actions here...
})
```

### onAudio
Called every time the bot sees a `.mp3` sound file.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who send the audio.
* `messageId` **number** The message reference.
* `caption` **string** Caption text. No caption is "".
* `audio` **[object Audio]** Audio information. Use `audio.file_id` to keep track of the audios seen.

E.g.

```javascript
bot.on('audio', (chat, date, from, messageId, caption, audio) => {
  // Actions here...
})
```

### onCommand
Called every time the bot sees a command.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who triggered the command.
* `messageId` **number** The message reference.
* `text` **string** Full command message.
* `command` **string** The command that was used. (E.g. "start" when the user enters "/start".).
* `commandData` **string** The remaining text after the first space. No data is "". (E.g. "hi" when user enters "/start hi".)

E.g.

```javascript
bot.on('command', (chat, date, from, messageId, text, command, commandData) => {
  // Actions here...
})
```

### onContact
Called when the bot sees a contact.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the file.
* `messageId` **number** The message reference.
* `contact` **[object Contact]** Contact information.

E.g.

```javascript
bot.on('contact', (chat, date, from, contact, messageId) => {
  // Actions here...
})
```

### onEditText
Called when a message is edited. However, this excludes supergroups if the bot isn't an administrator. Note that this event does not return the original text before it was edited.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the edited message.
* `messageId` **number** Message reference.
* `newText` **string** Message text.

E.g.

```javascript
bot.on('editText', (chat, date, from, messageId, newText) => {
  // Actions here...
})
```

### onError
Called when an error occurs in an instance event.

* `error` **Error** The error object that was returned.

E.g.

```javascript
bot.on('error', (error) => {
  // Actions here...
})
```

### onFile
Called when a user sends a file. Full quality non-compressed images are still counted as files.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the file.
* `messageId` **number** The message reference.
* `caption` **string** File caption text. Is `undefined` if one isn't included.
* `file` **[object Document]** File information. Use `file.file_id` to keep track of the files seen.

E.g.

```javascript
bot.on('file', (chat, date, from, messageId, caption, file) => {
  // Actions here...
})
```

### onForwardAny
Called every time the bot sees any forward content. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. This gets called first before any other onForward events.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the content.
* `messageId` **number** Message reference.
* `user` **[object User]** User who had sent the content before it was forwarded.

E.g.

```javascript
bot.on('forwardAny', (chat, date, from, messageId, user) => {
  // Actions here...
}
```

### onForwardAudio
Called every time the bot sees a forwarded `.mp3` sound file. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the audio.
* `messageId` **number** The message reference.
* `user` **[object User]** User who had sent the audio before it was forwarded.
* `audio` **[object Audio]** Audio information. Use `audio.file_id` to keep track of the audios seen.

E.g.

```javascript
bot.on('forwardAudio' (chat, date, from, messageId, user, audio) => {
  // Actions here...
})
```

### onForwardContact
Called every time the bot sees a forwarded contact. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the contact.
* `messageId` **number** The message reference.
* `user` **[object User]** User who had sent the contact before it was forwarded.
* `contact` **[object Contact]** Contact information.

E.g.

```javascript
bot.on('forwardContact', (chat, date, from, contact, user, messageId) => {
  // Actions here...
})
```

### onForwardFile
Called every time the bot sees a forwarded file. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the file.
* `messageId` **number** The message reference.
* `user` **[object User]** User who had sent the file before it was forwarded.
* `file` **[object Document]** File information. Use `file.file_id` to keep track of the files seen.

E.g.

```javascript
bot.on('forwardFile', (chat, date, from, messageId, user, file) => {
  // Actions here...
})
```

### onForwardLocation
Called every time the bot sees a forwarded location. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the location.
* `messageId` **number** Message reference.
* `user` **[object User]** User who had sent the location before it was forwarded.
* `location` **[object Location]** Location information.

E.g.

```javascript
bot.on('forwardLocation', (chat, date, from, messageId, user, location) => {
  // Actions here...
})
```

### onForwardPhoto
Called every time the bot sees a forwarded photo. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the photo.
* `messageId` **number** Message reference.
* `user` **[object User]** User who had sent the photo before it was forwarded.
* `photo` **Array of [object PhotoSize]** Provides photo information.

E.g.

```javascript
bot.on('forwardPhoto', (chat, date, from, messageId, user, photo) => {
  // Actions here...
})
```

### onForwardSticker
Called every time the bot sees a forwarded sticker. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the sticker.
* `messageId` **Number** Message reference.
* `user` **[object User]** User who had sent the sticker before it was forwarded.
* `sticker` **[object Sticker]** Sticker information. Use `sticker.file_id` to keep track of the stickers seen.

E.g.

```javascript
bot.on('forwardSticker', (chat, date, from, messageId, user, sticker) => {
  // Actions here...
})
```

### onForwardText
Called every time the bot sees a forwarded text message. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the text.
* `messageId` **number** Message reference.
* `user` **[object User]** User who had sent the text before it was forwarded.
* `text` **string** Message text.

E.g.

```javascript
bot.on('forwardText', (chat, date, from, messageId, user, text) => {
  // Actions here...
})
```

### onForwardVenue
Called every time the bot sees a forwarded venue. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the venue.
* `messageId` **number** Message reference.
* `user` **[object User]** User who had sent the venue before it was forwarded.
* `venue` **[object Venue]** Venue information.

E.g.

```javascript
bot.on('forwardVenue', (chat, date, from, messageId, user, venue) => {
  // Actions here...
})
```

### onForwardVideo
Called every time the bot sees a forwarded video. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the video.
* `messageId` **number** Message reference.
* `user` **[object User]** User who had sent the video before it was forwarded.
* `video` **[object Video]** Video information. Use `video.file_id` to keep track of the videos seen.

E.g.

```javascript
bot.on('forwardVideo', (chat, date, from, messageId, user, video) => {
  // Actions here...
})
```

### onForwardVideoNote
Called every time the bot sees a forwarded round video note. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the round video note.
* `messageId` **number** Message reference.
* `user` **[object User]** User who had sent the round video note before it was forwarded.
* `videoNote` **[object VideoNote]** Video note information. Use `videoNote.file_id` to keep track of the round videos seen.

E.g.

```javascript
bot.on('forwardVideoNote', (chat, date, from, messageId, user, videoNote) => {
  // Actions here...
})
```

### onForwardVoice
Called every time the bot sees a forwarded `.ogg` voice message. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots. Doesn't contain the caption.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who forwarded the voice message.
* `messageId` **number** Content reference id.
* `user` **[object User]** User who had sent the voice before it was forwarded.
* `voice` **[object Voice]** Voice information. Use `voice.file_id` to keep track of the voice messages seen.

E.g.

```javascript
bot.on('forwardVoice', (chat, date, from, messageId, caption, voice)=> {
  // Actions here...
})
```

### onGroupJoin
Called every time the bot sees someone joining the group.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `joiningUser` **[object User]** The user who joined.
* `messageId` **number** The message reference.
* `triggeringUser` **[object User]** This can be the user who's in the group who added the new user or the user who joined themselves.

E.g.

```javascript
bot.on('groupJoin', (chat, date, joiningUser, messageId, triggeringUser) => {
  // Actions here...
})
```

### onGroupLeft
Called every time the bot sees someone leaving the group.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `leavingUser` **[object User]** The user who left.
* `messageId` **number** The message reference.
* `triggeringUser` **[object User]**. This can be the user who's in the group who removed the user or the user who left themselves.

E.g.

```javascript
bot.on('groupLeft', (chat, date, leavingUser, messageId, triggeringUser) => {
  // Actions here...
})
```

### onInlineQuery
Called every time the user starts typing a query after @BotName. Don't forget to use `/setinline` on your bot with [@BotFather](https://t.me/BotFather) to use this feature.

* `from` **[object User]** User who typing the query.
* `queryId` **string** String of the query being typed. Be aware that this is a string and not a number `typeof` id.
* `text` **string** String of the query being typed.

E.g.

```javascript
function htmlEscape (html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

bot.on('inlineQuery', (from, queryId, text) => {
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
})
```

This example produces the near same result as Telegram's Official [@bold](https://t.me/bold) bot.

### onKeyboardCallbackData
Called every time the bot sees a `callbackData` from a user pressing a button from InlineKeyboardButton. This is a `callback_query` object. I put Keyboard in the name to make it more identifiable.

* `chat` **[object Chat]** Chat were event occurred.
* `messageDate` **number** The date when the message containing the keyboard buttons was sent. This is not the date when the button was pressed.
* `from` **[object User]** User who pressed the button.
* `messageId` **number** The message reference.
* `callbackData` **string** The `callback_data` that was returned from the **[object InlineKeyboardButton]**.

E.g.

```javascript
bot.on('keyboardCallbackData', (chat, messageDate, from, messageId, callbackData) => {
  // Actions here...
})
```

Don't forget you can use this call back to change the content of the reference messageId without sending a new message.

### onLocation
Called every time the bot sees a new location.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the location.
* `messageId` **number** Message reference.
* `location` **[object Location]** Location information.

E.g.

```javascript
bot.on('location', (chat, date, from, messageId, location) => {
  // Actions here...
})
```

### onPhoto
Called every time the bot sees a new photo.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the photo.
* `messageId` **number** The message reference.
* `caption` **string** File caption text. Is `undefined` if one isn't included.
* `photo` **Array of [object PhotoSize]** Provides photo information.

E.g.

```javascript
var photos = []
bot.on('photo', (chat, date, from, messageId, caption, photo) => {
  if (chat.username === '@ExampleChannel') {
    photos.push(photo[photo.length - 1].file_id)
  }
})
```

This example shows how to effectively make your bot memorize photos. Index 0 of the array is the smallest quality version of the image so having `photo.length - 1` in the index will get the largest photo file id.

### onPinnedAny
Calls on any pinned content. This excludes supergroups if the bot isn't an administrator. This function gets called before any other pinned content.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who sent the pinned content.
* `pinnedUser` **[object User]** User who pinned the content.

E.g.

```javascript
bot.on('pinnedAny', (chat, date, messageId, messageUser, pinnedUser) => {
  // Actions here...
})
```

### onPinnedAudio
Calls when a user pins an audio. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who wrote sent pinned audio.
* `pinnedUser` **[object User]** User who pinned the message.
* `audio` **[object Audio]** Provides audio information.

E.g.

```javascript
bot.on('pinnedAudio', (chat, date, messageId, messageUser, pinnedUser, audio) => {
  // Actions here...
})
```

### onPinnedContact
Calls when a user pins a contact. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who sent the pinned file.
* `pinnedUser` **[object User]** User who pinned the message.
* `contact` **[object Contact]** Provides contact information.

E.g.

```javascript
bot.on('pinnedContact', (chat, date, messageId, messageUser, pinnedUser, contact) => {
  // Actions here...
})
```

### onPinnedFile
Calls when a user pins a file. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who sent the pinned file.
* `pinnedUser` **[object User]** User who pinned the message.
* `file` **[object File]** Provides video information.

E.g.

```javascript
bot.on('pinnedFile', (chat, date, messageId, messageUser, pinnedUser, file) => {
  // Actions here...
})
```

### onPinnedLocation
Calls when a user pins a venue. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who sent the pinned location.
* `pinnedUser` **[object User]** User who pinned the message.
* `location` **[object Location]** Provides location information.

E.g.

```javascript
bot.on('pinnedLocation', (chat, date, messageUser, messageId, pinnedUser, location) => {
  // Actions here...
})
```

### onPinnedPhoto
Calls when a user pins a photo. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who sent the pinned photo.
* `pinnedUser` **[object User]** User who pinned the message.
* `photo` **Array of [object PhotoSize]** Provides photo information.

E.g.

```javascript
bot.on('pinnedPhoto', (chat, date, messageId, messageUser, pinnedUser, text) => {
  // Actions here...
})
```

### onPinnedSticker
Calls when a user pins a sticker. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who sent the pinned sticker.
* `pinnedUser` **[object User]** User who pinned the message.
* `sticker` **[object Sticker]** Provides sticker information.

E.g.

```javascript
bot.on('pinnedSticker', (chat, date, messageId, messageUser, pinnedUser, sticker) => {
  // Actions here...
})
```

### onPinnedText
Calls when a user pins text. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who wrote the pinned message.
* `pinnedUser` **[object User]** User who pinned the message.
* `text` **string** Message text.

E.g.

```javascript
bot.on('pinnedText', (chat, date, messageUser, messageId, pinnedUser, text) => {
  // Actions here...
})
```

### onPinnedVenue
Calls when a user pins a venue. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who sent the pinned venue.
* `pinnedUser` **[object User]** User who pinned the message.
* `venue` **[object Venue]** Provides venue information.

E.g.

```javascript
bot.on('pinnedVenue', (chat, date, messageUser, messageId, pinnedUser, venue) => {
  // Actions here...
})
```

### onPinnedVideo
Calls when a user pins a video. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who wrote the pinned message.
* `pinnedUser` **[object User]** User who pinned the message.
* `video` **[object Video]** Provides video information.

E.g.

```javascript
bot.on('pinnedVideo', (chat, date, messageUser, messageId, pinnedUser, video) => {
  // Actions here...
})
```

### onPinnedVideoNote
Calls when a user pins a round video note. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who wrote the pinned message.
* `pinnedUser` **[object User]** User who pinned the message.
* `videoNote` **[object VideoNote]** Provides video note information.

E.g.

```javascript
bot.on('pinnedVideoNote', (chat, date, messageUser, messageId, pinnedUser, videoNote) => {
  // Actions here...
})
```

### onPinnedVoice
Calls when a user pins a voice. This excludes supergroups if the bot isn't an administrator.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `messageId` **number** The message reference that was pinned.
* `messageUser` **[object User]** User who wrote the pinned message.
* `pinnedUser` **[object User]** User who pinned the message.
* `voice` **[object Voice]** Provides voice information.

E.g.

```javascript
bot.on('pinnedVoice', (chat, messageUser, messageId, pinnedUser, voice) => {
  // Actions here...
})
```

### onStartup
Called after when the bot instance is declared and when the getMe data is obtained. This is before the getUpdates loop is started.

* `isSuccess` **boolean** Status if the bot started correctly or not.

E.g.

```javascript
bot.on('startup', (isSuccess) => {
  if (isSuccess) {
    console.log('Loaded: ' + bot.getBotUsername())
    console.log('Loop calling every ' + bot.getInterval() + ' milliseconds.')
    console.log('Startup Time: ' + (new Date().toLocaleTimeString()))
  } else {
    console.error('Unable to getMe with bot token. Make sure token is correct and connected to the internet.')
  }
})
```

### onSticker
Called every time the bot sees a new message. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the message.
* `messageId` **number** Message reference.
* `sticker` **[object Sticker]** Sticker information. Use `sticker.file_id` to keep track of the stickers seen.

E.g.

```javascript
bot.on('sticker', (chat, date, from, messageId, sticker) => {
  // Actions here...
})
```

### onText
Called every time the bot sees a new message. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the message.
* `messageId` **number** Message reference.
* `text` **string** Message text.

E.g.

```javascript
bot.on('text', (chat, date, from, messageId, text) => {
  if (text.toLowerCase().indexOf('hello bot') > -1) {
    bot.sendText(chat.id, 'Hello, ' + from.first_name + '.')
  }
}
```

When someone says "hello bot" in any part of the message. This example will respond with a hello back.

### onVenue
Called every time the bot sees a new venue.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the video.
* `messageId` **number** Message reference.
* `venue` **[object Venue]** Venue information.

E.g.

```javascript
bot.on('venue', (chat, date, from, messageId, venue) => {
  // Actions here...
})
```

### onVideo
Called every time the bot sees a new video.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the video.
* `messageId` **number** Message reference.
* `caption` **string** File caption text. Is `undefined` if one isn't included.
* `video` **[object Video]** Video information. Use `video.file_id` to keep track of the videos seen.

E.g.

```javascript
bot.on('video', (chat, date, from, messageId, caption, video) => {
  // Actions here...
}
```

### onVideoNote
Called every time the bot sees a new round video note.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the video.
* `messageId` **number** Message reference.
* `videoNote` **[object VideoNote]** Video note information. Use `videoNote.file_id` to keep track of the video notes seen.

E.g.

```javascript
bot.on('videoNote', (chat, date, from, messageId, videoNote) => {
  // Actions here...
}
```

### onVoice
Called every time the bot sees a `.ogg` voice message.

* `chat` **[object Chat]** Chat were event occurred.
* `date` **number** Date in milliseconds when event triggered.
* `from` **[object User]** User who sent the voice message.
* `messageId` **number** Content reference id.
* `caption` **string** File caption text. Is `undefined` if one isn't included.
* `voice` **[object Voice]** Voice information. Use `voice.file_id` to keep track of the voice messages seen.

E.g.

```javascript
bot.on('voice', (chat, date, from, messageId, caption, voice) => {
  // Actions here...
})
```

## Actions

### answerInlineQuery
Sends a response to the `onInlineQuery`.

* `queryId` **string** The inlineQueryId of answerInlineQuery event to respond to.
* `results` **Array of [object InlineQueryResult]** The media to respond with.
* `settings` **Object** Use for providing extra perimeters.
    * `cache_time` **number** The maximum seconds the result is cache on the server. Default 300.
    * `is_personal` **boolean** Having true may have results cache on server-side only for the user.
    * `next_offset` **string**
    * `switch_pm_text` **string** Passes the user to PM while sending the content.
    * `switch_pm_parameter` **string**
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

See [inlineQuery](#inlinequery) event for a full use example.

### deleteChatPhoto
Deletes a target channel, group or supergroup photo. The bot requires the appropriate admin privileges.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

```javascript
// Minimum.
bot.deleteChatPhoto(targetChat)

// Optional callback.
bot.deleteChatPhoto(targetChat, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### deleteMessage
Deletes a target message in a chat. This only works if the message was sent under 48 hours. The bot is capable of deleting its messages but requires group administrator to delete other user messages.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `messageId` **number** Target id of the message to delete.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

```javascript
// Minimum.
bot.deleteMessage(targetChat, messageId)

// Optional callback.
bot.deleteMessage(targetChat, messageId, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### editHtml
Shortened [editMessageText](#editmessagetext). Also appends HTML parse_mode to settings. All HTML tags must be closed else the message won't edit.

### editMarkdown
Shortened [editMessageText](#editmessagetext). Also appends Markdown parse_mode to settings. All Markdown tags must be closed else the message won't edit.

### editMessageText
Use this to edit a target chat's message by its id.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `messageId` **number** Message id you want to forward.
* `text` **string** The text to replace with.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `disable_web_page_preview` **boolean** Default false. Prevents links from providing a preview below the message.
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

```javascript
// Minimum.
bot.editMessageText(targetChat, messageId, text)

// Optional settings with callback.
bot.editMessageText(targetChat, messageId, text, {}, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### editText
Shortened [editMessageText](#editmessagetext).

### exportChatInviteLink
Callbacks an invite link of the target chat.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `link` **string** The group invite link.

E.g.

```javascript
bot.exportChatInviteLink(targetChat, (error, link) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### forwardMessage
Forward a message and its content to a target chat.

* `toChat` Target chat id **number** or chat username **string**. Chat username example "@MyGroup".
* `fromChat` Source chat id **number** or chat username **string**. Chat username example "@MyGroup".
* `messageId` **number** Message id you want to forward.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `newMessageId` **number** Use this to keep a reference of the new sent forwardMessage.

E.g.

```javascript
// Minimum.
bot.forwardMessage(toChat, fromChat, messageId)

// Optional settings with callback.
bot.forwardMessage(toChat, fromChat, messageId, settings, (error, newMessageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### getBotUsername
Returns a **string** of the bot username. Example "MyBot". This is obtained automatically during startup via getMe call.

E.g.

```javascript
console.log(bot.getBotUsername())
```

### getChat
Callbacks a **[object Chat]** of the target chat.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `obtainedChat` **[object Chat]** Contains information about the target chat.

E.g.

```javascript
bot.getChat(targetChat, (error, obtainedChat) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### getChatAdministrators
Callbacks an array of **[object User]** with the first index being the group "creator" and the others with "administrator" status. If the bot itself is an administrator, it will also be included. However, other bots will not be included even if have administrator privileges. The second array contains the users' ids for easy access.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `users` **array of [object User]** Contains an array of the chat authority users' object.
    * `userIds` **array of number** Contains an array of the chat authority users' id.

E.g.

```javascript
bot.getChatAdministrators(targetChat, (error, users, userIds) => {
  if (error) {
    console.log(error.message)
    return
  }

  var i = 0
  var length = users.length
  while (i < length) {
    if (i === 0) {
      console.log(users[i].first_name + ' (Creator)')
    } else {
      console.log(users[i].first_name + ' (Administrator)')
    }
    i = i + 1
  }
})
```

Example prints all the chat authorities and their status. Be aware that this function doesn't work in PM.

### getChatMember
Callbacks an **[object User]** and a **string** of the user's chat status.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `user` **[object User]** User object of target.
    * `status` **string** The chat status can either be: "administrator", "creator", "kicked", "left" or "member".

E.g.

```javascript
bot.getChatMember(targetChat, userId, (error, user, status) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### getChatMembersCount
Callbacks a **number** of members in a chat.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `count` **number** Number of users in target chat.

E.g.

```javascript
bot.getChatMembersCount(chatId, (error, count) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### getDevMode
Returns a **boolean** if devMode is enabled or not.

E.g.

```javascript
console.log(bot.getDevMode())
```

### getFile
Callbacks an **[object File]** file from a **file_id**.

* `fileId` **string** Target file you want to obtain information about.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `file` **[object File]** The target file.

E.g.

```javascript
bot.getFile(fileId, (error, file) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### getInterval
Returns a **number** of the bot poll interval per getUpdates in milliseconds.

E.g.

```javascript
console.log(bot.getInterval())
```

### getMe
Callbacks an **[object User]** of the bot itself.

* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `me` **[object User]** Object containing information about the bot.

E.g.

```javascript
bot.getMe((error, me) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### getPort
Returns a **number** of the current port being used. By default it's 443.

E.g.

```javascript
console.log(bot.getPort())
```

### getStartupTime
Returns a **number** in milliseconds. This is a saved `Date.now()` value from when the bot was declared.

E.g.

```javascript
console.log(bot.getStartupTime())
```

### getUserProfilePhotos
Callbacks an **[object UserProfilePhotos]** of the user.

* `userId` **number** Target user id.
* `offset` **number** Starting index of photos to return. Default 0.
* `limit` **number** Last index of photos to return. Default 100.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `photos`**[object UserProfilePhotos]** An object containing information about the target profile photos.

E.g.

```javascript
bot.getUserProfilePhotos(userId, offset, limit, (error, photos) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### kickChatMember
Use this to remove a member from the target chat. Supergroups will require an unban unfortunately due to how the Telegram server handles this method.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `userId` **number** Target user id to kick.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

```javascript
// Minimum.
bot.kickChatMember(targetChat, userId)

// Optional callback.
bot.kickChatMember(targetChat, userId, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### leaveChat
Use this to make your bot leave the target chat.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

```javascript
// Minimum.
bot.leaveChat(targetChat)

// Optional callback.
bot.leaveChat(targetChat, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### pinChatMessage
Use this to pin a target message in a group or supergroup. The bot requires the appropriate admin privileges.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `messageId` **number** The id of the message to pin.
* `settings` **[object Object]** Object containing user settings to change to.
    * `disable_notification` **boolean** If true, it will send a notification to all group members about the new pinned message.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

```javascript
// Minimum.
bot.pinChatMessage(targetChat, messageId)

// Optional settings with callback.
bot.pinChatMessage(targetChat, messageId, {}, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### promoteChatMember
Use this to promote or demote a target user in a target chat. The bot requires the appropriate admin privileges.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `userId` **number** Target user id to change admin rights for.
* `settings` **[object Object]** Object containing user settings to change to.
    * `can_change_info` **boolean** If true, the user can change chat title, photo and other settings.
    * `can_post_messages` **boolean** If true, the user can create channel posts. Channels only.
    * `can_edit_messages` **boolean** If true, the user can edit messages of other users. Channels only.
    * `can_delete_messages` **boolean** If true, the user can delete messages of other users.
    * `can_invite_users` **boolean** If true, the user can invite new users to the chat.
    * `can_restrict_members` **boolean** If true, the user can restrict, ban or unban chat members.
    * `can_pin_messages` **boolean** If true, the user can pin messages. Supergroups only.
    * `can_promote_members` **boolean** If true, the user can add new administrators with a subset of his own privileges or demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by him).

E.g.

```javascript
// Minimum.
bot.promoteChatMember(targetChat, userId, {
  // Least 1 setting here.
})

// Optional callback.
bot.promoteChatMember(targetChat, userId, {
  // Least 1 setting here.
}, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### restrictChatMember
Use this to add or remove a target user restrictions in a target chat. The bot requires the appropriate admin privileges.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `userId` **number** Target user id to change restrictions for.
* `settings` **[object Object]** Object containing user settings to change to.
    * `until_date` **number** Date in unix time. If set for more than 366 days or less than 30 seconds, they are considered restricted forever.
    * `can_send_messages` **boolean** If true, the user can send text messages, contacts, locations and venues.
    * `can_send_media_messages` **boolean** If true, the user can send audios, documents, photos, videos, video notes and voice notes. Implies can_send_messages.
    * `can_send_other_messages` **boolean** If true, the user can send animations, games, stickers and use inline bots. Implies can_send_media_messages.
    * `can_add_web_page_previews` **boolean** If true, the user may add web page previews to their messages. Implies can_send_media_messages.

E.g.

```javascript
// Minimum.
bot.restrictChatMember(targetChat, userId, {
  // Least 1 setting here.
})

// Optional callback.
bot.restrictChatMember(targetChat, userId, {
  // Least 1 setting here.
}, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendAudio
Use this to send a mp3 to a target chat. You'll need to collect the `audio.file_id` with photo event. Be aware that `file_id` is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work. Also they can only send up to 50 mb.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `targetMp3` **string** Target mp3 file id or url.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `caption` **string** Adds a caption text message to the video. 0-200 characters max.
    * `duration` **number**
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `performer` **string**
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
    * `replyToMessageId` **number** Use for sending a reply to a message id.
    * `title` **string**
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `messageId` **number** Id of the sent content.

E.g.

```javascript
// Minimum.
bot.sendAudio(targetChat, targetMp3)

// Optional settings with callback.
bot.sendAudio(targetChat, targetMp3, {}, (error, messageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendChatAction
Use this to send a status notification about your bot in the target chat. It's recommended only to use this if it going to perform a long action such as sending a video.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `action` **string** Can either have: "find_location", "record_audio", "record_video", "typing", "upload_audio", "upload_document", "upload_photo" or "upload_video". Sending a string not matching any of those will cause the action to fail.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

```javascript
// Minimum.
bot.sendChatAction(targetChat, "typing")

// Optional callback.
bot.sendChatAction(targetChat, "typing", (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendContact
Use this to send a made contact.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `phoneNumber` **string** Contact's phone number.
* `firstName` **string** Contact's first name.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `last_name` **string** Contact's last name.
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
    * `replyToMessageId` **number** Use for sending a reply to a message id.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **Error|null** Provides an error object else null if there isn't any.
    * `messageId` **number** Id of the sent content.

E.g.

```javascript
// Minimum.
bot.sendContact(targetChat, phoneNumber, firstName);

// Optional settings with callback.
bot.sendContact(targetChat, phoneNumber, firstName, {}, (error, messageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendDocument
Use this to send a file to a target chat. You'll need to collect the `file.file_id` with files. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `targetFile` **string** Target document id or url.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `caption` **string** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `messageId` **number** Id of the sent content.

E.g.

```javascript
// Minimum.
bot.sendDocument(targetChat, targetFile)

// Optional settings with callback.
bot.sendDocument(targetChat, targetFile, {}, (error, messageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendFile
Shortened version of [sendDocument](#senddocument).

### sendHtml
Shortened version of [sendMessage](#sendmessage). Also appends HTML parse_mode to settings. All HTML tags must be closed else the message won't send.

### sendImage
Alternative to [sendPhoto](#sendphoto).

### sendLocation
Send a live map location.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `latitude` **float number** The latitude point of the location.
* `longitude` **float number** The longitude point of the location.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `live_period` **number** Period in seconds per live update. Value should be between 60 to 86400.
    * `reply_to_messageId` **number** Use for sending a reply to a message id.
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `messageId` **number** Id of the sent content.

E.g.

```javascript
// Minimum.
bot.sendLocation(targetChat, latitude, longitude)

// Optional settings with callback.
bot.sendLocation(targetChat, latitude, longitude, {}, (error, messageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendMarkdown
Shortened version of [sendMessage](#sendmessage). Also appends Markdown parse_mode to settings. All Markdown tags must be closed else the message won't send.

### sendMessage
Use this to send a text message to a target chat.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `text` The text to send. The format can be parsed to HTML or Markdown depending if `parse_mode` is set in the settings object.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `disable_web_page_preview` **boolean** Default false. Prevents links from providing a preview below the message.
    * `parse_mode` **string** This can be set to 'HTML' or 'Markdown' to apply their respective parsing.
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
    * `replyToMessageId` **number** Use for sending a reply to a message id.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `messageId` **number** Id of the sent content.

E.g.

```javascript
// Minimum.
bot.sendMessage(targetChat, text)

// Optional settings with callback.
bot.sendMessage(targetChat, text, {}, (error, messageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendPhoto
Use this to send an image to a target chat. You'll need to collect the `photo[photo.length - 1].file_id` with photo event. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `targetImage` **string** Target image id or url.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `caption` **string** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
    * `replyToMessageId` **number** Use for sending a reply to a message id.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `messageId` **number** Id of the sent content.

E.g.

```javascript
// Minimum.
bot.sendPhoto(targetChat, targetImage)

// Optional settings with callback.
bot.sendPhoto(targetChat, targetImage, {}, (error, messageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendText
Shortened version of [sendMessage](#sendmessage).

### sendVenue
Use this to send a map marked location.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `latitude` **float number** The latitude point of the location.
* `longitude` **float number** The longitude point of the location.
* `title` **string** The title of the location. Doesn't have to be real.
* `address` **string** The address of the location. Doesn't have to be real.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `foursquare_id` **string** Foursquare identifier for the venue.
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_to_messageId` **number** Use for sending a reply to a message id.
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `messageId` **number** Id of the sent content.

E.g.

```javascript
// Minimum.
bot.sendVenue(targetChat, latitude, longitude, title, address)

// Optional settings with callback.
bot.sendVenue(targetChat, latitude, longitude, title, address, {}, (error, messageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendVideo
Use this to send a video to a target chat. You'll need to collect the `video.file_id` with onVideo. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `targetVideo` **string** Target video id or url.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `duration` **number**
    * `width` **number**
    * `height` **number**
    * `caption` **string** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `messageId` **number** Id of the sent content.

E.g.

```javascript
// Minimum.
bot.sendVideo(targetChat, targetVideo)

// Optional settings with callback.
bot.sendVideo(targetChat, targetVideo, {}, (error, messageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendVideoNote
Use this to send a round video note to a target chat. You'll need to collect the `videoNote.file_id` with onVideoNote. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `targetVideo` **string** Target round video note id. URL is currently not supported.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `duration` **number**
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `length` **number**
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `messageId` **number** Id of the sent content.

E.g.

```javascript
// Minimum.
bot.sendVideoNote(targetChat, targetVideo)

// Optional settings with callback.
bot.sendVideoNote(targetChat, targetVideo, {}, (error, messageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### sendVoice
Use this to send a ogg voice file to a target chat. You'll need to collect the `voice.file_id` with onVoice. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work. If uploading from external source. The file needs to be .ogg with OPUS encoding to send.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `targetOgg` **string** Target ogg file id or url. 50 mb is the size limit.
* `settings` **[object Object]** Use for providing extra perimeters.
    * `caption` **string** Adds a caption text message to the video. 0-200 characters max.
    * `duration` **number**
    * `disable_notification` **boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **string** Stringify JSON of **[object ForceReply]**, **[object InlineKeyboardMarkup]**, **[object ReplyKeyboardMarkup]** or **[object ReplyKeyboardRemove]**.
    * `replyToMessageId` **number** Use for sending a reply to a message id.
* `callback` **function** Called after sending the content and returns the following result perimeters.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.
    * `messageId` **number** Id of the sent content.

E.g.

```javascript
// Minimum.
bot.sendVoice(targetChat, targetOgg)

// Optional settings with callback.
bot.sendVoice(targetChat, targetOgg, {}, (error, messageId) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### setChatPhoto

**Not currently available...**

### setChatDescription
Changes the description of the target channel, group or supergroup. The bot has to be present and have administrator priviages for this to work.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `description` **string** The new description.
* `callback` **function** Called after the action response.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

```javascript
// Minimum.
bot.setChatDescription(targetChat, description)

// Optional callback.
bot.setChatDescription(targetChat, description, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### setChatTitle
Changes the title of the target channel, group or supergroup. The bot has to be present and have administrator priviages for this to work.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `title` **string** The new title.
* `callback` **function** Called after the action response.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

```javascript
// Minimum.
bot.setChatTitle(targetChat, title)

// Optional callback.
bot.setChatTitle(targetChat, title, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### setDevMode
Enables and disables console log messages of events and actions. Used for debugging.

* `boolean` **boolean** Enable or disable.

```javascript
bot.setDevMode(boolean)
```

### setInterval
Changes the delay when the bot checks for new updates. Default is 1000.

* `interval` **number** Milliseconds per update. Minimum allowed is 1000.

E.g.

```javascript
bot.setInterval(interval)
```

### setPort
Changes the current active port being used. Ports currently supported are: 80, 88, 443, 8443. Default is 443.

* `port` **number** The port to change to.

E.g.

```javascript
bot.setPort(port)
```

### toString
Returns a string object type of the parent class containing '[object TelegramBot]'.

```javascript
console.log(bot.toString())
```

### unbanChatMember
Unbans a target user from a target group or supergroup. The bot has to be present and have administrator priviages for this to work.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `targetUser` **number** Target user id to unban.
* `callback` **function** Called after the action response.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

```javascript
// Minimum.
bot.unbanChatMember(targetChat, userId)

// Optional callback.
bot.unbanChatMember(targetChat, userId, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

### unpinChatMessage
Use this to unpin the currently used message in a group or supergroup. The bot requires the appropriate admin privileges.

* `targetChat` **number | string** Number for target chat's id, which is recommended. Or string for target chat's username, which only works in public groups and channels. For example "@MyGroup".
* `callback` **function** Called after the action response.
    * `error` **[object Error] | null** Provides an error object else null if there isn't any.

E.g.

```javascript
// Minimum.
bot.unpinChatMessage(targetChat)

// Optional callback.
bot.unpinChatMessage(targetChat, (error) => {
  if (error) {
    // Handle after error.
    return
  }
  // Handle after action success.
})
```

## FAQ

* Q: Why is setChatPhoto not available?
    * A: It requires 'multipart/form-data' method to upload an image. Currently, I don't know how to make this without using third party dependences.

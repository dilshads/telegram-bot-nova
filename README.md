[![completion](https://img.shields.io/badge/completion-80%25-orange.svg)]()
[![contributions](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](#contributing)
[![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)]()
[![jslint_issues](https://img.shields.io/badge/jslint%20issues-none-brightgreen.svg)](http://jslint.com)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Badges from [Shields.io](http://shields.io)

# TelegramBot Node.js getUpdates Method
* [Setting Up](#setting-up)
* [Declaring](#declaring)
    * [Events](#events)
        * [onAudio](#onaudio)
        * [onCommand](#oncommand)
        * [onFile](#onfile)
        * [onGroupJoin](#ongroupjoin)
        * [onGroupLeft](#ongroupleft)
        * [onPhoto](#onphoto)
        * [onPinnedPhoto](#onpinnedphoto)
        * [onPinnedText](#onpinnedtext)
        * [onStartup](#startup)
        * [onText](#ontext)
        * [onVideo](#onvideo)
        * [onVoice](#onvoice)
    * [Actions](#actions)
        * [editHtml / editMarkdown / editText](#edithtml--editmarkdown--edittext)
        * [getChat](#getchat)
        * [getChatAdministrators](#getchatadministrators)
        * [getChatMember](#getchatmember)
        * [getChatMembersCount](#getchatmemberscount)
        * [getFile](#getfile)
        * [getMe](#getme)
        * [getStartUpTime](#getstartuptime)
        * [getUsername](#getusername)
        * [getUserProfilePhotos](#getuserprofilephotos)
        * [kickChatMember](#kickchatmember)
        * [leaveChat](#leavechat)
        * [sendAudio](#sendaudio)
        * [sendChatAction](#sendchataction)
        * [sendContact](#sendcontact)
        * [sendDocument](#senddocument)
        * [sendPhoto](#sendphoto)
        * [sendHtml / sendMarkdown / sendText](#sendhtml--sendmarkdown--sendtext)
        * [sendVideo](#sendvideo)
        * [sendVoice](#sendvoice)
        * [toString](#tostring)
        * [unbanChatMember](#unbanchatmember)
* [FAQ](#faq)
* [Contributing](#contributing)

All the returned objects objects can be found under this section on the [Telegram Bot API/Available Types](https://core.telegram.org/bots/api#available-types) page. The first 2 **{Chat Object}** and **{User Object}** will be the most common ones. Keep note of their values that are optional since you'll need to condition check if they are given or not.

Important note. To avoid unnessary checking for the `from` **{User Object}** exists, if one isn't sent it will be auto declared but without any properties inside.

No external dependencies required.

Uses only 2 built-in node.js modules in order to be able to run.

* https - to perform secure web communication with the Telegram Server. http isn't supported.
* querystring - to convert objects into a url query string to be able to post information with the actions listed below.

**Beware that this class and its documentation is not yet complete. The current functionality is stable and usable to run commands. More stuff and improvements are being added in time.**

## Setting Up
In order to setup your bot. You'll need to download the .zip and extract the contents on your drive. Your Desktop will be fine.

Next you'll need to open **example.js** in your preferred code editor. Some example software are:

**Linux**
* [Bluefish](http://bluefish.openoffice.nl)
* [Visual Studio Code](https://code.visualstudio.com)

**Mac**
... Sorry I don't know what to suggest for Mac.

**Windows**
* [Notepad++](https://notepad-plus-plus.org)
* [Visual Studio Code](https://code.visualstudio.com)

Inside, replace `YOUR_BOT_TOKEN` with your bot token you obtained from BotFather. If you do not have a bot token. Open your Telegram app and search for @BotFather and PM him. This is used for setting up a bot account and being given an access code address for it.

Now you're ready to run and test the example. You should already have Node.js installed on your operating system. For Windows it's just a simple install, for other OS you may have issues.

To test if it's installed. Open Command Prompt if you're on Windows or Terminal if you're on Linux and enter: `node --version` which just prints the current version of node installed.

If success. Simple have your command terminal open and enter: `node "location/of/example.js"` Operating system directories are different so, if your command terminal supports it, you can just click-and-drag **app.js** into it after the space.

## Declaring
In order to use this class. You'll need to require the TelegramBot.js class into your script and declare an instance.

```javascript
// Require the TelegramBot class.
const TelegramBot = require("./TelegramBot");

// Declare a bot instance and connect by your bot token.
var bot = new TelegramBot("YOUR_BOT_TOKEN");

// From here. Just attach events and actions to "bot" directly.
// See the examples under events and actions here or example.js file.
```
You can adjust the default settings during declaration under this example. Missing properties will be set as default.

```javascript
// Require the TelegramBot class.
const TelegramBot = require("./TelegramBot");

// Declare a bot instance and connect by your bot token with additional settings.
var bot = new TelegramBot("YOUR_BOT_TOKEN", {
    "isDebug": false,
    "loopDelay": 3000,
    "port": 443
});
```

* `isDebug` **{Boolean}** Prints full JSON of the getUpdates obtained on the console screen. This is what I use for coding more events.
* `loopDelay` **{Number}** The number of milliseconds per getUpdates request and events of processed and triggered.
* `port` **{Number}** The port number to use.

The default declare values are listed in the example above.

## Events
To setup up an event. You'll need to had required the bot class and declared a bot variable. I've added easy copy and paste examples under each event to make it easily to add to your script.

### onAudio
Gets called every time the bot sees a `.mp3` sound file.

*Arguments*
* `audio` **{Audio Object}** Audio information. Use `audio.file_id` to keep track of the audios seen.
* `caption` **{String}** Caption text. No caption is "".
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who send the audio.

E.g

```javascript
var audios = [];
bot.onAudio = function (audio, caption, chat, from) {
    if (chat.hasProperty("username") && chat.username === "YourChannelUsername") {
        audios.push(audio.file_id);
    }
}
```

This example shows how to effectively make your bot memorize audios. Note that PM, group, supergroup and channels may not return an `username` property so it needs to be checked first if it exists.

### onCommand
Gets called every time the bot sees a command.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who used the command.
* `text` **{String}** Full command message.
* `command` **{String}** The command that was used. (E.g "start" when the user enters "/start".).
* `commandData` **{String}** The remaining text after the first space. No data is "". (E.g "hi" when user enters "/start hi".)

E.g

```javascript
bot.onCommand = function (chat, from, text, command, commandData) {
    if (command === "start") {
        bot.sendText(chat.id, "Hello world.");
    }
}
```

Notice that the id from chat always returns the source were the command was triggered so the bot can reply to. Private message, group, supergroup or even a channel.

### onFile
Calls when a user sends a file. Full quality non-thumbnail images are counted files.

*Arguments*
* `caption` **{String}** File caption text. No caption is "".
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the file.
* `file` **{Document Object}** File information. Use `file.file_id` to keep track of the files seen.

E.g

```javascript
var files = [];
bot.onFile = function (caption, chat, from, file) {
    if (chat.hasProperty("username") && chat.username === "YourChannelUsername") {
        files.push(file.file_id);
    }
}
```

This example shows how to effectively make your bot memorize files. Note that PM, group, supergroup and channels may not return an `username` property so it needs to be checked first if it exists.

### onGroupJoin
Gets called every time the bot sees someone joining the group.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** Triggering user. This can be the user who's in the group who added the new user or the user who joined themselves.
* `user` **{User Object}** The user who joined.

E.g

```javascript
bot.onGroupJoin = function (chat, from, user) {
    bot.sendText(chat.id, "Welcome to our group, " + user.first_name + ".");
}
```

If you're wondering what is a good use of `from` and `user` user objects. You could compare `from.id === user.id` to check if that user invited themselves or `from.id !== user.id` that someone else invited them.

### onGroupLeft
Gets called every time the bot sees someone leaving the group.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}**. Triggering user. This can be the user who's in the group who removed the user or the user who left themselves.
* `user` **{User Object}** The user who left.

E.g

```javascript
bot.onGroupLeft = function (chat, from, user) {
    bot.sendText(chat.id, user.first_name + " left the group.");
}
```

If you're wondering what is a good use of `from` and `user` user objects. You could compare `from.id === user.id` to check if that user left themselves or `from.id !== user.id` that someone else removed them.

### onPhoto
Gets called every time the bot sees a new photo.

*Arguments*
* `caption` **{String}** File caption text. No caption is "".
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** of the user who sent the photo.
* `photo` **{Array} of {PhotoSize Object}** Provides photo information.

E.g

```javascript
var photos = [];
bot.onPhoto = function (chat, from, photo) {
    if (chat.hasProperty("username") && chat.username === "YourChannelUsername") {
        photos.push(photo[photo.length - 1].file_id);
    }
}
```

This example shows how to effectively make your bot memorize photos. Note that PM, group, supergroup and channels may not return an `username` property so it needs to be checked first if it exists. Index 0 of the array is the smallest quality version of the image so having photo.length in the index will get the largest photo file id.

### onPinnedPhoto
Calls when a user pins a photo. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `message_user` **{User Object}** User who wrote the pinned message.
* `pinned_user` **{User Object}** User who pinned the message.
* `photo` **{Array} of {PhotoSize Object}** Provides photo information.

E.g

```javascript
bot.onPinnedPhoto = function (chat, message_user, pinned_user, text) {
    console.log(pinned_user.first_name + " pinned " + message_user.first_name + "'s photo.");
}
```

### onPinnedText
Calls when a user pins text. This excludes supergroups if the bot isn't an administrator.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `message_user` **{User Object}** User who wrote the pinned message.
* `pinned_user` **{User Object}** User who pinned the message.
* `text` **{String}** Message text.

E.g

```javascript
bot.onPinnedText = function (chat, message_user, pinned_user, text) {
    console.log(pinned_user.first_name + " pinned " + message_user.first_name + "'s message that says: " + text);
}
```

### onStartup
Gets called right after the instance declare has succeeded in obtaining getMe data to communicate with the bot. However, it doesn't get called if it fails to start properly.

*No Arguments*

E.g

```javascript
bot.onStartup = function () {
    console.log("Bot startup success.");
};
```

### onText
Gets called every time the bot sees a new message. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

*Arguments*
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the message.
* `text` **{String}** Message text.

E.g

```javascript
bot.onText = function (chat, from, text) {
    if (text.toLowerCase().indexOf("hello bot") > -1) {
        bot.sendText(chat.id, "Hello, " + from.first_name + ".");
    }
}
```

When someone says "hello bot" in any part of the message. This example will respond with a hello back.

### onVideo
Gets called every time the bot sees a new video.

*Arguments*
* `caption` **{String}** File caption text. No caption is "".
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the video.
* `video` **{Video Object}** Video information. Use `video.file_id` to keep track of the videos seen.

E.g

```javascript
var videos = [];
bot.onVideo = function (caption, chat, from, video) {
    if (chat.hasProperty("username") && chat.username === "YourChannelUsername") {
        videos.push(video.file_id);
    }
}
```

This example shows how to effectively make your bot memorize videos. Note that PM, group, supergroup and channels may not return an `username` property so it needs to be checked first if it exists.

### onVoice
Gets called every time the bot sees a `.ogg` voice message.

*Arguments*
* `caption` **{String}** File caption text. No caption is "".
* `chat` **{Chat Object}** Chat were event occured.
* `from` **{User Object}** User who sent the voice message.
* `voice` **{Voice Object}** Voice information. Use `voice.file_id` to keep track of the voice messages seen.

E.g

```javascript
var voices = [];
bot.onVoice = function (caption, chat, from, voice) {
    if (chat.hasProperty("username") && chat.username === "YourChannelUsername") {
        voices.push(voice.file_id);
    }
}
```

This example shows how to effectively make your bot memorize voices. Note that PM, group, supergroup and channels may not return an `username` property so it needs to be checked first if it exists.

## Actions
To setup up an action. You'll need to had required the bot class and declared a bot variable. I've added easy copy and paste examples under each event to make it easily to add to your script.

### editHtml / editMarkdown / editText
Use this to replace a target message. Be aware bots can only replace their own messages.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `messageId` **{Number}** Target id of one of the bot own messages.
* `text` **{String}** The replacement text.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `disable_web_page_preview` **{Boolean}** Default false. If a link or @username exists in the message, setting this to true will prevent it sending a thumbnail image.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.sendText("@MyGroup", "Counter: 0", {}, function (isSuccess, messageId) {
    if (isSuccess) {
        var count = 0;
        setInterval(function () {
            count += 1;
            bot.editText(chat.id, messageId, "Counter: " + count);
            if (count === Number.MAX_SAFE_INTEGER) {
                clearInterval(this);
            }
        }, 1000);
    }
});
```

This example sends "Counter: 0" message to the target chat. If successful, the `setInterval` loop starts and replaces the last messageId with "Counter: 1", 2, 3 and so on every second.


### getChat
Use this to return information about the target chat.

*Required*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `obtainedChat` **{Chat Object}**

E.g

```javascript
bot.getChat("@MyGroup", function (isSuccess, obtainedChat) {
    console.log(obtainedChat.first_name);
});
```

You'll notice I've named it `obtainedChat` just to avoid name collision with `chat`.

### getChatAdministrators
Returns an array containing all the users that are "administrator" status of the group. The "creator" will be the first index 0 while administrators are 1 and higher, if they exist.

*Required*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `users` **{Array}** containing a **{User Object}** per chat authority.

E.g

```javascript
bot.getChatAdministrators(chat_id, function (isSuccess, users) {
    if (isSuccess) {
        var i, length = users.length;
        while (i < length) {
            if (i === 0) {
                console.log(users[i].first_name + " (Creator)");
            } else {
                console.log(users[i].first_name + " (Administrator)");
            }
            i = i + 1;
        }
    }
});
```

Example prints all the chat authorities and their status. Be aware that this function doesn't work in PM.

### getChatMember
Returns an **{User Object}** and a **{String}** of the user's chat status. The chat status can be either: "administrator", "creator", "kicked", "left" or "member".

*Required*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `user` **{User Object}**
    * `status` **{String}**

E.g

```javascript
bot.getChatMember(chat_id, user_id, function (isSuccess, user, status) {
    if (isSuccess) {
        console.log(user.first_name + "'s status is: " + status);
    }
});
```

### getChatMembersCount
Returns an **{Number}** of the number of members in a chat.

*Required*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `count` **{Number}**

E.g

```javascript
bot.getChatMembersCount(chat_id, function (isSuccess, count) {
    if (isSuccess) {
        console.log(count);
    }
});
```

### getFile
Use this to get information about a **file_id**.

*Required*
* `file_id` **{String}** Target file you want to obtain information about.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `file` **{File Object}**

E.g

```javascript
bot.getFile(file_id, function (isSuccess, file) {
    if (isSuccess) {
        console.log(JSON.stringify(file));
    }
});
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
        console.log(bot.first_name);
    }
});
```

### getUsername
Use this to return a **{String}** of the bot username. Example "MyBot".

*No Perimeters*

E.g

```javascript
console.log(bot.getUsername());
```

### getStartUpTime
Use this to return a **{Number}** millisecond value. This is a saved `new Date().getTime()` value from when the bot was declared.

*No Perimeters*

E.g

```javascript
console.log(bot.getStartUpTime());
```

### getUserProfilePhotos
Use this to return a UserProfilePhotos object.

*Required*
* `user_id` **{Number}** Target user id.
* `offset` **{Number}** Starting index of photos to return. Default 0.
* `limit` **{Number}** Last index of photos to return. Default 100.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `photos`**{UserProfilePhotos Object}** An object containing information about the targets profile photos.

E.g

```javascript
bot.getUserProfilePhotos(user_id, 0, 100, function (isSuccess, photos) {
    if (isSuccess) {
        console.log(JSON.stringify(photos));
    }
});
```

I know it's probably not the best example but seeing the JSON tree will be easiler to understand than explaining it.

### kickChatMember
Use this to remove a member from the target chat. Supergroups will require an unban unfortunately due to how the Telegram server handles this command.

*Required*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `user_id` **{Number}** Target user id to kick.

*Optional*
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.kickChatMember(chat_id, user_id, function (isSuccess) {
    if (isSuccess) {
        bot.unban(chat_id, user_id);
    }
});
```

Note that this example should bypass the user from being actually banned from a supergroup to an actual kick were they can rejoin.

### leaveChat
Use this to make your bot leave a chat.

*Required*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".

*Optional*
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.leaveChat(chat_id, function (isSuccess) {
    console.log("Left successfully: " + isSuccess);
});
```

### toString
Returns **{String}** "[object TelegramBot]" that identifies the class.

### sendAudio
Use this to send a mp3 to a target chat. You'll need to collect the `audio.file_id` with onPhoto. Be aware that `file_id` is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work. Also they can only send up to 50 mb.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `mp3_file_id_or_mp3_url` **{String}** Target mp3 file.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `caption` **{String}** Adds a caption text message to the video. 0-200 characters max.
    * `duration` **{Number}**
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `performer` **{String}**
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
    * `reply_to_message_id` **{Number}** Use for sending a reply to a message id.
    * `title` **{String}**
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.sendAudio(chat_id, video_file_id, {}, function (isSuccess) {
    console.log("MP3 sent successfully: " + isSuccess);
});
```

### sendChatAction
Use this to send a status notification to your bot. It's recommended only to use this if it going to perform a long action such as sending a video.

*Required*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `action` **{String}** Can either have: "find_location", "record_audio", "record_video", "typing", "upload_audio", "upload_document", "upload_photo" or "upload_video". Sending a string not matching any of those will cause the action to fail.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.sendChatAction(chat_id, "typing");
```

### sendContact
Use this to send a made contact.

*Required*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `phoneNumber` **{String}** Contact's phone number.
* `firstName` **{String}** Contact's first name.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `last_name` **{String}** Contact's last name.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
    * `reply_to_message_id` **{Number}** Use for sending a reply to a message id.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.sendContact(chat.id, "012345 012345", "John");
```

Note this is just a random number to illistrate the example.

### sendDocument
Use this to send a file to a target chat. You'll need to collect the `video.file_id` with onVideo. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `file_id_or_file_url` **{String}** Target document.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `caption` **{String}** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.sendDocument(chat_id, video_file_id, {}, function (isSuccess) {
    console.log("File sent successfully: " + isSuccess);
});
```

### sendHtml / sendMarkdown / sendText
Use this to send a plain text message to a chat. Note that Telegram automatically formats links, hash tags and @username automatically.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `text` **{String}** Message text to send. Note that text is replaced with `html` for sendHtml and `markdown` for sendMarkdown respectively.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `disable_web_page_preview` **{Boolean}** Default false. If a link or @username exists in the message, setting this to true will prevent it sending a thumbnail image.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
    * `reply_to_message_id` **{Number}** Use for sending a reply to a message id.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**
    * `messageId` **{Number}** Use this to keep the messageId reference to editText later.

E.g

```javascript
// Short basic message.
bot.sendText(chat.id, "Hello world.");

// Sends a message while giving it optional settings.
bot.sendText("@ChatUsername", "Hello world.", {
    "disable_web_page_preview": true
});

// Sends a message while returning a callback telling you if the message sent successfully or not.
var settings = {};
bot.sendText("@" + chat.username, "Hello world.", settings, function (isSuccess) {
    console.log("Message sent successfully: " + isSuccess);
});
```

All html and markdown tags must be closed else the message won't send.

### sendPhoto
Use this to send an image to a target chat. You'll need to collect the `photo[photo.length - 1].file_id` with onPhoto. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `image_file_id_or_image_url` **{String}** Target image file_id or url.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `caption` **{String}** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
    * `reply_to_message_id` **{Number}** Use for sending a reply to a message id.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.sendPhoto(chat_id, video_file_id, {}, function (isSuccess) {
    console.log("Image sent successfully: " + isSuccess);
});
```

### sendVideo
Use this to send a video to a target chat. You'll need to collect the `video.file_id` with onVideo. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `video_file_id` **{String}** Target video file_id.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `duration` **{Number}**
    * `width` **{Number}**
    * `height` **{Number}**
    * `caption` **{String}** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
var settings = {
    "caption": "Video from @MyChannel"
}
bot.sendVideo(chat_id, video_file_id, settings, function (isSuccess) {
    console.log("Video sent successfully: " + isSuccess);
});
```

### sendVoice
Use this to send a ogg voice file to a target chat. You'll need to collect the `voice.file_id` with onVoice. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work. If uploading from external source. The file needs to be .ogg with OPUS encoding to send.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `ogg_file_id_or_ogg_url` **{String}** Target ogg file id or url. 50 mb is the size limit.

*Optional Perimeters*
* `settings` **{Object}** Use for providing extra perimeters.
    * `caption` **{String}** Adds a caption text message to the video. 0-200 characters max.
    * `duration` **{Number}**
    * `disable_notification` **{Boolean}** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
    * `reply_to_message_id` **{Number}** Use for sending a reply to a message id.
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.sendVoice(chat_id, voice_file_id, {}, function (isSuccess) {
    console.log("Voice sent successfully: " + isSuccess);
});
```

### unbanChatMember
Unbans a user from a chat. The bot has to be present in the group and an administrator for this to work.

*Required*
* `chat_id_or_chat_username` Target chat id **{Number}** or chat username **{String}**. Chat username example "@MyGroup".
* `user_id` **{Number}** Target user id to unban.

*Optional*
* `callback` **{Function}** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **{Boolean}**

E.g

```javascript
bot.unbanChatMember(chat_id, user_id, function (isSuccess) {
    console.log("User was unbanned: " + isSuccess);
});
```

## FAQ
* Q: Why did you make this class when there's already others available?
    * A: Some lacked how-to documentation and examples. Also, setting up a certifcate and domain for webhook method seems too complex.
* Q: Will my bot token get misused using this class?
    * A: No. If you don't believe me. Feel free to look through the source code.

## Contributing
* Casing: CONSTANT_NAMING, ClassNaming, functionNaming, variableNaming
* Linting:
    * Visual Studio Code : `/*jslint es6: true, node: true, this: true */`
    * jslint.com : es6 true, node true, multiple vars true, this true
* Spacing: 4 Spaces
* Use-Strict: Allowed

Make sure your editor is set for 4 spaces and not tabs. Notepad++ is set to tab with a spacing of 4 but not actual spaces.

Sorry if the guidelines aren't the best. I'm currently the only user working on this project.

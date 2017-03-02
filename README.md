[![completion](https://img.shields.io/badge/completion-50%25-orange.svg)]()
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
        * [onGroupJoin](#ongroupjoin)
        * [onPhoto](#onphoto)
        * [onText](#ontext)
        * [onVideo](#onvideo)
    * [Actions](#actions)
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
        * [sendPhoto](#sendphoto)
        * [sendHtml / sendMarkdown / sendText](#sendhtml--sendmarkdown--sendtext)
        * [sendVideo](#sendvideo)
        * [toString](#tostring)
        * [unbanChatMember](#unbanchatmember)
* [Contributing](#contributing)

All the returned objects objects can be found under this section on the [Telegram Bot API/Available Types](https://core.telegram.org/bots/api#available-types) page. The first 2 **chat object** and **user object** will be the most common ones. Keep note of their values that are optional since you'll need to condition check if they are given or not.

Important note. To avoid unnessary checking for the `from` **user object** exists, if one isn't sent it will be auto declared but without any properties inside.

No external dependencies required.

Uses only 2 built-in node.js modules in order to be able to run.

* https - to perform secure web communication with the Telegram Server. http isn't supported.
* querystring - to convert objects into a url query string to be able to post information with the actions listed below.

**Beware that this class and its documentation is not yet complete. The current functionality is stable and usable to run commands. More stuff and improvements are being added in time.**

## Setting Up
In order to setup your bot. You'll need to download the .zip and extract the contents on your drive. Your Desktop will be fine.

Next you'll need to open **example.js** in your preferred code editor. Some example software are:

**Windows**
* Visual Studio Code - My preferred and current lightweight editor.
* Notepad++ - An editor I use to use. Is also lightweight but doesn't contain a run debug console to instantly test the code. But is handy for formatting .json.
* Notepad - Not recommended for coding.

**Linux**
* Bluefish - A lightweight code editor for Linux.

... Sorry I don't know what to suggest for Mac.

Inside, replace **YOUR_BOT_TOKEN_HERE** with your bot token you obtained from BotFather. If you do not have a bot token. Open your Telegram app and search for @BotFather and PM him. This is used for setting up a bot account and being given an access code address for it.

Before you ask. This script "does not" publish your bot token unless you program it too. If you don't believe me you're free to look up the source code of **TelegramBot.js**. All it does is allow the class to communicate with the bot, were the class is made to make it easier for you program it.

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

* `isDebug` **Boolean** Prints full JSON of the getUpdates obtained on the console screen. This is what I use for coding more events.
* `loopDelay` **Number** The number of milliseconds per getUpdates request and events of processed and triggered.
* `port` **Number** The port number to use.

The default declare values are listed in the example above.

## Events
To setup up an event. You'll need to had required the bot class and declared a bot variable. I've added easy copy and paste examples under each event to make it easily to add to your script.

### onAudio
Gets called every time the bot sees a mp3.

*Arguments*
* `caption` provides a **String** of the provided caption. No caption is "".
* `chat` provides a **chat object** were the video sent.
* `from` provides an **user object** of the user who sent the video.
* `video` provides a **video object** that provides information about the video. Use video.file_id to keep track of the videos seen.

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
* `chat` provides a **chat object** were the command occurred.
* `from` provides an **user object** who the user who triggered it.
* `text` provides a **string** of the whole text.
* `command` provides a **string** the command used (E.g "start" when the user enters "/start").
* `commandData` provides a **string** of the remaining text after the first space.

E.g

```javascript
bot.onCommand = function (chat, from, text, command, commandData) {
    if (command === "start") {
        bot.sendText(chat.id, "Hello world.");
    }
}
```

Notice that the id from chat always returns the source were the command was triggered so the bot can reply to. Private message, group, supergroup or even a channel.

### onGroupJoin
Gets called every time the bot sees someone joining the group.

*Arguments*
* `chat` provides a **chat object** were the user joined.
* `from` provides an **user object** who invited the new user. This can be the user who's in the group who manually added the new user or the user who joined manually themselves.
* `user` provides a **user object** of the user who joined.

E.g

```javascript
bot.onGroupJoin = function (chat, from, user) {
    bot.sendText(chat.id, "Welcome to our group, " + user.first_name + ".");
}
```

If you're wondering what is a good use of `from` and `user` user objects. You could compare `from.id === user.id` to check if that user invited themselves or `from.id !== user.id` that someone else invited them.

### onPhoto
Gets called every time the bot sees a new photo.

*Arguments*
* `caption` provides a **String** of the provided caption. No caption is "".
* `chat` provides a **chat object** were the photo sent.
* `from` provides an **user object** of the user who sent the photo.
* `photo` provides an **Array** of **photo object** that provides information about the photo.

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

### onText
Gets called every time the bot sees a new message. However, this excludes supergroups if the bot isn't an administrator. Also, bots can't see messages from other bots.

*Arguments*
* `chat` provides a **chat object** were the message sent.
* `from` provides an **user object** of the user who sent the message.
* `text` provides a **string** of the message itself.

E.g

```javascript
bot.onText = function (chat, from, text) {
    if (text.toLowerCase().indexOf("hello bot") > -1) {
        bot.sendText(chat.id, "Hello, " + from.first_name + ".");
    }
}
```

When ever anyone says "hello bot" in any part of the message. This example will respond with a hello back.

### onVideo
Gets called every time the bot sees a new video.

*Arguments*
* `caption` provides a **String** of the provided caption. No caption is "".
* `chat` provides a **chat object** were the video sent.
* `from` provides an **user object** of the user who sent the video.
* `video` provides a **video object** that provides information about the video. Use video.file_id to keep track of the videos seen.

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

## Actions
To setup up an action. You'll need to had required the bot class and declared a bot variable. I've added easy copy and paste examples under each event to make it easily to add to your script.

### getChat
Use this to return information about the target chat.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `obtainedChat` **chat object**

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
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `users` **Array** containing a **user object** per chat authority.

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
Returns an **user object** and a **String** of the user's chat status. The chat status can be either: "administrator", "creator", "kicked", "left" or "member".

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `user` **user object**
    * `status` **String**

E.g

```javascript
bot.getChatMember(chat_id, user_id, function (isSuccess, user, status) {
    if (isSuccess) {
        console.log(user.first_name + "'s status is: " + status);
    }
});
```

### getChatMembersCount
Returns an **Number** of the number of members in a chat.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `count` **Number**

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
* `file_id` **String** Target file you want to obtain information about.
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `file` **file object**

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
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `bot` **user object**

E.g

```javascript
bot.getMe(function (isSuccess, bot) {
    if (isSuccess) {
        console.log(bot.first_name);
    }
});
```

### getUsername
Use this to return a **String** of the bot username. Example "MyBot".

*No Perimeters*

E.g

```javascript
console.log(bot.getUsername());
```

### getStartUpTime
Use this to return a **Number** millisecond value. This is a saved `new Date().getTime()` value from when the bot was declared.

*No Perimeters*

E.g

```javascript
console.log(bot.getStartUpTime());
```

### getUserProfilePhotos
Use this to return a UserProfilePhotos object.

*Required*
* `user_id` **Number** Target user id.
* `offset` **Number** Starting index of photos to return. Default 0.
* `limit` **Number** Last index of photos to return. Default 100.
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `photos`**UserProfilePhotos object** An object containing information about the targets profile photos.

E.g

```javascript
bot.getUserProfilePhotos(user_id, 0, 100, function (isSuccess, photos) {
    if (isSuccess) {
        console.log(JSON.stringify(photos));
    }
});
```

I know it's probably not the best example but seeing the json tree will be easiler to understand than explaining it.

### kickChatMember
Use this to remove a member from the target chat. Supergroups will require an unban unfortunately due to how the Telegram server handles this command.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `user_id` **Number** Target user id to kick.

*Optional*
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

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
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".

*Optional*
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

```javascript
bot.leaveChat(chat_id, function (isSuccess) {
    console.log("Left successfully: " + isSuccess);
});
```

### toString
Returns **String** "[object TelegramBot]" that identifies the class.

### sendAudio
Use this to send a mp3 to a target chat. You'll need to collect the `photo[photo.length].file_id` with onPhoto. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `mp3_file_id_or_mp3_url` **String** Target mp3 file_id or url.

*Optional Perimeters*
* `settings` **Object** Use for providing extra perimeters.
    * `caption` **String** Adds a caption text message to the video. 0-200 characters max.
    * `duration` **Number**
    * `disable_notification` **Boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `performer` **String**
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
    * `reply_to_message_id` **Number** Use for sending a reply to a message id.
    * `title` **String**
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

```javascript
bot.sendPhoto(chat_id, video_file_id, {}, function (isSuccess) {
    console.log("Image sent successfully: " + isSuccess);
});
```

Note that `duration`, `performer` and `title` don't work after testing mp3 file_id and url.

### sendChatAction
Use this to send a status notification to your bot. It's recommended only to use this if it going to perform a long action such as sending a video.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `action` **String** Can either have: "find_location", "record_audio", "record_video", "typing", "upload_audio", "upload_document", "upload_photo" or "upload_video". Sending a string not matching any of those will cause the action to fail.
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

```javascript
bot.sendChatAction(chat_id, "typing"); // It wouldn't be necessary to check callback if it was success but it's there anyway.
```

### sendHtml / sendMarkdown / sendText
Use this to send a plain text message to a chat. Note that Telegram automatically formats links, hash tags and @username automatically.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `text` **String** Message text to send. Note that text is replaced with `html` for sendHtml and `markdown` for sendMarkdown respectively.

*Optional Perimeters*
* `settings` **Object** Use for providing extra perimeters.
    * `disable_notification` **Boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `disable_web_page_preview` **Boolean** Default false. If a link or @username exists in the message, setting this to true will prevent it sending a thumbnail image.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
    * `reply_to_message_id` **Number** Use for sending a reply to a message id.
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

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
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `image_file_id_or_image_url` **String** Target image file_id or url.

*Optional Perimeters*
* `settings` **Object** Use for providing extra perimeters.
    * `caption` **String** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **Boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
    * `reply_to_message_id` **Number** Use for sending a reply to a message id.
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

```javascript
bot.sendPhoto(chat_id, video_file_id, {}, function (isSuccess) {
    console.log("Image sent successfully: " + isSuccess);
});
```

### sendVideo
Use this to send a video to a target chat. You'll need to collect the `video.file_id` with onVideo. Be aware that file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `video_file_id` **String** Target video file_id.

*Optional Perimeters*
* `settings` **Object** Use for providing extra perimeters.
    * `duration` **Number**
    * `width` **Number**
    * `height` **Number**
    * `caption` **String** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **Boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

```javascript
var settings = {
    "caption": "Video from @MyChannel"
}
bot.sendVideo(chat_id, video_file_id, settings, function (isSuccess) {
    console.log("Video sent successfully: " + isSuccess);
});
```

### unbanChatMember
Unbans a user from a chat. The bot has to be present in the group and an administrator for this to work.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `user_id` **Number** Target user id to unban.

*Optional*
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

```javascript
bot.unbanChatMember(chat_id, user_id, function (isSuccess) {
    console.log("User was unbanned: " + isSuccess);
});
```

## Contributing
* Casing: CONSTANT_NAMING, ClassNaming, functionNaming, variableNaming
* Linting:
    * Visual Studio Code : `/*jslint es6: true, node: true, this: true */`
    * jslint.com : es6 true, node true, multiple vars true, this true
* Spacing: 4 Spaces
* Use-Strict: Allowed

Make sure your editor is set for 4 spaces and not tabs. Notepad++ is set to tab with a spacing of 4 but not actual spaces.

Sorry if the guidelines aren't the best. I'm currently the only user working on this project.

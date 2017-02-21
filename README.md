# TelegramBot Node.js getUpdates Method

**Beware that this class and its documentation is not yet complete. The current functionality is stable and usable to run commands. More stuff and improvements are being added in time.**

## Setting Up
In order to setup your bot. You'll need to download the .zip and extract the contents on your drive. Your Desktop will be fine.

Next you'll need to open **example.js** in your preferred code editor. Some example software are:
* Visual Studio Code (Windows) - My preferred and current lightweight editor.
* Notepad++ (Windows) - An editor I use to use. Is also lightweight but doesn't contain a run debug console to instantly test the code. But is handy for formatting .json.
* Notepad (Windows) - Not recommended for coding.
* Bluefish (Linux) - A lightweight code editor for Linux.

... Sorry I don't know what to suggest for Mac.

Inside, replace **YOUR_BOT_TOKEN_HERE** with your bot token you obtained from BotFather. If you do not have a bot token. Open your Telegram app and search for @BotFather and PM him. This is used for setting up a bot account and being given an access code address for it.

Before you ask. This script "does not" publish your bot token unless you program it too. If you don't believe me you're free to look up the source code of **TelegramBot.js**. All it does is allow the class to communicate with the bot, were the class is made to make it easier for you program it.

Now you're ready to run and test the example. You should already have Node.js installed on your operating system. For Windows it's just a simple install, for other OS you may have issues.

To test if it's installed. Open Command Prompt if you're on Windows or Terminal if you're on Linux and enter: `node --version` which just prints the current version of node installed.

If success. Simple have your command terminal open and enter: `node "location/of/example.js"` Operating system directories are different so, if your command terminal supports it, you can just click-and-drag **app.js** into it after the space.

## Events
To setup up an event. You'll need to had required the bot class and declared a bot variable. I've added easy copy and paste examples under each event to make it easily to add to your script.

### onCommand
Gets called every time the bot is issued a command and provides the following perimeters:
* `chat` provides a **chat object** were the command occurred.
* `from` provides an **user object** who the user who triggered it.
* `text` provides a **string** of the whole text.
* `command` provides a **string** the command used (E.g "start" when the user enters "/start").
* `commandData` provides a **string** of the remaining text after the first space.

E.g

    bot.onCommand = function (chat, from, text, command, commandData) {
        if (command === "start") {
            bot.sendText(chat.id, "Hello world.");
        }
    }

Notice that the id from chat always returns the source were the command was triggered so the bot can reply to. Private message, group, supergroup or even a channel.

### onGroupJoin
Gets called every time an user joins a group or a supergroup the bot is in and provides the follow perimeters:
* `chat` provides a **chat object** were the user joined.
* `from` provides an **user object** who invited the new user. This can be the user who's in the group who manually added the new user or the user who joined manually themselves.
* `user` provides a **user object** of the user who joined.

E.g

    bot.onGroupJoin = function (chat, from, user) {
        bot.sendText(chat.id, "Welcome to our group, " + user.first_name + ".");
    }

If you're wondering what is a good use of `from` and `user` user objects. You could compare `from.id === user.id` to check if that user invited themselves or `from.id !== user.id` that someone else invited them.

### onText
Gets called every time a user sends a message. However, this excludes supergroups if the bot isn't an administrator. The perimeters are:
* `chat` provides a **chat object** were the message sent.
* `from` provides an **user object** of the user who sent the message.
* `text` provides a **string** of the message itself.

E.g

    bot.onText = function (chat, from, text) {
        if (text.toLowerCase().indexOf("hello bot") > -1) {
            bot.sendText(chat.id, "Hello, " + from.first_name + ".");
        }
    }

When ever anyone says "hello bot" in any part of the message. This example will respond with a hello back.

### onVideo
Gets called every time a user sends a video and the perimeters are:
* `chat` provides a **chat object** were the video sent.
* `from` provides an **user object** of the user who sent the video.
* `video` provides a **video object** that provides information about the video. Use video.file_id to keep track of the videos seen.

E.g

    var videos = [];
    bot.onVideo = function (chat, from, video) {
        if (chat.hasProperty("username") && chat.username === "YourChannelUsername") {
            videos.push(video.file_id);
        }
    }

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

    bot.getChat("@MyGroup", function (isSuccess, obtainedChat) {
        console.log(obtainedChat.first_name);
    });

You'll notice I've named it `obtainedChat` just to avoid name collision with `chat`.

### getChatAdministrators
Returns an array containing all the users that are "administrator" status of the group. The "creator" will be the first index 0 while administrators are 1 and higher, if they exist.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `users` **Array** containing a **user object** per chat authority.

E.g

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

    bot.getChatMember(chat_id, user_id, function (isSuccess, user, status) {
        if (isSuccess) {
            console.log(user.first_name + "'s status is: " + status);
        }
    });


### getChatMembersCount
Returns an **Integer** of the number of members in a chat.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `count` **Integer**

E.g

    bot.getChatMembersCount(chat_id, function (isSuccess, count) {
        if (isSuccess) {
            console.log(count);
        }
    });

### getFile
Use this to get information about a **file_id**.

*Required*
* `file_id` **String** Target file you want to obtain information about.
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `file` **file object**

E.g

    bot.getFile(file_id, function (isSuccess, file) {
        if (isSuccess) {
            console.log(JSON.stringify(file));
        }
    });

### getMe
Use this to get information about the bot. By default the class automatically uses it when start.

*Required*
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**
    * `bot` **user object**

E.g

    bot.getMe(function (isSuccess, bot) {
        if (isSuccess) {
            console.log(bot.first_name);
        }
    });

### getUsername
Use this to return a **String** of the bot username. Example "MyBot".

*No Perimeters*

E.g

    console.log(bot.getUsername());

### getStartUpTime
Use this to return an **Integer** millisecond value. This is a saved `new Date().getTime()` value from when the bot was declared.

*No Perimeters*

E.g

    var dateAndTimeWhenBotDeclared = bot.getStartUpTime();

### kickChatMember
Use this to remove a member from the target chat. Supergroups will require an unban unfortunately due to how the Telegram server handles this command.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `user_id` **Integer** Target user id to kick.

*Optional*
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

    bot.kickChatMember(chat_id, user_id, function (isSuccess) {
        if (isSuccess) {
            bot.unban(chat_id, user_id);
        }
    });

Note that this example should bypass the user from being actually banned from a supergroup to an actual kick were they can rejoin.

### leaveChat
Use this to make your bot leave a chat.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".

*Optional*
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

    bot.leaveChat(chat_id, function (isSuccess) {
        console.log("Left successfully: " + isSuccess);
    });

### toString
Returns **String** "[object TelegramBot]" that identifies the class.

### sendChatAction
Use this to send a status notification to your bot. It's recommended only to use this if it going to perform a long action such as sending a video.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `action` **String** Can either have: "find_location", "record_audio", "record_video", "typing", "upload_audio", "upload_document", "upload_photo" or "upload_video". Sending a string not matching any of those will cause the action to fail.
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

    bot.sendChatAction(chat_id, "typing"); // It wouldn't be necessary to check callback if it was success but it's there anyway.

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
    * `reply_to_message_id` **Integer** Use for sending a reply to a message id.
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

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

All html and markdown tags must be closed else the message won't send.

### sendVideo
Use this to send a video to a target chat. You'll need to collect the `video.file_id` with onVideo. Be aware that video.file_id is unique per bot, meaning if you give the id to another bot and tried to send it. It won't work.

*Required Perimeters*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `video_file_id` **String** Target video file_id.

*Optional Perimeters*
* `settings` **Object** Use for providing extra perimeters.
    * `duration` **Integer**
    * `width` **Integer**
    * `height` **Integer**
    * `caption` **String** Adds a caption text message to the video. 0-200 characters max.
    * `disable_notification` **Boolean** Default false. Sends the message silently. Android users will still get a notification but with no sound.
    * `reply_markup` **ForceReply**, **InlineKeyboardMarkup**, **ReplyKeyboardMarkup** or **ReplyKeyboardRemove** Untested.
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

    var settings = {
        "caption": "Video from @MyChannel"
    }
    bot.sendVideo(chat_id, video_file_id, settings, function (isSuccess) {
        console.log("Video sent successfully: " + isSuccess);
    });

### unbanChatMember
Unbans a user from a chat. The bot has to be present in the group an an administrator for this to work.

*Required*
* `chat_id_or_chat_username` Target chat id **Number** or chat username **String**. Chat username example "@MyGroup".
* `user_id` **Integer** Target user id to unban.

*Optional*
* `callback` **Function** Called after sending the content and returns the following result perimeters.
    * `isSuccess` **Boolean**

E.g

    bot.unbanChatMember(chat_id, user_id, function (isSuccess) {
        console.log("User was unbanned: " + isSuccess);
    });

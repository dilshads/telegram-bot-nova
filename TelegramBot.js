/*jslint es6: true, node: true, this: true */
const https = require("https");
const querystring = require("querystring");

module.exports = function (token, isDebug) {
    "use strict";
    var loopDelay = 3000,
        self = this,
        startUpTime = new Date().getTime(),
        username = "",
        updateId = 0;

    var getUpdates, hasDeepProperty, loop, processEvent, web;

    getUpdates = function () {
        web("GET", "/getUpdates", {"offset": updateId}, function (data) {
            if (!data.ok) {
                console.error("getUpdates: Warning data returned false. " + JSON.stringify(data));
                return;
            }
            if (isDebug && data.result.length) {
                console.log("**** Debug ****\n" + JSON.stringify(data) + "\n **** End Debug ****");
            }
            data.result.forEach(function (result) {
                processEvent(result);
            });
            loop();
        });
    };

    hasDeepProperty = function (obj, pathString) {
        var i = 0, properties = pathString.split("."), l = properties.length;
        while (i < l) {
            if (obj.hasOwnProperty(properties[i])) {
                obj = obj[properties[i]];
            } else {
                return false;
            }
            i += 1;
        }
        return true;
    };

    loop = function () {
        setTimeout(getUpdates, loopDelay);
    };

    processEvent = function (result) {
        var command = "",
            commandData = "",
            content,
            split;

        updateId = result.update_id + 1;

        // Since result.message and result.channel_post hold the same content.
        // This simplfies the checking.
        if (result.hasOwnProperty("message")) {
            content = result.message;
        } else if (result.hasOwnProperty("channel_post")) {
            content = result.channel_post;
        } else {
            console.error("processEvent - Unknown result found. " + JSON.stringify(result));
            return;
        }

        // Saves users having to check if from is defind first due to channels.
        if (!content.hasOwnProperty("from")) {
            content.from = {};
        }

        // onCommand
        if (hasDeepProperty(content, "entities.0.type") && content.entities[0].type === "bot_command") {
            if (content.text.charAt(0) !== "\/") {
                return;
            }
            split = content.text.indexOf(" ");
            if (split > -1) {
                command = content.text.substring(1, split).toLowerCase();
                commandData = content.text.substr(split + 1).trim();
            } else {
                command = content.text.substr(1).toLowerCase();
                // Removes the @NameOfBot at the end of the command so it con be processed correctly.
                if (command.endsWith("@" + username.toLowerCase())) {
                    command = command.substring(0, command.length - (username.length + 1));
                }
            }
            try {
                self.onCommand(content.chat, content.from, content.text, command, commandData);
            } catch (onCommandError) {
                self.onError("onCommand", onCommandError);
            }
        }

        // onGroupJoin
        if (hasDeepProperty(content, "new_chat_member")) {
            try {
                self.onGroupJoin(content.chat, content.from, content.new_chat_member);
            } catch (onGroupJoinError) {
                self.onError("onJoinGroup", onGroupJoinError);
            }
        }

        // onText
        if (!hasDeepProperty(content, "entities") && hasDeepProperty(content, "text")) {
            try {
                self.onText(content.chat, content.from, content.text);
            } catch (onTextError) {
                self.onError("onText", onTextError);
            }
        }

        // onVideo
        if (hasDeepProperty(content, "video")) {
            try {
                self.onVideo(content.chat, content.from, content.video);
            } catch (onVideoError) {
                self.onError("onVideo", onVideoError);
            }
        }
    };

    web = function (method, command) {
        var i = 2, l = arguments.length, callback, urlData;
        // Check the argument's types for optional passed parameter options.
        while (i < l) {
            if (typeof arguments[i] === "object" && urlData === undefined) {
                urlData = arguments[i];
            } else if (typeof arguments[i] === "function" && callback === undefined) {
                callback = arguments[i];
            } else {
                break;
            }
            i += 1;
        }
        // Callback with rest parameter doesn't work on Servers Ultimate Pro on Android.
        /*
        args.forEach(function (arg) {
            if (typeof arg === "object" && urlData === undefined) {
                urlData = arg;
            } else if (typeof arg === "function" && callback === undefined) {
                callback = arg;
            } else {
                return;
            }
        });
        */
        var postData = querystring.stringify(urlData);
        var options = {
            "hostname": "api.telegram.org",
            "port": 443, // default 443
            "path": "/" + token + command,
            "method": method,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": postData.length
            }
        };
        var request = https.request(options, function (result) {
            // console.log("statusCode:", result.statusCode);
            // console.log('headers:', result.headers);
            var queueData = "";
            result.on("data", function (data) {
                queueData += data;
            });
            result.on("end", function () {
                if (typeof callback === "function") {
                    callback(JSON.parse(queueData));
                }
            });
        });
        request.on("error", function () {
            loop();
        });
        request.write(postData);
        request.end();
    };

    this.getChat = function (chatIdOrTag, callback) {
        var urlQuery = {
            "chat_id": chatIdOrTag
        };
        web("GET", "/getChat", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok, data.result);
            }
        });
    };

    this.getChatAdministrators = function (chatIdOrTag, callback) {
        var urlQuery = {
            "chat_id": chatIdOrTag
        };
        web("GET", "/getChatAdministrators", urlQuery, function (data) {
            var admins = [], creator = [];
            if (data.ok) {
                data.result.forEach(function (value) {
                    if (value.status === "creator") {
                        creator.push(value.user);
                    } else {
                        admins.push(value.user);
                    }
                });
            }
            if (typeof callback === "function") {
                callback(data.ok, creator.concat(admins));
            }
        });
    };

    this.getChatMember = function (chatIdOrTag, userId, callback) {
        var urlQuery = {
            "chat_id": chatIdOrTag,
            "user_id": userId
        };
        web("GET", "/getChatMember", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok, data.result.user, data.result.status);
            }
        });
    };

    this.getChatMembersCount = function (chatIdOrTag, callback) {
        var urlQuery = {
            "chat_id": chatIdOrTag
        };
        web("GET", "/getChatMembersCount", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok, data.result);
            }
        });
    };

    this.getFile = function (telegramFileUrl, callback) {
        var urlQuery = {
            "file_id": telegramFileUrl
        };
        web("GET", "/getFile", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok, data.result);
            }
        });
    };

    this.getMe = function (callback) {
        web("GET", "/getMe", function (data) {
            callback(data.ok, data.result);
        });
    };

    this.getStartUpTime = function () {
        return startUpTime;
    };

    this.getUsername = function () {
        return username;
    };

    this.getUserProfilePhotos = function (userId, offset, limit, callback) {
        var urlQuery = {
            "user_id": userId,
            "offset": offset,
            "limit": limit
        };
        web("GET", "/getUserProfilePhotos", urlQuery, function (data) {
            console.log(JSON.stringify(data));
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result);
                } else {
                    callback(data.ok, false);
                }
            }
        });
    };

    this.kickChatMember = function (chatIdOrTag, userId, callback) {
        var urlQuery = {
            "chat_id": chatIdOrTag,
            "user_id": userId
        };
        web("GET", "/kickChatMember", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.leaveChat = function (chatIdOrTag, callback) {
        var urlQuery = {
            "chat_id": chatIdOrTag
        };
        web("GET", "/leaveChat", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.onCommand = function () {
        console.log("onCommand: no handler.");
    };

    this.onDocument = function () { // Compressed images are counted as documents.
        console.log("onDocument: no handler.");
    };

    this.onError = function () {
        console.log("onError: no handler.");
    };

    this.onGroupJoin = function () {
        /**
          * 0 chat - "object chat" group were the join occured.
          * 1 from - "object user" user that joined theirself or the group member adder.
          * 2 user - "object user" user that is joining.
          */
        console.log("onGroupJoin: no handler.");
    };

    this.onPhoto = function () {
        console.log("onPhoto: no handler.");
    };

    this.onText = function () {
        console.log("onText: no handler.");
    };

    this.onStartUp = function () {
        console.log("onStartUp: no handler.");
    };

    this.onVideo = function () {
        console.log("onVideo: no handler.");
    };

    this.sendChatAction = function (chatIdOrTag, action, callback) {
        var urlQuery = {
            "chat_id": chatIdOrTag,
            "action": action
        };
        web("GET", "/sendChatAction", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.sendHtml = function (chatId, html, settings, callback) {
        var urlQuery = {
            "chat_id": chatId,
            "text": html,
            "parse_mode": "HTML"
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
            console.log(urlQuery);
        }
        web("POST", "/sendMessage", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.sendMarkdown = function (chatId, md, settings, callback) {
        var urlQuery = {
            "chat_id": chatId,
            "text": md,
            "parse_mode": "Markdown"
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("POST", "/sendMessage", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.sendText = function (chatId, text, settings, callback) {
        var urlQuery = {
            "chat_id": chatId,
            "text": text
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("POST", "/sendMessage", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.sendVideo = function (chatId, videoLinkOrId, settings, callback) {
        var urlQuery = {
            "chat_id": chatId,
            "video": videoLinkOrId
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("POST", "/sendVideo", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.toString = function () {
        return "[object TelegramBot]";
    };

    this.unbanChatMember = function (chatIdOrTag, userId, callback) {
        var urlQuery = {
            "chat_id": chatIdOrTag,
            "user_id": userId
        };
        web("GET", "/unbanChatMember", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    // Initialize the bot.
    self.getMe(function (isSuccess, bot) {
        if (!isSuccess) {
            console.error("Unable to getMe with bot token. Make sure token is correct and connected to the internet.");
            return;
        }
        username = bot.username;
        console.log("Loaded: " + username);
        console.log("Loop calling every " + loopDelay + " milliseconds.");
        self.onStartUp();
        loop();
    });

};

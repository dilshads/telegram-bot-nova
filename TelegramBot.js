/*jslint es6: true, node: true, this: true */
const https = require("https");
const querystring = require("querystring");

module.exports = function (token, isDebug) {
    "use strict";
    const DEFAULTS = {
        caption: "",
        from: {}
    };

    var loopDelay = 3000,
        self = this,
        startUpTime = new Date().getTime(),
        username = "",
        updateId = 0;

    var defaultsDeep, getUpdates, hasDeepProperty, loop, processEvent, web;

    defaultsDeep = function (target, defaults) {
        var clone = JSON.parse(JSON.stringify(target));
        function run(clone, defaults) {
            Object.getOwnPropertyNames(defaults).forEach(function (property) {
                if (Object.prototype.toString.call(defaults[property]) === "[object Object]") {
                    if (!clone.hasOwnProperty(property)) {
                        clone[property] = {};
                    }
                    run(clone[property], defaults[property]);
                } else if (!clone.hasOwnProperty(property)) {
                    clone[property] = defaults[property];
                }
            });
        }
        run(clone, defaults);
        return clone;
    };

    getUpdates = function () {
        var urlQuery = {
            "offset": updateId
        };
        web("GET", "/getUpdates", urlQuery, function (data) {
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

        // Adds default values only for those that are missing.
        content = defaultsDeep(content, DEFAULTS);

        // onAudio
        if (content.hasOwnProperty("audio")) {
            try {
                self.onAudio(content.audio, content.caption, content.chat, content.from);
            } catch (onAudioError) {
                self.onError("onAudio", onAudioError);
            }
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

        // onPhoto
        if (content.hasOwnProperty("photo")) {
            try {
                self.onPhoto(content.caption, content.chat, content.from, content.photo);
            } catch (onPhotoError) {
                self.onError("onPhoto", onPhotoError);
            }
        }

        // onGroupJoin
        if (content.hasOwnProperty("new_chat_member")) {
            try {
                self.onGroupJoin(content.chat, content.from, content.new_chat_member);
            } catch (onGroupJoinError) {
                self.onError("onJoinGroup", onGroupJoinError);
            }
        }

        // onText
        if (!content.hasOwnProperty("entities") && content.hasOwnProperty("text")) {
            try {
                self.onText(content.chat, content.from, content.text);
            } catch (onTextError) {
                self.onError("onText", onTextError);
            }
        }

        // onVideo
        if (content.hasOwnProperty("video")) {
            try {
                self.onVideo(content.caption, content.chat, content.from, content.video);
            } catch (onVideoError) {
                self.onError("onVideo", onVideoError);
            }
        }
    };

    web = function (method, command, urlData, callback) {
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
                if (data.ok) {
                    callback(data.ok, data.result.user, data.result.status);
                } else {
                    callback(data.ok);
                }
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
        var urlQuery = {};
        web("GET", "/getMe", urlQuery, function (data) {
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
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result);
                } else {
                    callback(data.ok);
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
        return;
    };

    this.onDocument = function () { // Compressed images on Desktop Telegram are counted as documents.
        return;
    };

    this.onError = function () {
        return;
    };

    this.onGroupJoin = function () {
        return;
    };

    this.onPhoto = function () {
        return;
    };

    this.onText = function () {
        return;
    };

    this.onStartUp = function () {
        return;
    };

    this.onVideo = function () {
        return;
    };

    this.sendAudio = function (chatIdOrTag, fileIdOrLink, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrTag,
            "audio": fileIdOrLink
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("GET", "/sendAudio", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
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

    this.sendPhoto = function (chatId, fileIdOrLink, settings, callback) {
        var urlQuery = {
            "chat_id": chatId,
            "photo": fileIdOrLink
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("POST", "/sendPhoto", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
        return;
    };

    this.sendHtml = function (chatId, html, settings, callback) {
        var urlQuery = {
            "chat_id": chatId,
            "text": html,
            "parse_mode": "HTML"
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

    this.sendVideo = function (chatId, fileIdOrLink, settings, callback) {
        var urlQuery = {
            "chat_id": chatId,
            "video": fileIdOrLink
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

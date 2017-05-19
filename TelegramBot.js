const https = require("https");
const querystring = require("querystring");

module.exports = function (token, declareSettings) {
    "use strict";
    const TOKEN = token;

    var botSettings = {
        "isDebug": false,
        "loopDelay": 3000,
        "method": "POST",
        "port": 443
    };

    var self = this,
        startupTime = Date.now(),
        updateId = 0,
        username = "";

    if (typeof declareSettings === "object") {
        Object.assign(botSettings, declareSettings);
    }

    var getUpdates, hasDeepProperty, loop, processEvent, web;

    getUpdates = function () {
        var urlQuery = {
            "offset": updateId
        };
        web("getUpdates", urlQuery, function (data) {
            if (!data.ok) {
                console.error("getUpdates: Warning data returned false. " + JSON.stringify(data));
                return;
            }
            if (botSettings.isDebug && data.result.length) {
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
        setTimeout(getUpdates, botSettings.loopDelay);
    };

    processEvent = function (result) {
        var command = "",
            commandData = "",
            content,
            split;

        updateId = result.update_id + 1;

        // onEditText
        if (result.hasOwnProperty("edited_channel_post") || result.hasOwnProperty("edited_message")) {
            if (result.hasOwnProperty("edited_channel_post")) {
                content = result.edited_channel_post;
            } else {
                content = result.edited_message;
            }
            // Adds default values only for those that are missing.
            if (!content.from) {
                content.from = {};
            }
            try {
                self.onEditText(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.text
                );
            } catch (onEditTextError) {
                self.onError("onEditText", onEditTextError);
            }
            // End of onEdit content.
            return;
        }

        // onKeyboardCallbackData
        if (result.hasOwnProperty("callback_query")) {
            content = result.callback_query;
            // Adds default values only for those that are missing.
            if (!content.from) {
                content.from = {};
            }
            try {
                self.onKeyboardCallbackData(
                    content.message.chat,
                    content.from,
                    content.message.message_id,
                    content.data
                );
            } catch (onKeyboardCallbackDataError) {
                self.onError("onKeyboardCallbackData", onKeyboardCallbackDataError);
            }
            // End of onKeyboard content.
            return;
        }

        // Since result.message and result.channel_post hold near the same content.
        // This simplfies the checking.
        if (result.hasOwnProperty("message")) {
            content = result.message;
        } else if (result.hasOwnProperty("channel_post")) {
            content = result.channel_post;
        } else {
            console.error("processEvent - Unknown result found.\n" + JSON.stringify(result));
            return;
        }

        // Adds default values only for those that are missing.
        if (!content.from) {
            content.from = {};
        }

        // onForward content.
        if (content.hasOwnProperty("forward_from")) {
            // onForwardAny
            if (content.hasOwnProperty("forward_from")) {
                try {
                    self.onForwardAny(
                        content.chat,
                        content.from,
                        content.message_id,
                        content.forward_from
                    );
                } catch (onForwardAnyError) {
                    self.onError("onForwardAny", onForwardAnyError);
                }
            }

            // onForwardAudio
            if (content.hasOwnProperty("audio")) {
                try {
                    self.onForwardContact(
                        content.chat,
                        content.from,
                        content.message_id,
                        content.forward_from,
                        content.audio
                    );
                } catch (onForwardAudioError) {
                    self.onError("onForwardAudio", onForwardAudioError);
                }
            }

            // onForwardContact
            if (content.hasOwnProperty("contact")) {
                try {
                    self.onForwardContact(
                        content.chat,
                        content.from,
                        content.message_id,
                        content.forward_from,
                        content.contact
                    );
                } catch (onForwardContactError) {
                    self.onError("onForwardContact", onForwardContactError);
                }
            }

            // onForwardFile
            if (content.hasOwnProperty("document")) {
                try {
                    self.onForwardVideo(
                        content.chat,
                        content.from,
                        content.message_id,
                        content.forward_from,
                        content.document
                    );
                } catch (onForwardFileError) {
                    self.onError("onForwardFile", onForwardFileError);
                }
            }

            // onForwardPhoto
            if (content.hasOwnProperty("photo")) {
                try {
                    self.onForwardPhoto(
                        content.chat,
                        content.from,
                        content.message_id,
                        content.forward_from,
                        content.photo
                    );
                } catch (onForwardPhotoError) {
                    self.onError("onForwardPhoto", onForwardPhotoError);
                }
            }

            // onForwardSticker
            if (content.hasOwnProperty("sticker")) {
                try {
                    self.onForwardSticker(
                        content.chat,
                        content.from,
                        content.message_id,
                        content.forward_from,
                        content.sticker
                    );
                } catch (onForwardStickerError) {
                    self.onError("onForwardSticker", onForwardStickerError);
                }
            }

            // onForwardText
            if (content.hasOwnProperty("forward_from") && content.hasOwnProperty("text")) {
                try {
                    self.onForwardText(
                        content.chat,
                        content.from,
                        content.message_id,
                        content.forward_from,
                        content.text
                    );
                } catch (onForwardTextError) {
                    self.onError("onForwardText", onForwardTextError);
                }
            }

            // onForwardVenue
            if (content.hasOwnProperty("venue")) {
                try {
                    self.onForwardVenue(
                        content.chat,
                        content.from,
                        content.message_id,
                        content.forward_from,
                        content.venue
                    );
                } catch (onForwardVenueError) {
                    self.onError("onForwardVenue", onForwardVenueError);
                }
            }

            // onForwardVideo
            if (content.hasOwnProperty("video")) {
                try {
                    self.onForwardVideo(
                        content.chat,
                        content.from,
                        content.message_id,
                        content.forward_from,
                        content.video
                    );
                } catch (onForwardVideoError) {
                    self.onError("onForwardVideo", onForwardVideoError);
                }
            }

            // onForwardVoice
            if (content.hasOwnProperty("voice")) {
                try {
                    self.onForwardVoice(
                        content.chat,
                        content.from,
                        content.message_id,
                        content.forward_from,
                        content.voice
                    );
                } catch (onForwardVoiceError) {
                    self.onError("onForwardVoice", onForwardVoiceError);
                }
            }
            // End of onForward content.
            return;
        }

        // onPinned content.
        if (content.hasOwnProperty("pinned_message")) {
            // onPinnedAny
            try {
                self.onPinnedAny(
                    content.chat,
                    content.message_id,
                    content.pinned_message.from,
                    content.from
                );
            } catch (onPinnedAnyError) {
                self.onError("onPinnedAny", onPinnedAnyError);
            }

            // onPinnedAudio
            if (content.pinned_message.hasOwnProperty("audio")) {
                try {
                    self.onPinnedAudio(
                        content.chat,
                        content.message_id,
                        content.pinned_message.from,
                        content.from,
                        content.pinned_message.audio
                    );
                } catch (onPinnedAudioError) {
                    self.onError("onPinnedAudio", onPinnedAudioError);
                }
            }

            // onPinnedContact
            if (content.pinned_message.hasOwnProperty("contact")) {
                try {
                    self.onPinnedContact(
                        content.chat,
                        content.message_id,
                        content.pinned_message.from,
                        content.from,
                        content.pinned_message.contact
                    );
                } catch (onPinnedContactError) {
                    self.onError("onPinnedContact", onPinnedContactError);
                }
            }

            // onPinnedFile
            if (content.pinned_message.hasOwnProperty("document")) {
                try {
                    self.onPinnedFile(
                        content.chat,
                        content.message_id,
                        content.pinned_message.from,
                        content.from,
                        content.pinned_message.document
                    );
                } catch (onPinnedFileError) {
                    self.onError("onPinnedFile", onPinnedFileError);
                }
            }

            // onPinnedPhoto
            if (content.pinned_message.hasOwnProperty("photo")) {
                try {
                    self.onPinnedPhoto(
                        content.chat,
                        content.message_id,
                        content.pinned_message.from,
                        content.from,
                        content.pinned_message.photo
                    );
                } catch (onPinnedPhotoError) {
                    self.onError("onPinnedPhoto", onPinnedPhotoError);
                }
            }

            // onPinnedSticker
            if (content.pinned_message.hasOwnProperty("sticker")) {
                try {
                    self.onPinnedSticker(
                        content.chat,
                        content.message_id,
                        content.pinned_message.from,
                        content.from,
                        content.pinned_message.sticker
                    );
                } catch (onPinnedStickerError) {
                    self.onError("onPinnedSticker", onPinnedStickerError);
                }
            }

            // onPinnedText
            if (content.pinned_message.hasOwnProperty("text")) {
                try {
                    self.onPinnedText(
                        content.chat,
                        content.message_id,
                        content.pinned_message.from,
                        content.from,
                        content.pinned_message.text
                    );
                } catch (onPinnedTextError) {
                    self.onError("onPinnedText", onPinnedTextError);
                }
            }

            // onPinnedVenue
            if (content.pinned_message.hasOwnProperty("venue")) {
                try {
                    self.onPinnedVenue(
                        content.chat,
                        content.message_id,
                        content.pinned_message.from,
                        content.from,
                        content.pinned_message.venue
                    );
                } catch (onPinnedVenueError) {
                    self.onError("onPinnedVenue", onPinnedVenueError);
                }
            }

            // onPinnedVideo
            if (content.pinned_message.hasOwnProperty("video")) {
                try {
                    self.onPinnedVideo(
                        content.chat,
                        content.message_id,
                        content.pinned_message.from,
                        content.from,
                        content.pinned_message.video
                    );
                } catch (onPinnedVideoError) {
                    self.onError("onPinnedVideo", onPinnedVideoError);
                }
            }

            // onPinnedVoice
            if (content.pinned_message.hasOwnProperty("voice")) {
                try {
                    self.onPinnedVoice(
                        content.chat,
                        content.message_id,
                        content.pinned_message.from,
                        content.from,
                        content.pinned_message.voice
                    );
                } catch (onPinnedVoiceError) {
                    self.onError("onPinnedVoice", onPinnedVoiceError);
                }
            }
            // End of pinned content.
            return;
        }

        // onAudio
        if (content.hasOwnProperty("audio")) {
            try {
                self.onAudio(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.caption,
                    content.audio
                );
            } catch (onAudioError) {
                self.onError("onAudio", onAudioError);
            }
        }

        // onCommand
        if (hasDeepProperty(content, "entities.0.type") && content.entities[0].type === "bot_command") {
            if (content.text.charAt(0) !== "/") {
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
                self.onCommand(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.text,
                    command,
                    commandData
                );
            } catch (onCommandError) {
                self.onError("onCommand", onCommandError);
            }
        }

        // onContact
        if (content.hasOwnProperty("contact")) {
            try {
                self.onContact(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.contact
                );
            } catch (onContactError) {
                self.onError("onContact", onContactError);
            }
        }

        // onFile
        if (content.hasOwnProperty("document")) {
            try {
                self.onFile(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.caption,
                    content.document
                );
            } catch (onFileError) {
                self.onError("onFile", onFileError);
            }
        }

        // onGroupJoin
        if (content.hasOwnProperty("new_chat_members")) {
            try {
                content.new_chat_members.forEach(function (user) {
                    self.onGroupJoin(
                        content.chat,
                        user,
                        content.message_id,
                        content.from
                    );
                });
            } catch (onGroupJoinError) {
                self.onError("onJoinGroup", onGroupJoinError);
            }
        }

        // onGroupLeft
        if (content.hasOwnProperty("left_chat_member")) {
            try {
                self.onGroupLeft(
                    content.chat,
                    content.left_chat_member,
                    content.message_id,
                    content.from
                );
            } catch (onGroupLeftError) {
                self.onError("onGroupLeft", onGroupLeftError);
            }
        }

        // onPhoto
        if (content.hasOwnProperty("photo")) {
            try {
                self.onPhoto(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.caption,
                    content.photo
                );
            } catch (onPhotoError) {
                self.onError("onPhoto", onPhotoError);
            }
        }

        // onSticker
        if (content.hasOwnProperty("sticker")) {
            try {
                self.onSticker(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.sticker
                );
            } catch (onStickerError) {
                self.onError("onSticker", onStickerError);
            }
        }

        // onText
        if (content.hasOwnProperty("text")) {
            try {
                self.onText(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.text
                );
            } catch (onTextError) {
                self.onError("onText", onTextError);
            }
        }

        // onVenue
        if (content.hasOwnProperty("venue")) {
            try {
                self.onVenue(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.venue
                );
            } catch (onVenueError) {
                self.onError("onVenue", onVenueError);
            }
        }

        // onVideo
        if (content.hasOwnProperty("video")) {
            try {
                self.onVideo(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.caption,
                    content.video
                );
            } catch (onVideoError) {
                self.onError("onVideo", onVideoError);
            }
        }

        // onVoice
        if (content.hasOwnProperty("voice")) {
            try {
                self.onVoice(
                    content.chat,
                    content.from,
                    content.message_id,
                    content.caption,
                    content.voice
                );
            } catch (onVoiceError) {
                self.onError("onAudio", onVoiceError);
            }
        }
    };

    web = function (command, urlData, callback) {
        var postData = querystring.stringify(urlData);
        var options = {
            "hostname": "api.telegram.org",
            "port": botSettings.port,
            "path": "/bot" + TOKEN + "/" + command,
            "method": botSettings.method,
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": postData.length
            }
        };
        var request = https.request(options, function (result) {
            // console.log("statusCode:", result.statusCode);
            // console.log('headers:', result.headers);
            var data = "";
            result.on("data", function (buffer) {
                data += buffer;
            });
            result.on("end", function () {
                if (typeof callback === "function") {
                    try {
                        callback(JSON.parse(data));
                    } catch (error) {
                        loop();
                    }
                }
            });
        });
        request.on("error", function () {
            loop();
        });
        request.write(postData);
        request.end();
    };

    this.deleteMessage = function (chat_id_or_chat_username, message_id, callback) {
        var urlQuery = {
            "chat_id": chat_id_or_chat_username,
            "message_id": message_id
        };
        web("deleteMessage", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.editHtml = function (chatIdOrUsername, messageId, html, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "message_id": messageId,
            "text": html,
            "parse_mode": "HTML"
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("editMessageText", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.editMarkdown = function (chatIdOrUsername, messageId, md, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "message_id": messageId,
            "text": md,
            "parse_mode": "Markdown"
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("editMessageText", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.editText = function (chatIdOrUsername, messageId, text, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "message_id": messageId,
            "text": text
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("editMessageText", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.forwardMessage = function (chatIdOrUsername, source_chat, message_id, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "from_chat_id": source_chat,
            "message_id": message_id
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("forwardMessage", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.getBotUsername = function () {
        return username;
    };

    this.getChat = function (chatIdOrUsername, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername
        };
        web("getChat", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok, data.result);
            }
        });
    };

    this.getChatAdministrators = function (chatIdOrUsername, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername
        };
        web("getChatAdministrators", urlQuery, function (data) {
            var admins = [], creator = [], ids;
            if (data.ok) {
                data.result.forEach(function (value) {
                    if (value.status === "creator") {
                        creator.push(value.user);
                    } else {
                        admins.push(value.user);
                    }
                });
                ids = creator.concat(admins).map(function (user) {
                    return user.id;
                });
            }
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, creator.concat(admins), ids);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.getChatMember = function (chatIdOrUsername, userId, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "user_id": userId
        };
        web("getChatMember", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.user, data.result.status);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.getChatMembersCount = function (chatIdOrUsername, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername
        };
        web("getChatMembersCount", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok, data.result);
            }
        });
    };

    this.getFile = function (telegramFileUrl, callback) {
        var urlQuery = {
            "file_id": telegramFileUrl
        };
        web("getFile", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok, data.result);
            }
        });
    };

    this.getIsDebug = function () {
        return botSettings.isDebug;
    };

    this.getLoopDelay = function () {
        return botSettings.loopDelay;
    };

    this.getMe = function (callback) {
        var urlQuery = {};
        web("getMe", urlQuery, function (data) {
            callback(data.ok, data.result);
        });
    };

    this.getPort = function () {
        return botSettings.port;
    };

    this.getStartupTime = function () {
        return startupTime;
    };

    this.getUserProfilePhotos = function (userId, offset, limit, callback) {
        var urlQuery = {
            "user_id": userId,
            "offset": offset,
            "limit": limit
        };
        web("getUserProfilePhotos", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.kickChatMember = function (chatIdOrUsername, userId, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "user_id": userId
        };
        web("kickChatMember", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.leaveChat = function (chatIdOrUsername, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername
        };
        web("leaveChat", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.onAudio = function () {
        return;
    };

    this.onCommand = function () {
        return;
    };

    this.onContact = function () {
        return;
    };

    this.onEditText = function () {
        return;
    };

    this.onError = function () {
        return;
    };

    this.onFile = function () {
        return;
    };

    this.onForwardAny = function () {
        return;
    };

    this.onForwardAudio = function () {
        return;
    };

    this.onForwardContact = function () {
        return;
    };

    this.onForwardFile = function () {
        return;
    };

    this.onForwardPhoto = function () {
        return;
    };

    this.onForwardSticker = function () {
        return;
    };

    this.onForwardText = function () {
        return;
    };

    this.onForwardVenue = function () {
        return;
    };

    this.onForwardVideo = function () {
        return;
    };

    this.onForwardVoice = function () {
        return;
    };

    this.onGroupJoin = function () {
        return;
    };

    this.onGroupLeft = function () {
        return;
    };

    this.onKeyboardCallbackData = function () {
        return;
    };

    this.onPhoto = function () {
        return;
    };

    this.onPinnedAny = function () {
        return;
    };

    this.onPinnedAudio = function () {
        return;
    };

    this.onPinnedContact = function () {
        return;
    };

    this.onPinnedFile = function () {
        return;
    };

    this.onPinnedPhoto = function () {
        return;
    };

    this.onPinnedSticker = function () {
        return;
    };

    this.onPinnedText = function () {
        return;
    };

    this.onPinnedVenue = function () {
        return;
    };

    this.onPinnedVideo = function () {
        return;
    };

    this.onPinnedVoice = function () {
        return;
    };

    this.onText = function () {
        return;
    };

    this.onStartup = function () {
        return;
    };

    this.onSticker = function () {
        return;
    };

    this.onVideo = function () {
        return;
    };

    this.onVoice = function () {
        return;
    };

    this.sendAudio = function (chatIdOrUsername, fileIdOrLink, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "audio": fileIdOrLink
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("sendAudio", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.sendChatAction = function (chatIdOrUsername, action, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "action": action
        };
        web("sendChatAction", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    this.sendContact = function (chatIdOrUsername, phoneNumber, firstName, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "phone_number": phoneNumber,
            "first_name": firstName
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("sendContact", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.sendDocument = function (chatIdOrUsername, fileIdOrLink, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "document": fileIdOrLink
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("sendDocument", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.sendPhoto = function (chatIdOrUsername, fileIdOrLink, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "photo": fileIdOrLink
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("sendPhoto", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.sendHtml = function (chatIdOrUsername, html, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "text": html,
            "parse_mode": "HTML"
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("sendMessage", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.sendMarkdown = function (chatIdOrUsername, md, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "text": md,
            "parse_mode": "Markdown"
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("sendMessage", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.sendText = function (chatIdOrUsername, text, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "text": text
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("sendMessage", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.sendVenue = function (chatIdOrUsername, latitude, longitude, title, address, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "latitude": latitude,
            "longitude": longitude,
            "title": title,
            "address": address
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("sendVenue", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.sendVideo = function (chatIdOrUsername, fileIdOrLink, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "video": fileIdOrLink
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("sendVideo", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.sendVoice = function (chatIdOrUsername, fileIdOrLink, settings, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "voice": fileIdOrLink
        };
        if (typeof settings === "object") {
            Object.assign(urlQuery, settings);
        }
        web("sendVoice", urlQuery, function (data) {
            if (typeof callback === "function") {
                if (data.ok) {
                    callback(data.ok, data.result.message_id);
                } else {
                    callback(data.ok);
                }
            }
        });
    };

    this.setIsDebug = function (isDebug) {
        botSettings.isDebug = isDebug;
    };

    this.setLoopDelay = function (milliseconds) {
        botSettings.loopDelay = milliseconds;
    };

    this.setPort = function (port) {
        botSettings.port = port;
    };

    this.toString = function () {
        return "[object TelegramBot]";
    };

    this.unbanChatMember = function (chatIdOrUsername, userId, callback) {
        var urlQuery = {
            "chat_id": chatIdOrUsername,
            "user_id": userId
        };
        web("unbanChatMember", urlQuery, function (data) {
            if (typeof callback === "function") {
                callback(data.ok);
            }
        });
    };

    // Initialize the bot.
    self.getMe(function (isSuccess, bot) {
        if (isSuccess) {
            username = bot.username;
            self.onStartup(true);
            loop();
        } else {
            self.onStartup(false);
        }
    });

};

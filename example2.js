// Require the TelegramBot class.
const TelegramBot = require("./TelegramBot");

// Declare a new instance and connect by your bot token.
var bot = new TelegramBot("YOUR_BOT_TOKEN");

var bool = true;

// Setup catched events to make your bot responsive.
bot.onCommand = function (chat, from, message_id, text, command, commandData) {
    "use strict";

    if (command === "start") {
        var lines = [
            "/example1 Inline Keyboard",
            "",
            "/example2 Reply Keyboard"
        ];
        bot.sendText(chat.id, lines.join("\n"));
    }

    if (command === "example1") {
        var keyboard = {
            "inline_keyboard": [
                [
                    {"text": "Google Link", "url": "http://www.google.com/"},
                    {"text": "Toggle " + (bool ? "Off" : "On"), "callback_data": "run_example1"}
                ]
            ]
        };

        var data = {
            "reply_markup": JSON.stringify(keyboard)
        };

        bot.sendText(chat.id, "Inline Keyboard\nSetting: " + (bool ? "On" : "Off"), data);
        return;
    }

    if (command === "example2") {
        var keyboard = {
            "keyboard": [
                [
                    {"text": "1"},
                    {"text": "2"},
                    {"text": "3"}
                ],
                [
                    {"text": "/close", }
                ]
            ]
        };

        var data = {
            "reply_markup": JSON.stringify(keyboard)
        };

        bot.sendText(chat.id, "" + bool, data);
        return;
    }

    if (command === "close") {
        var keyboard = {
            "remove_keyboard": true
        };
        
        var data = {
            "reply_markup": JSON.stringify(keyboard)
        };

        bot.sendText(chat.id, "Keyboard Closed", data);
        return;
    }

};

bot.onKeyboardCallbackData = function (chat, from, message_id, data) {
    "use-strict";

    if (data === "run_example1") {
        if (bool === true) {
            bool = false;
        } else {
            bool = true;
        }

        var keyboard = {
            "inline_keyboard": [
                [
                    {"text": "Google Link", "url": "http://www.google.com/"},
                    {"text": "Toggle " + (bool ? "Off" : "On"), "callback_data": "run_example1"}
                ]
            ]
        };

        var data = {
            "reply_markup": JSON.stringify(keyboard)
        };

        bot.editText(chat.id, message_id, "Inline Keyboard\nSetting: " + (bool ? "On" : "Off"), data);
    }

};

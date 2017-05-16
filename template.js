/* eslint no-unused-vars: off */

// Require the TelegramBot class.
const TelegramBot = require("./TelegramBot");

// Declare a new instance and connect by your bot token.
var bot = new TelegramBot("YOUR_BOT_TOKEN");

// Setup catched events to make your bot responsive.
bot.onAudio = function (chat, from, message_id, caption, audio) {};
bot.onCommand = function (chat, from, message_id, text, command, commandData) {};
bot.onContact = function (chat, from, contact, message_id) {};
bot.onEditText = function (chat, from, message_id, new_text) {};
bot.onError = function (event, error) {};
bot.onFile = function (chat, from, message_id, caption, file) {};
bot.onForwardAny = function (chat, from, message_id, user) {};
bot.onForwardAudio = function (chat, from, message_id, user, audio) {};
bot.onForwardContact = function (chat, from, message_id, user, contact) {};
bot.onForwardFile = function (chat, from, message_id, user, file) {};
bot.onForwardPhoto = function (chat, from, message_id, user, photo) {};
bot.onForwardSticker = function (chat, from, message_id, user, sticker) {};
bot.onForwardText = function (chat, from, message_id, user, text) {};
bot.onForwardVenue = function (chat, from, message_id, user, venue) {};
bot.onForwardVideo = function (chat, from, message_id, user, video) {};
bot.onForwardVoice = function (chat, from, message_id, user, voice) {};
bot.onGroupJoin = function (chat, joining_user, message_id, triggering_user) {};
bot.onGroupLeft = function (chat, leaving_user, message_id, triggering_user) {};
bot.onKeyboardCallbackData = function (chat, from, message_id, callback_data) {};
bot.onPhoto = function (chat, from, message_id, caption, photo) {};
bot.onPinnedAny = function (chat, message_id, message_user, pinned_user) {};
bot.onPinnedAudio = function (chat, message_id, message_user, pinned_user, audio) {};
bot.onPinnedContact = function (chat, message_id, message_user, pinned_user, contact) {};
bot.onPinnedFile = function (chat, message_id, message_user, pinned_user, file) {};
bot.onPinnedPhoto = function (chat, message_id, message_user, pinned_user, text) {};
bot.onPinnedSticker = function (chat, message_id, message_user, pinned_user, sticker) {};
bot.onPinnedText = function (chat, message_user, message_id, pinned_user, text) {};
bot.onPinnedVenue = function (chat, message_user, message_id, pinned_user, venue) {};
bot.onPinnedVideo = function (chat, message_user, message_id, pinned_user, video) {};
bot.onPinnedVoice = function (chat, message_user, message_id, pinned_user, voice) {};
bot.onStartup = function (isSuccess) {};
bot.onSticker = function (chat, from, message_id, sticker) {};
bot.onText = function (chat, from, message_id, text) {};
bot.onVenue = function (chat, from, message_id, venue) {};
bot.onVideo = function (chat, from, message_id, caption, video) {};
bot.onVoice = function (chat, from, message_id, caption, voice) {};

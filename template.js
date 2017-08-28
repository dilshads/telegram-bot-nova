/* eslint no-unused-vars: off */

// Require the TelegramBot class.
const TelegramBot = require('./telegrambot-getupdates')

// Declare a new instance and connect by your bot token.
var bot = new TelegramBot('YOUR_BOT_TOKEN')

// Setup catched events to make your bot responsive.
bot.onAny = function (chat, from, messageId) {}
bot.onAudio = function (chat, from, messageId, caption, audio) {}
bot.onCommand = function (chat, from, messageId, text, command, commandData) {}
bot.onContact = function (chat, from, contact, messageId) {}
bot.onEditText = function (chat, from, messageId, newText) {}
bot.onError = function (event, error) {}
bot.onFile = function (chat, from, messageId, caption, file) {}
bot.onForwardAny = function (chat, from, messageId, user) {}
bot.onForwardAudio = function (chat, from, messageId, user, audio) {}
bot.onForwardContact = function (chat, from, messageId, user, contact) {}
bot.onForwardFile = function (chat, from, messageId, user, file) {}
bot.onForwardPhoto = function (chat, from, messageId, user, photo) {}
bot.onForwardSticker = function (chat, from, messageId, user, sticker) {}
bot.onForwardText = function (chat, from, messageId, user, text) {}
bot.onForwardVenue = function (chat, from, messageId, user, venue) {}
bot.onForwardVideo = function (chat, from, messageId, user, video) {}
bot.onForwardVoice = function (chat, from, messageId, user, voice) {}
bot.onGroupJoin = function (chat, joiningUser, messageId, triggeringUser) {}
bot.onGroupLeft = function (chat, leavingUser, messageId, triggeringUser) {}
bot.onInlineQuery = function (from, queryId, text) {}
bot.onKeyboardCallbackData = function (chat, from, messageId, callbackData) {}
bot.onPhoto = function (chat, from, messageId, caption, photo) {}
bot.onPinnedAny = function (chat, messageId, messageUser, pinnedUser) {}
bot.onPinnedAudio = function (chat, messageId, messageUser, pinnedUser, audio) {}
bot.onPinnedContact = function (chat, messageId, messageUser, pinnedUser, contact) {}
bot.onPinnedFile = function (chat, messageId, messageUser, pinnedUser, file) {}
bot.onPinnedPhoto = function (chat, messageId, messageUser, pinnedUser, text) {}
bot.onPinnedSticker = function (chat, messageId, messageUser, pinnedUser, sticker) {}
bot.onPinnedText = function (chat, messageUser, messageId, pinnedUser, text) {}
bot.onPinnedVenue = function (chat, messageUser, messageId, pinnedUser, venue) {}
bot.onPinnedVideo = function (chat, messageUser, messageId, pinnedUser, video) {}
bot.onPinnedVoice = function (chat, messageUser, messageId, pinnedUser, voice) {}
bot.onStartup = function (isSuccess) {}
bot.onSticker = function (chat, from, messageId, sticker) {}
bot.onText = function (chat, from, messageId, text) {}
bot.onVenue = function (chat, from, messageId, venue) {}
bot.onVideo = function (chat, from, messageId, caption, video) {}
bot.onVoice = function (chat, from, messageId, caption, voice) {}

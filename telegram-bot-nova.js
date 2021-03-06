'use strict'

const { EventEmitter } = require('events')
const https = require('https')
const querystring = require('querystring')

/**
 * The TelegramBot event handler.
 * @param {object} context The 'this' context of the bot instance calling this method.
 * @param {object} result A returned object result for processing.
 * @private TelegramBot internal handler.
 * @protected Modifying this will break the class functionality.
 */
const botEvent = function botEvent (context, result) {
  context._process.updateId = result.update_id + 1

  // editText
  if (result.edited_channel_post || result.edited_message) {
    let {
      chat,
      date,
      date_edit,
      from,
      message_id,
      text
    } = result.edited_channel_post || result.edited_message
    try {
      context.emit('editText', chat, date, date_edit, from, message_id, text)
    } catch (error) {
      context.emit('error', error)
    }
    return
  }

  // inlineQuery
  if (result.inline_query) {
    let {
      from,
      id,
      query
    } = result.inline_query
    try {
      context.emit('inlineQuery', from, id, query)
    } catch (error) {
      context.emit('error', error)
    }
    return
  }

  // keyboardCallbackData
  if (result.callback_query) {
    let {
      // chat_instance, // Not really needed.
      data,
      from,
      message
    } = result.callback_query
    try {
      context.emit('keyboardCallbackData', message.chat, message.date, from, message.message_id, data)
    } catch (error) {
      context.emit('error', error)
    }
    return
  }

  let {
    audio,
    caption,
    chat,
    contact,
    date,
    document,
    forward_from,
    from,
    left_chat_member,
    location,
    message_id,
    new_chat_members,
    photo,
    pinned_message,
    reply_to_message,
    sticker,
    text,
    venue,
    video,
    video_note,
    voice
  } = result.channel_post || result.message

  if (forward_from) { // eslint-disable-line camelcase
    // forwardAny
    try {
      context.emit('forwardAny', chat, date, from, message_id, forward_from)
    } catch (error) {
      context.emit('error', error)
    }

    // forwardAudio
    if (audio) {
      try {
        context.emit('forwardContact', chat, date, from, message_id, forward_from, audio)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // forwardContact
    if (contact) {
      try {
        context.emit('forwardContact', chat, date, from, message_id, forward_from, contact)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // forwardFile
    if (document) {
      try {
        context.emit('forwardFile', chat, date, from, message_id, forward_from, document)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // forwardPhoto
    if (photo) {
      try {
        context.emit('forwardPhoto', chat, date, from, message_id, forward_from, photo)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // forwardSticker
    if (sticker) {
      try {
        context.emit('forwardSticker', chat, date, from, message_id, forward_from, sticker)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // forwardText
    if (text) {
      try {
        context.emit('forwardText', chat, date, from, message_id, forward_from, text)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // forwardVenue
    if (venue) {
      try {
        context.emit('forwardVenue', chat, date, from, message_id, forward_from, venue)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // forwardVideo
    if (video) {
      try {
        context.emit('forwardVideo', chat, date, from, message_id, forward_from, video)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // videoNote
    if (video_note) { // eslint-disable-line camelcase
      try {
        context.emit('forwardVideoNote', chat, date, from, message_id, forward_from, video_note)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // forwardVoice
    if (voice) {
      try {
        context.emit('forwardVoice', chat, date, from, message_id, forward_from, voice)
      } catch (error) {
        context.emit('error', error)
      }
    }
    return
  }

  if (pinned_message) { // eslint-disable-line camelcase
    // pinnedAny
    try {
      context.emit('pinnedAny', chat, message_id, pinned_message.from, from)
    } catch (error) {
      context.emit('error', error)
    }

    // pinnedAudio
    if (pinned_message.audio) {
      try {
        context.emit('pinnedAudio', chat, message_id, pinned_message.from, from, pinned_message.audio)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // pinnedContact
    if (pinned_message.contact) {
      try {
        context.emit('pinnedContact', chat, message_id, pinned_message.from, from, pinned_message.contact)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // pinnedFile
    if (pinned_message.document) {
      try {
        context.emit('pinnedFile', chat, message_id, pinned_message.from, from, pinned_message.document)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // pinnedLocation
    if (pinned_message.location && !pinned_message.venue) {
      try {
        context.emit('location', chat, message_id, pinned_message.from, from, pinned_message.location)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // pinnedPhoto
    if (pinned_message.photo) {
      try {
        context.emit('pinnedPhoto', chat, message_id, pinned_message.from, from, pinned_message.photo)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // pinnedSticker
    if (pinned_message.sticker) {
      try {
        context.emit('pinnedSticker', chat, message_id, pinned_message.from, from, pinned_message.sticker)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // pinnedText
    if (pinned_message.text) {
      try {
        context.emit('pinnedText', chat, message_id, pinned_message.from, from, pinned_message.text)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // pinnedVenue
    if (pinned_message.venue) {
      try {
        context.emit('pinnedVenue', chat, message_id, pinned_message.from, from, pinned_message.venue)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // pinnedVideo
    if (pinned_message.video) {
      try {
        context.emit('pinnedVideo', chat, message_id, pinned_message.from, from, pinned_message.video)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // pinnedVideoNote
    if (pinned_message.video_note) {
      try {
        context.emit('pinnedVideoNote', chat, message_id, pinned_message.from, from, pinned_message.video_note)
      } catch (error) {
        context.emit('error', error)
      }
    }

    // pinnedVoice
    if (pinned_message.voice) {
      try {
        context.emit('pinnedVoice', chat, message_id, pinned_message.from, from, pinned_message.voice)
      } catch (error) {
        context.emit('error', error)
      }
    }
    return
  }

  // any
  try {
    context.emit('any', chat, date, from, message_id)
  } catch (error) {
    context.emit('error', error)
  }

  // audio
  if (audio) {
    try {
      context.emit('audio', chat, date, from, message_id, caption, audio)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // command & replyCommand
  if (text && text.charAt(0) === '/') {
    let command = ''
    let commandData = ''
    let split = text.indexOf(' ')
    if (split > -1) {
      command = text.substring(1, split).toLowerCase()
      commandData = text.substr(split + 1).trim()
    } else {
      command = text.substr(1).toLowerCase()
      // Removes the @NameOfBot at the end of the command so it con be processed correctly.
      if (command.endsWith('@' + context._process.username.toLowerCase())) {
        command = command.substring(0, command.length - (context._process.username.length + 1))
      }
    }
    if (reply_to_message) { // eslint-disable-line camelcase
      try {
        context.emit('replyCommand', chat, date, from, message_id, text, command, commandData, reply_to_message.from)
      } catch (error) {
        context.emit('error', error)
      }
    } else {
      try {
        context.emit('command', chat, date, from, message_id, text, command, commandData)
      } catch (error) {
        context.emit('error', error)
      }
    }
  }

  // contact
  if (contact) {
    try {
      context.emit('contact', chat, date, from, message_id, contact)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // file
  if (document) {
    try {
      context.emit('file', chat, date, from, message_id, caption, document)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // groupJoin
  if (new_chat_members) { // eslint-disable-line camelcase
    try {
      new_chat_members.forEach((user) => {
        context.emit('groupJoin', chat, date, user, message_id, from)
      })
    } catch (error) {
      context.emit('error', error)
    }
  }

  // groupLeft
  if (left_chat_member) { // eslint-disable-line camelcase
    try {
      context.emit('groupLeft', chat, date, left_chat_member, message_id, from)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // location
  if (location && !venue) {
    try {
      context.emit('location', chat, date, from, message_id, location)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // photo
  if (photo) {
    try {
      context.emit('photo', chat, date, from, message_id, caption, photo)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // sticker
  if (sticker) {
    try {
      context.emit(chat, date, from, message_id, sticker)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // text
  if (text) {
    try {
      context.emit('text', chat, date, from, message_id, text)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // venue
  if (venue) {
    try {
      context.emit('venue', chat, date, from, message_id, venue)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // video
  if (video) {
    try {
      context.emit('video', chat, date, from, message_id, caption, video)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // videoNote
  if (video_note) { // eslint-disable-line camelcase
    try {
      context.emit('videoNote', chat, date, from, message_id, video_note)
    } catch (error) {
      context.emit('error', error)
    }
  }

  // voice
  if (voice) {
    try {
      context.emit('voice', chat, date, from, message_id, caption, voice)
    } catch (error) {
      context.emit('error', error)
    }
  }
}

/**
 * Telegram debugging handler for developers.
 * @param {Object} data JSON parsed object of the result data.
 * @param {string} urlMethod The method that was requested to the web handler.
 * @private TelegramBot internal handler.
 * @protected Modifying this will break the class functionality.
 */
const devLog = function debugHandler (data, urlMethod) {
  if (urlMethod === 'getUpdates') {
    if (data.ok && data.result.length) {
      data.result.forEach((result) => {
        console.log('getUpdates#' + result.update_id)
        console.log(JSON.stringify(result))
      })
    }
  } else {
    console.log(urlMethod)
    console.log(JSON.stringify(data))
  }
}

/**
 * Method that collects the unprocessed updates and sends them to the event handler.
 * @param {object} context The 'this' context of the bot instance calling this method.
 * @private TelegramBot internal handler.
 * @protected Modifying this will break the class functionality.
 */
const getUpdates = function getUpdates (context) {
  var urlQuery = { 'offset': context._process.updateId }

  web(context, 'getUpdates', urlQuery, (data) => {
    if (data.ok) {
      data.result.forEach((result) => {
        botEvent(context, result)
      })
    } else {
      context.emit('error', new Error('TelegramBot: Warning. Telegram server returned data.ok = false.'))
    }
    loop(context)
  })
}

/**
 * Custom loop timer that prevents getUpdates method from overflowing with calls.
 * @param {object} context The 'this' context of the bot instance calling this method.
 * @private TelegramBot internal handler.
 * @protected Modifying this will break the class functionality.
 */
const loop = function loop (context) {
  context._process.timer = setTimeout(() => {
    getUpdates(context)
  }, context._botSettings.interval)
}

/**
 * The TelegramBot web call handler for sending and receiving data.
 * @param {Object} context The 'this' context of the bot instance calling this method.
 * @param {string} urlMethod The URL method to call.
 * @param {Object} urlData An object containing the query data to send.
 * @param {function(object):void} callback arg0: object
 * @private TelegramBot internal handler.
 * @protected Modifying this will break the class functionality.
 */
const web = function web (context, urlMethod, urlData, callback) {
  var postData = querystring.stringify(urlData)
  var options = {
    'hostname': 'api.telegram.org',
    'port': context._botSettings.port,
    'path': '/bot' + context._process.token + '/' + urlMethod,
    'method': context._botSettings.method,
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  }

  var request = https.request(options, (result) => {
    var rawData = ''
    result.on('data', (buffer) => {
      rawData += buffer
    })
    result.on('end', () => {
      if (typeof callback === 'function') {
        let data
        try {
          data = JSON.parse(rawData)

          if (context._botSettings.devMode) {
            devLog(data, urlMethod)
          }

          callback(data)
        } catch (error) {
          // Catches class problems.
          // This is coded to avoid having to pass an unnecessary extra
          // error object when one is already provided.
          data = { ok: false, 'description': 'TelegramBot: Error pausing JSON in web end.' }
          callback(data)
        }
      }
    })
  })
  request.on('error', () => {
    // Catches connection problems.
    if (urlMethod === 'getUpdates') {
      // Makes sure only getUpdates stays looping without it overflowing.
      loop(context)
    }
  })
  request.write(postData)
  request.end()
}

// The use of util.inherit is discouraged. So ES6 class is used instead.
// https://nodejs.org/docs/latest/api/util.html#util_util_inherits_constructor_superconstructor
module.exports = class TelegramBot extends EventEmitter {
  /**
   * Create a Telegram bot.
   * @param {string} token Bot token provided by BotFather for the bot to communicate with.
   * @param {object} settings
   * @param {boolean} settings.devMode
   * @param {number} settings.interval
   * @param {string} settings.method
   * @param {number} settings.port
   */
  constructor (token, settings) {
    super()

    if (typeof token !== 'string') {
      throw new Error('token is not a string.')
    }

    // Example warning in case the user forgets.
    if (token === 'YOUR_BOT_TOKEN') {
      throw new Error(`token is currently set as default 'YOUR_BOT_TOKEN_HERE'.`)
    }

    // EventEmitter public methods.
    //   addListener
    //   emit
    //   eventNames
    //   getMaxListeners
    //   init
    //   listenerCount
    //   listeners
    //   listenerCount
    //   on
    //   once
    //   prependListener
    //   prependOnceListener
    //   removeAllListeners
    //   removeListener
    //   setMaxListeners

    // EventEmitter public properties.
    //   _events
    //   _eventsCount
    //   _maxListeners
    //   domain

    this._botSettings = {
      'devMode': false,
      'interval': 1000,
      'method': 'POST',
      'port': 443
    }

    this._process = {
      'startupTime': Date.now(),
      'timer': null,
      'token': token,
      'updateId': 0,
      'username': ''
    }

    if (typeof settings === 'object') {
      Object.assign(this._botSettings, settings)
    }

    this.getMe((error, bot) => {
      if (error) {
        this.emit('error', error)
        this.emit('startup', false)
        return
      }
      this._process.username = bot.username
      this.emit('startup', true)
      loop(this)
    })
  }

  /**
   * Send a response to the inlineQuery event.
   * @param {string} inlineQueryId The query id to respond to.
   * @param {array} resultsJSON An array of InlineQueryResult objects.
   * @param {object} settings
   * @param {number} settings.cache_time
   * @param {boolean} settings.is_personal
   * @param {string} settings.next_offset
   * @param {string} settings.switch_pm_text
   * @param {string} settings.switch_pm_parameter
   * @param {function(Error):void} callback arg0: Error
   */
  answerInlineQuery (inlineQueryId, resultsJSON, settings, callback) {
    var urlQuery = { 'inline_query_id': inlineQueryId, 'results': resultsJSON }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'answerInlineQuery', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Use this to send a custom action for the bot to perform.
   *
   * Only use if the method isn't available yet and if you know what you're doing.
   * @param {string} method The custom method to perform.
   * @param {object} settings
   * @param {function(Error, {}):void} callback arg0: Error, arg1: result
   */
  customAction (method, settings, callback) {
    web(this, method, settings, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Delete the target channel, group or supergroup photo.
   *
   * The bot must be an administrator with appropriate admin rights.
   * @param {number|string} targetChat The target chat id or username.
   * @param {function(Error):void} callback arg0: Error
   */
  deleteChatPhoto (targetChat, callback) {
    var urlQuery = { 'chat_id': targetChat }

    web(this, 'deleteChatPhoto', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Delete a target chat message by id that was sent under 48 hours.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number} messageId The message id.
   * @param {function(Error):void} callback arg0: Error
   */
  deleteMessage (targetChat, messageId, callback) {
    var urlQuery = { 'chat_id': targetChat, 'message_id': messageId }

    web(this, 'deleteMessage', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Edit the text of a target chat message.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number} messageId The message id.
   * @param {string} html The html to replace with.
   * @param {object} settings
   * @param {boolean} settings.disable_web_page_preview
   * @param {string} settings.reply_markup
   * @param {function(Error):void} callback arg0: Error
   */
  editHtml (targetChat, messageId, html, settings, callback) {
    var setSettings = Object.assign((settings || {}), {'parse_mode': 'HTML'})
    this.editMessageText(targetChat, messageId, html, setSettings, callback)
  }

  /**
   * Edit the text of a target chat message.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number} messageId The message id.
   * @param {string} md The markdown to replace with.
   * @param {object} settings
   * @param {boolean} settings.disable_web_page_preview
   * @param {string} settings.reply_markup
   * @param {function(Error):void} callback arg0: Error
   */
  editMarkdown (targetChat, messageId, md, settings, callback) {
    var setSettings = Object.assign((settings || {}), {'parse_mode': 'Markdown'})
    this.editMessageText(targetChat, messageId, md, setSettings, callback)
  }

  /**
   * Edit the text of a target chat message.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number} messageId The message id.
   * @param {string} text The text to replace with.
   * @param {object} settings
   * @param {boolean} settings.disable_web_page_preview
   * @param {string} settings.reply_markup
   * @param {function(Error):void} callback arg0: Error
   */
  editMessageText (targetChat, messageId, text, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'message_id': messageId, 'text': text }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'editMessageText', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Edit the text of a target chat message. Shortened editMessageText method.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number} messageId The message id.
   * @param {string} text The text to replace with.
   * @param {object} settings
   * @param {boolean} settings.disable_web_page_preview
   * @param {string} settings.reply_markup
   * @param {function(Error):void} callback arg0: Error
   */
  editText (targetChat, messageId, text, settings, callback) {
    this.editMessageText(targetChat, messageId, text, settings, callback)
  }

  /**
   * Callback an invite link string of a target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {function(Error, string):void} callback arg0: Error, arg1: link
   */
  exportChatInviteLink (targetChat, callback) {
    var urlQuery = { 'chat_id': targetChat }

    web(this, 'exportChatInviteLink', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Forward a target message to a target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number|string} sourceChat The source chat id or username of the message id.
   * @param {number} messageId The message id.
   * @param {object} settings
   * @param {boolean} settings.disable_notification
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  forwardMessage (targetChat, sourceChat, messageId, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'from_chat_id': sourceChat, 'message_id': messageId }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'forwardMessage', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result.message_id)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Returns the bot username that was obtained on startup.
   */
  getBotUsername () {
    return this._process.username
  }

  /**
   * Callback a Chat object of the target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {function(Error, {}):void} callback arg0: Error, arg1: obtainedChat
   */
  getChat (targetChat, callback) {
    var urlQuery = { 'chat_id': targetChat }

    web(this, 'getChat', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Callback an array of User objects and an array of users' id. The first values is chat the owner.
   * @param {number|string} targetChat The target chat id or username.
   * @param {function(Error, [], []):void} callback arg0: Error, arg1: users, arg2: userIds
   */
  getChatAdministrators (targetChat, callback) {
    var urlQuery = {'chat_id': targetChat}

    web(this, 'getChatAdministrators', urlQuery, (data) => {
      var admins = []
      var creator = []
      var ids
      if (typeof callback === 'function') {
        if (data.ok) {
          data.result.forEach((value) => {
            if (value.status === 'creator') {
              creator.push(value.user)
            } else {
              admins.push(value.user)
            }
          })
          ids = creator.concat(admins).map((user) => {
            return user.id
          })
          callback(null, creator.concat(admins), ids)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Callback a User object of the target user from a target chat.
   * @param {number|string} targetChat The target chat id or username to get the user from.
   * @param {number} userId The target user's id to get the user object of.
   * @param {function(Error, {}, string):void} callback arg0: Error, arg1: user, arg2: status
   */
  getChatMember (targetChat, userId, callback) {
    var urlQuery = { 'chat_id': targetChat, 'user_id': userId }

    web(this, 'getChatMember', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result.user, data.result.status)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Callback a number of the chat count.
   * @param {number|string} targetChat The target chat id or username to get the user from.
   * @param {function(Error, number):void} callback arg0: Error, arg1: count
   */
  getChatMembersCount (targetChat, callback) {
    var urlQuery = { 'chat_id': targetChat }

    web(this, 'getChatMembersCount', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Returns a boolean of bot debug status.
   */
  getDevMode () {
    return this._botSettings.devMode
  }

  /**
   * Callback a File object from the target file id.
   * @param {string} telegramFileURL The target file.
   * @param {function} callback { error: Error | null, file: FileObject}
   */
  getFile (telegramFileURL, callback) {
    var urlQuery = { 'file_id': telegramFileURL }

    web(this, 'getFile', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(data.ok, data.result)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Returns a number of the bot current interval of getting updates in milliseconds.
   */
  getInterval () {
    return this._botSettings.interval
  }

  /**
   * Returns a User object of the bot account itself.
   * @param {function} callback { error: Error | null, bot: UserObject}
   */
  getMe (callback) {
    web(this, 'getMe', {}, (data) => {
      if (data.ok) {
        callback(null, data.result)
      } else {
        callback(new Error(data.description))
      }
    })
  }

  /**
   * Returns a number of the current bot being used for the bot communication.
   */
  getPort () {
    return this._botSettings.port
  }

  /**
   * Returns a date number of the bot startup time.
   */
  getStartupTime () {
    return this._process.startupTime
  }

  /**
   * Callback a UserProfilePhotos object of the target user id.
   * @param {number} userId The target user id.
   * @param {number} offset The starting index of the photos to return. Default is 0.
   * @param {number} limit The last index of the photos to return. Default is 100.
   * @param {function(Error, number):void} callback arg0: Error, arg1: photos
   */
  getUserProfilePhotos (userId, offset, limit, callback) {
    var urlQuery = { 'user_id': userId, 'offset': offset, 'limit': limit }

    web(this, 'getUserProfilePhotos', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Kick a target user from a group or supergroup chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number} userId The target user id.
   * @param {function(Error, number):void} callback arg0: Error
   */
  kickChatMember (targetChat, userId, callback) {
    var urlQuery = { 'chat_id': targetChat, 'user_id': userId }

    web(this, 'kickChatMember', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Order the bot to leave the target channel,group or supergroup chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {function(Error):void} callback arg0: Error
   */
  leaveChat (targetChat, callback) {
    var urlQuery = { 'chat_id': targetChat }

    web(this, 'leaveChat', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Pins a target message in a group or supergroup.
   *
   * The bot must be an administrator with appropriate admin rights.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number} messageId The message id.
   * @param {object} settings
   * @param {boolean} settings.disable_notification
   * @param {function(Error):void} callback arg0: Error
   */
  pinChatMessage (targetChat, messageId, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'message_id': messageId }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'pinChatMessage', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Promote or demote a target user in a supergroup or channel.
   *
   * The bot must be an administrator with appropriate admin rights.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number} userId The target user id.
   * @param {object} settings
   * @param {boolean} settings.can_change_info
   * @param {boolean} settings.can_post_messages
   * @param {boolean} settings.can_edit_messages
   * @param {boolean} settings.can_delete_messages
   * @param {boolean} settings.can_invite_users
   * @param {boolean} settings.can_restrict_members
   * @param {boolean} settings.can_pin_messages
   * @param {boolean} settings.can_promote_members
   * @param {function(Error):void} callback arg0: Error
   */
  promoteChatMember (targetChat, userId, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'user_id': userId }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'promoteChatMember', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Adds or removes a target user's restriction in a target chat.
   *
   * The bot must be an administrator with appropriate admin rights.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number} userId The target user id.
   * @param {object} settings
   * @param {number} settings.until_date
   * @param {boolean} settings.can_send_messages
   * @param {boolean} settings.can_send_media_messages
   * @param {boolean} settings.can_send_other_messages
   * @param {boolean} settings.can_add_web_page_previews
   * @param {function(Error):void} callback arg0: Error
   */
  restrictChatMember (targetChat, userId, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'user_id': userId }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'restrictChatMember', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Send a audio file to the target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} targetFile The file id or URL to the file.
   * @param {object} settings
   * @param {string} settings.caption
   * @param {number} settings.duration
   * @param {boolean} settings.disable_notification
   * @param {string} settings.performer
   * @param {string} settings.reply_markup
   * @param {number} settings.replyToMessageId
   * @param {boolean} settings.title
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendAudio (targetChat, targetFile, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'audio': targetFile }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'sendAudio', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result.message_id)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Send a status notification to the target chat. Recommended if the task is going to take some time.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} action Can either have: "find_location", "record_audio", "record_video", "typing", "upload_audio", "upload_document", "upload_photo", "upload_video".
   * @param {function(Error):void} callback arg0: Error
   */
  sendChatAction (targetChat, action, callback) {
    var urlQuery = { 'chat_id': targetChat, 'action': action }

    web(this, 'sendChatAction', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Send a contact to the target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} phoneNumber The contact's phone number.
   * @param {string} firstName The contact's first name.
   * @param {object} settings
   * @param {boolean} settings.disable_notification
   * @param {string} settings.last_name
   * @param {string} settings.reply_markup
   * @param {number} settings.replyToMessageId
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendContact (targetChat, phoneNumber, firstName, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'phone_number': phoneNumber, 'first_name': firstName }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'sendContact', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result.message_id)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Send a file to the target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} targetFile The file id or URL to the file.
   * @param {object} settings
   * @param {string} settings.caption
   * @param {boolean} settings.disable_notification
   * @param {string} settings.reply_markup
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendDocument (targetChat, targetFile, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'document': targetFile }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'sendDocument', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(data.ok, data.result.message_id)
        } else {
          callback(new Error(data.ok))
        }
      }
    })
  }

  /**
   * Sends a file to the target chat. Shortened sendDocument method.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} targetFile The file id or URL to the file.
   * @param {object} settings
   * @param {string} settings.caption
   * @param {boolean} settings.disable_notification
   * @param {string} settings.reply_markup
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendFile (targetChat, targetFile, settings, callback) {
    this.sendDocument(targetChat, targetFile, settings, callback)
  }

  /**
   * Send a HTML message to a target chat.
   * @param {number|string} targetChat The target chat id or username to send to.
   * @param {string} html The html message to send. All tags must be closed properly.
   * @param {object} settings
   * @param {boolean} settings.disable_notification
   * @param {boolean} settings.disable_web_page_preview
   * @param {string} settings.reply_markup
   * @param {number} settings.replyToMessageId
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendHtml (targetChat, html, settings, callback) {
    var setSettings = Object.assign((settings || {}), {'parse_mode': 'HTML'})
    this.sendMessage(targetChat, html, setSettings, callback)
  }

  /**
   * Send a photo to a target chat. Alternative to sendPhoto.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} targetFile The file id or URL to the photo.
   * @param {object} settings
   * @param {string} settings.caption
   * @param {boolean} settings.disable_notification
   * @param {string} settings.reply_markup
   * @param {number} settings.replyToMessageId
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendImage (targetChat, targetFile, settings, callback) {
    this.sendPhoto(targetChat, targetFile, settings, callback)
  }

  /**
   * Send a location to the target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {float number} latitude The Float Number of the latitude.
   * @param {float number} longitude The Float Number of the longitude.
   * @param {object} settings
   * @param {boolean} settings.disable_notification
   * @param {number} settings.live_period
   * @param {number} settings.reply_to_messageId
   * @param {string} settings.reply_markup
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendLocation (targetChat, latitude, longitude, settings, callback) {
    var urlQuery = {
      'chat_id': targetChat,
      'latitude': latitude,
      'longitude': longitude
    }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'sendLocation', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result.message_id)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Send a Markdown message to the target chat.
   * @param {number|string} targetChat The target chat id or username to send to.
   * @param {string} markdown The markdown message to send. All tags must be closed properly.
   * @param {object} settings
   * @param {boolean} settings.disable_notification
   * @param {boolean} settings.disable_web_page_preview
   * @param {string} settings.reply_markup
   * @param {number} settings.replyToMessageId
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendMarkdown (targetChat, markdown, settings, callback) {
    var setSettings = Object.assign((settings || {}), {'parse_mode': 'Markdown'})
    this.sendMessage(targetChat, markdown, setSettings, callback)
  }

  /**
   * Send a message to the target chat.
   * @param {number|string} targetChat The target chat id or username to send to.
   * @param {string} text The message text to send.
   * @param {object} settings
   * @param {boolean} settings.disable_notification
   * @param {boolean} settings.disable_web_page_preview
   * @param {string} settings.parse_mode
   * @param {string} settings.reply_markup
   * @param {number} settings.replyToMessageId
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendMessage (targetChat, text, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'text': text }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'sendMessage', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(data.ok, data.result.message_id)
        } else {
          callback(data.ok)
        }
      }
    })
  }

  /**
   * Send a photo to a target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} targetFile The file id or URL to the photo.
   * @param {object} settings
   * @param {string} settings.caption
   * @param {boolean} settings.disable_notification
   * @param {string} settings.reply_markup
   * @param {number} settings.replyToMessageId
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendPhoto (targetChat, targetFile, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'photo': targetFile }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'sendPhoto', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result.message_id)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Send a message to the target chat. (Shorten version of sendMessage)
   * @param {number|string} targetChat The target chat id or username to send to.
   * @param {string} text The message text to send.
   * @param {object} settings
   * @param {boolean} settings.disable_notification
   * @param {boolean} settings.disable_web_page_preview
   * @param {string} settings.reply_markup
   * @param {number} settings.replyToMessageId
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendText (targetChat, text, settings, callback) {
    this.sendMessage(targetChat, text, settings, callback)
  }

  /**
   * Send a venue to the target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {float number} latitude The Float Number of the latitude.
   * @param {float number} longitude The Float Number of the longitude.
   * @param {string} title The title of the of the location. Doesn't have to be a real value.
   * @param {string} address The address of the location. Doesn't have to be a real value.
   * @param {object} settings
   * @param {string} settings.foursquare_id
   * @param {boolean} settings.disable_notification
   * @param {number} settings.reply_to_messageId
   * @param {string} settings.reply_markup
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendVenue (targetChat, latitude, longitude, title, address, settings, callback) {
    var urlQuery = {
      'chat_id': targetChat,
      'latitude': latitude,
      'longitude': longitude,
      'title': title,
      'address': address
    }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'sendVenue', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result.message_id)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Send a video to a target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} targetFile The target file id or URL of the file.
   * @param {object} settings
   * @param {string} settings.caption
   * @param {boolean} settings.disable_notification
   * @param {number} settings.duration
   * @param {number} settings.height
   * @param {string} settings.reply_markup
   * @param {number} settings.width
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendVideo (targetChat, targetFile, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'video': targetFile }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'sendVideo', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result.message_id)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Send an under a minute rounded video to a target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} targetFile The target file id or URL of the file.
   * @param {object} settings
   * @param {boolean} settings.disable_notification
   * @param {number} settings.duration
   * @param {number} settings.length
   * @param {string} settings.reply_markup
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendVideoNote (targetChat, targetFile, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'video_note': targetFile }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'sendVideoNote', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result.message_id)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Send a voice message to the target chat.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} targetFile The target file id or URL of the file.
   * @param {object} settings
   * @param {string} settings.caption
   * @param {boolean} settings.disable_notification
   * @param {number} settings.duration
   * @param {string} settings.reply_markup
   * @param {number} settings.replyToMessageId
   * @param {function(Error, number):void} callback arg0: Error, arg1: messageId
   */
  sendVoice (targetChat, targetFile, settings, callback) {
    var urlQuery = { 'chat_id': targetChat, 'voice': targetFile }

    if (typeof settings === 'object') {
      Object.assign(urlQuery, settings)
    }

    web(this, 'sendVoice', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null, data.result.message_id)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Change the current channel, group or supergroup description.
   *
   * The bot must be an administrator with appropriate admin rights.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} description New chat description. 1 to 255 characters maximum.
   * @param {function(Error):void} callback arg0: Error
   */
  setChatDescription (targetChat, description, callback) {
    var urlQuery = { 'chat_id': targetChat, 'description': description }

    web(this, 'setChatDescription', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Change the current channel, group or supergroup title.
   *
   * The bot must be an administrator with appropriate admin rights.
   * @param {number|string} targetChat The target chat id or username.
   * @param {string} title New chat title. 1 to 255 characters maximum.
   * @param {function(Error):void} callback arg0: Error
   */
  setChatTitle (targetChat, title, callback) {
    var urlQuery = { 'chat_id': targetChat, 'title': title }

    web(this, 'setChatTitle', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Enable or disable console log messages for getUpdates. Testing purposes only.
   * @param {boolean} boolean true or false.
   */
  setDevMode (boolean) {
    if (typeof boolean !== 'boolean') {
      throw new Error('Value has to be a boolean.')
    }
    this._botSettings.devMode = boolean
  }

  /**
   * Change the rate that the bot polls getUpdates per interval.
   * @param {number} interval The interval to set to. Can't be less than 1000.
   */
  setInterval (interval) {
    if (typeof interval !== 'number') {
      throw new Error('Value has to be a number.')
    }
    if (interval < 1000) {
      throw new Error('Value is set too small. Recommended 1000 or greater.')
    }
    this._botSettings.interval = interval
  }

  /**
   * Change the http method to use.
   *
   * Methods currently supported are: 'GET', 'POST'. Default is 'POST'.
   * @param {string} method The method to change to.
   */
  setMethod (method) {
    if (typeof method !== 'string') {
      throw new Error('Value has to be a string.')
    }
    if (['GET', 'POST'].indexOf(method) === -1) {
      throw new Error("Value can only either be 'GET' or 'POST'.")
    }
    this._botSettings.method = method
  }

  /**
   * Change the http port to use.
   *
   * Ports currently supported are: 80, 88, 443, 8443. Default is 443.
   * @param {number} port The port to change to.
   */
  setPort (port) {
    if (typeof port !== 'number') {
      throw new Error('Value has to be a number.')
    }
    // Ports available: https://core.telegram.org/bots/api#setwebhook
    if ([80, 88, 443, 8443].indexOf(port) === -1) {
      throw new Error(`Port ${port} is not supported.`)
    }
    this._botSettings.port = port
  }

  /**
   * Returns a string of the class object type.
   */
  toString () {
    return `[object ${this.constructor.name}]`
  }

  /**
   * Unban a target group or supergroup member.
   *
   * The bot must be an administrator with appropriate admin rights.
   * @param {number|string} targetChat The target chat id or username.
   * @param {number} userId The user's id to unban.
   * @param {function(Error):void} callback arg0: Error
   */
  unbanChatMember (targetChat, userId, callback) {
    var urlQuery = { 'chat_id': targetChat, 'user_id': userId }

    web(this, 'unbanChatMember', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }

  /**
   * Unpin the target group or supergroup message.
   *
   * The bot must be an administrator with appropriate admin rights.
   * @param {number|string} targetChat The target chat id or username.
   * @param {function(Error):void} callback arg0: Error
   */
  unpinChatMessage (targetChat, callback) {
    var urlQuery = { 'chat_id': targetChat }

    web(this, 'unpinChatMessage', urlQuery, (data) => {
      if (typeof callback === 'function') {
        if (data.ok) {
          callback(null)
        } else {
          callback(new Error(data.description))
        }
      }
    })
  }
}

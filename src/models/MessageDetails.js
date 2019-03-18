var botStuff = require("@helpers/bot-stuff"),
  Common = require("@helpers/common"),
  auth = require("@auth");

class MessageDetails {

  constructor(client_data) {
    this.channel_id = null;
    this.user_id = null;
    this.bot = null;
    this.world = null;
    this.server = null;
    this.username = null;
    this.args = null;
    this.message = '';

    if (client_data) {
      Object.assign(this, client_data);
    }
  }

  response(message, opts) {
    var _this = this;

    if(opts && opts.pre && message && typeof message == 'string') {
      message = `\`\`\`\n ${message} \n\`\`\``;
    }

    _this.bot.simulateTyping(_this.channel_id, function () {
      _this.bot.sendMessage({
        to: _this.channel_id,
        message: message
      });
    });
  }

  getResolvedMessage() {
    var message = this.message;
    return botStuff.resolveMessageSnowFlakes(message);
  }

  getNick(user_id) {
    return botStuff.findThingsName(this.channel_id, user_id);
  };

  ownerIsMaster() {
    return this.server.isMaster(this.user_id);
  }

  ownerCanManageTheServer() {
    return this.server.canManageTheServer(this.user_id);
  }

  ownerIsDev() {
    if (!auth.dev_ids || !auth.dev_ids.length) {
      return false;
    }
    return auth.dev_ids.indexOf(this.user_id) >= 0;
  }

  ownerIsPermitted() {
    return this.server.permitted[this.user_id] != null;
  };

  il8nResponse(key, params) {
    return this.response(this.server.lang(key, params));
  }


  ownerIsServerOwner() {
    return this.server.server_owner_user_id == this.user_id;
  };

  messageNick() {
    return this.getNick(this.user_id);
  }

  getMessage() {
    return this.message;
  }

  boundNick() {
    return botStuff.findThingsName(this.channel_id, this.server.bound_to);
  }

  getOwnersVoiceChannel() {
    return botStuff.getUserVoiceChannel(this.user_id);
  };

  getUserIds() {
    return Common.messageIDs(this.message);
  };

}

module.exports = MessageDetails;

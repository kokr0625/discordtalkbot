
var langMap = require("@helpers/voiceMap");
var Common = require('@helpers/common');

// models
var BotCommand = require('@models/BotCommand');

/**
 * Command: mylang
 * sets language user config
 *
 * usage !mylang au
 *
 * US
 * NL
 * AU
 * GB
 * FR
 * CA
 * DE
 * IT
 * JP
 * KR
 * BR
 * ES
 * SE
 * TR
 *
 * @param   {[MessageDetails]}  msg     [message releated helper functions]
 * @param   {[Server]}  server  [Object related to the Server the command was typed in.]
 * @param   {[World]}  world   [Object related to the realm and general bot stuff]
 *
 * @return  {[undefined]}
 */
function myVoice(msg, server, world) {
    if(!msg.args || !msg.args.length){
      msg.response(server.lang('myvoice.more'));
      return;
    }

    if(msg.args[0] == 'auto'){
      server.addUserSetting(msg.user_id, 'name', 'auto');
      msg.response( server.lang('myvoice.auto') );
      return;
    }

    var found = langMap.getVoice(msg.args[0]);
    if(found && found.length) {
      var doc = found[0];
      server.addUserSetting(msg.user_id,'name', doc.voice);
      server.addUserSetting(msg.user_id,'language', doc.code);
      server.deleteUserSetting(msg.user_id,'toLanguage');
      msg.response(server.lang('myvoice.okay', { voice: msg.args[0] }));
    } else {
      msg.response(server.lang('myvoice.no', { voice: msg.args[0] }));
      return;
    }
};

var command = new BotCommand({
  command_name: 'myvoice',
  command_arg: 'l',
  execute: myVoice,
  short_help: 'myvoice.shorthelp',
  long_help: 'myvoice.longhelp',
});


exports.register = function (commands) {
  commands.add(command);
};

exports.unRegister = function (commands) {
  commands.remove(command);
};

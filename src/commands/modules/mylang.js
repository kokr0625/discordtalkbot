
var langMap = require("@helpers/voiceMap");

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
function mylang(msg, server, world) {

    if(!msg.args || !msg.args.length){
      msg.response(server.lang('mylang.more'));
      return;
    }

    if(msg.args[0] == 'default'){
      server.addUserSetting(msg.user_id, 'language', 'default');
      server.addUserSetting(msg.user_id, 'name', 'default');
      msg.response( server.lang('general.auto', {key: "mylang"}) );
      return;
    }

    var docs = langMap.getLang(msg.args[0]);

    if(!docs || !docs.length) {
      //what dont know???? why? you should by now...
      msg.response(server.lang('mylang.no', { lang: msg.args[0]}));
      return;
    }

    var doc = docs[0];

    //server.[msg.user_id].language = doc.code;
    server.addUserSetting(msg.user_id,'language', doc.code);


    var response = server.lang('mylang.okay', { lang: doc.language });

    var voiceName = server.getUserSetting(msg.user_id,'name');
    if( voiceName && voiceName != "auto" ) {
      response += "\n" + server.lang('myvoice.noped');
    }
    server.addUserSetting(msg.user_id,'name', 'auto');
    msg.response(response);

};

var command = new BotCommand({
  command_name: 'mylang',
  command_arg: 'l',
  execute: mylang,
  short_help: 'mylang.shorthelp',
  long_help: 'mylang.longhelp',
});


exports.register = function (commands) {
  commands.add(command);
};

exports.unRegister = function (commands) {
  commands.remove(command);
};

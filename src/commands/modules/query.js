var Command = require('@models/Command')
  Common = require('@helpers/common'),
  CommentBuilder = require('@models/CommentBuilder'),
  fetch = require('fetch'),
  SFX = require('./sfx').class,
  TextRule = require('./textrule').class,
  ini = require('ini-extra'),
  jsonpath = require('jsonpath'),
  alasql = require('alasql'),
  util = require('util');

    function replacer(key, value) {
      if (key.endsWith("_timeout")) return undefined; // these keys are internal timers that we dont want to save
      if (key == "command_responses") return undefined;
      if (key == "world") return undefined;
      else return value;
    };

class Query extends Command {
  execute ({input, server, world}) {
    if (!input.ownerCanManageTheServer()) return input.il8nResponse('general.nope');

    try {

      var a = util.inspect(world,{
        depth : 4
      });
      var data = JSON.stringify(world);
        // res = jsonpath.query(data, input.getMessage()),
        // out = JSON.stringify(res, undefined, '\t');

      // input.response(`\`\`\`\n ${out} \n\`\`\``);
    } catch (error) {
      var out = JSON.stringify(error, '\t');
      input.response(`\`\`\`\n ${out} \n\`\`\``);
    }
  }
}


//registration
exports.register =  (commands) => {
  commands.add(Query.command)
};

exports.unRegister = (commands) => {
  commands.remove(Query.command)
};

exports.class = Query;

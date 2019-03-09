var Command = require('@models/Command')
  Common = require('@helpers/common'),
  CommentBuilder = require('@models/CommentBuilder'),
  fetch = require('fetch'),
  SFX = require('./sfx').class,
  TextRule = require('./textrule').class,
  ini = require('ini-extra'),
  alasql = require('alasql');


class Query extends Command {
  execute ({input, server, world}) {

    //alasql('CREATE TABLE servers');
    // alasql.tables.servers  = {
    //   data : world.servers
    // };

    var res = alasql(input.getMessage(),
      [ world.servers ]
    );

    return input.response(CommentBuilder.create({
      data : res
    }));
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

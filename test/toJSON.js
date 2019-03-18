//testing the toJson function

class Model {
  constructor() {
  }

  get privates (){
    return {};
  }

  toJSON () {
    let json_data = { ...this, ...this.privates };
    for (const key in json_data) {
      if (json_data.hasOwnProperty(key) && key.startsWith("_")) delete json_data[key];
    }

    return json_data;
  }
}

class World {
  constructor() {
    this.servers = []
  }
}


class Server extends Model {
  constructor(a) {
    super();
    this.id = a;
    this.a = "b"
    this._hide = "will not be shown";
    this.p = "should be private";
  }

  get privates (){
    return {
      p : undefined
    };
  }
}

let world = new World();
world.servers.push(new Server(0));
world.servers.push(new Server(1));
world.servers.push(new Server(2));
world.servers.push(new Server(3));

var out = JSON.stringify(world);
console.log(out);

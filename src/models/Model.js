class Model {

  get privates (){
    return {};
  }

  toJSON () {
    let json_data = { ...this, ...this.privates };
    for (const key in json_data) {
      if (key.startsWith("_")) json_data[key] = undefined;
      if (key.endsWith("_timeout")) json_data[key] = undefined;
    }
    // var a = util.inspect(json_data, {
    //   depth : 4
    // });

    return json_data;
  }


  cyclicStringify() {
    var jsObject = this;
    // this will successfully serialize objects with cyclic
    // references by supplying @name for an object already
    // serialized instead of passing the actual object again,
    // thus breaking the vicious circle
    var alreadyVisited = [];
    var serializedData = JSON.stringify(jsObject, function(key, value) {
        if (typeof value == "object") {
            if (alreadyVisited.indexOf(value.name) >= 0) {
                // do something other that putting the reference, like
                // putting some name that you can use to build the
                // reference again later, for eg.
                return "@" + value.name;
            }
            alreadyVisited.push(value.name);
        }
        return value;
    });
    // return modified, sanitized result
    return serializedData;
  }



}

module.exports = Model;

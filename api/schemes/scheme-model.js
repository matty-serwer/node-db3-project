const db = require("../../data/db-config");

module.exports = {
  find() {
    return db("schemes");
  },
  findById(id) {
    const schemaObject = db("schemes").where({ id }).first();
    if (!schemaObject) {
      return null;
    } else {
      return schemaObject;
    }
  },
  findSteps(id) {
    //   select
    //     *
    // from steps st
    // join schemes sc
    //     on st.scheme_id = sc.id
    // where sc.id = 1
    return db("steps as st")
      .join("schemes as sc", "st.scheme_id", "sc.id")
      .where("sc.id", id)
      .orderBy("st.step_number");
  },
  add(scheme) {
    return db("schemes")
      .insert(scheme)
      .then(([id]) => {
        return db("schemes").where("id", id);
      });
  },
  update(changes, id) {
    return db("schemes").where("id", id).update(changes)
      .then(count => {
        if(count === 1) {
          return db("schemes").where("id", id)
        } else {
          return null;
        }
      });
  },
};

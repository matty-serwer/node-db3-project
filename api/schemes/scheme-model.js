const db = require("../../data/db-config");

module.exports = {
  find() {
    return db('schemes')
  }
}
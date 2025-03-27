const db = require('../config/db');

const Login = {
  verifyCredentials: (login_id, password, callback) => {
    const sql = 'SELECT * FROM login_access WHERE login_id = ? AND password = ?';
    db.query(sql, [login_id, password], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  }
};

module.exports = Login;

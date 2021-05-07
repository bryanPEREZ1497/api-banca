const jwt = require('jsonwebtoken');
const pool = require('../models/database.connection');
const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No token provided" });
    const decoded = jwt.verify(token, 'bank');
    req.userId = decoded.id;
    const user = await pool.query(
      'SELECT id FROM auditoria.usuario WHERE login=$1',
      [req.userId]
    );
    if (!user.rows) return res.status(404).json({ message: "No user found" });
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized!",
      error: error
    });
  }
};
const isModerator = async (req, res, next) => {
  try {
    const roles = await pool.query(
      'SELECT * FROM auditoria.usuario_rol WHERE id_usuario=$1',
      [req.userId]
    );
    for (let i = 0; i < roles.rows.length; i++) {
      if (roles.rows[i].name === "moderator") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const roles = await pool.query(
      'SELECT * FROM auditoria.usuario_rol WHERE id_usuario=$1',
      [req.userId]
    );
    for (let i = 0; i < roles.rows.length; i++) {
      if (roles.rows[i].name === "admin") {
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: error });
  }
};
module.exports = { verifyToken, isModerator };
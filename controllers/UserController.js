/** @format */

const { Client } = require('pg');
const { hasPassword, passwordIsValid } = require('../helpers');

const psql = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'postgres',
  database: 'ontology',
});

psql.connect();

exports.login = async (req, res, next) => {
  const { pseudo, password } = req.body;

  try {
    let existingUser = await psql.query({
      name: 'fecth-user',
      text: `SELECT * FROM users WHERE pseudo = $1`,
      values: [pseudo],
    });

    let user = existingUser.rows[0];

    if (user && passwordIsValid(password, user.password)) {
      const userInfo = {
        idUser: user.idUser,
        pseudo: user.pseudo,
        name: user.name,
        surname: user.surname,
      };
      res.status(200).json({
        user: userInfo,
      });
    } else {
      res.status(500).send({
        err: 'Mot de passe ou email incorrect',
      });
    }
  } catch (error) {
    res.status(500).send({
      err: 'il ya erreur ici sur la connexion',
      message: error,
    });
  }
};

exports.register = async (req, res, next) => {
  const { name, password, pseudo, surname } = req.body;

  try {
    const user = await psql.query({
      text: `INSERT INTO users(pseudo, password, name, surname)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      values: [pseudo, hasPassword(password), name, surname],
    });

    user
      ? res.json(user.rows[0])
      : res.status(400).send({
          status: 'error',
          message: 'Erreur serveur',
        });
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: `Erreur sur le serveur`,
      errors: error,
    });
  }
};

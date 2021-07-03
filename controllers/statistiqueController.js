/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');

exports.stats = async (req, res, next) => {
  try {
    const classe = await graphDBEndpoint.query(
      `SELECT ( count(?class) as ?count ) { ?class a owl:Class }
      `,
      { transform: 'toJSON' }
    );

    const predicat = await graphDBEndpoint.query(
      `SELECT ( count(?predicat) as ?count ) { ?a ?predicat ?b }
      `,
      { transform: 'toJSON' }
    );

    const label = await graphDBEndpoint.query(
      `SELECT ( count(?b) as ?count ) { ?a rdfs:label ?b }
      `,
      { transform: 'toJSON' }
    );

    const comment = await graphDBEndpoint.query(
      `SELECT ( count(?b) as ?count ) { ?a rdfs:comment ?b }
      `,
      { transform: 'toJSON' }
    );

    return classe
      ? res.json({
          classe,
          predicat,
          label,
          comment,
        })
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

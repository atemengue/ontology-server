/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');

exports.getAliments = async (req, res, next) => {
  try {
    let aliments = await graphDBEndpoint.query(
      `SELECT ?aliment ?label
      WHERE {
          ?aliment rdf:type food:Aliment .
          OPTIONAL { 
            ?aliment rdfs:label ?label .
          }
      }`,
      { tranform: 'toJSON' }
    );

    return aliments
      ? res.json(aliments)
      : res.status(400).send({
          status: 'error',
          message: 'Erreur serveur',
        });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error',
      message: `Erreur sur le serveur`,
      errors: error,
    });
  }
};

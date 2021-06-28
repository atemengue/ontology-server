/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');

exports.getAllClasses = async (req, res, next) => {
  try {
    let classes = await graphDBEndpoint.query(
      `SELECT ?class ?label
      WHERE { 
        ?class rdf:type owl:Class .
        ?class rdfs:label ?label
}`,
      { transform: 'toJSON' }
    );
    return classes
      ? res.json(classes)
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

exports.getClasse = async = (req, res, next) => {};

exports.addClasse = async = (req, res, next) => {};

exports.deleteClasse = async = (req, res, next) => {};

exports.updateClass = async = (req, res, next) => {};

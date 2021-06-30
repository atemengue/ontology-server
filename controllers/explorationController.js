/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');

exports.explore = async (req, res, next) => {
  const libelle = req.params.libelle;
  try {
    let data = await graphDBEndpoint.query(
      `SELECT ?link ?subject ?label ?labelPredicat
  WHERE {
      food:${libelle} ?link ?subject .
      OPTIONAL {
        ?subject rdfs:label ?label.
      }
       OPTIONAL {
        ?link rdfs:label ?labelPredicat.
      }
      
      filter ( !bound(?label) || lang(?label) = 'fr' )
                  filter ( !bound(?labelPredicat) || lang(?labelPredicat) = 'fr' )
                  filter (isLiteral(?subject) || isLiteral(?label))
      
                }`,
      { transform: 'toJSON' }
    );

    let relations = await graphDBEndpoint.query(
      `SELECT ?link ?subject ?label ?labelPredicat
  WHERE {
     $subject ?link food:${libelle} .
     
      
                }`,
      { transform: 'toJSON' }
    );

    return data && relations
      ? res.json({
          details: data,
          relations: relations,
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

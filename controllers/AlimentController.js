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
    return res.status(500).send({
      status: 'error',
      message: `Erreur sur le serveur`,
      errors: error,
    });
  }
};

exports.getAliment = async (req, res, next) => {
  try {
    let data = await graphDBEndpoint.query(
      `SELECT ?link ?subject ?label ?labelPredicat
WHERE {
    food:Eau ?link ?subject .
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

    return data
      ? res.json(data)
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

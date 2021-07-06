/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');
var groupBy = require('lodash.groupby');
var omit = require('lodash.omit');
var remove = require('lodash.remove');

const setApport = (substances) => {
  return substances.join(', ');
};

const normalizeSparqlResults = (results) =>
  omit(
    groupBy(results, (x) => x.uriMaladie.split('#')[1]),
    [
      'topObjectProperty',
      'first',
      'someValuesFrom',
      'allValuesFrom',
      'topDataProperty',
    ]
  );

exports.getMaladie = async (req, res, next) => {
  const { etat } = req.params;

  try {
    let maladies = await graphDBEndpoint.query(
      `
      SELECT * WHERE
            {
              ?subject ?predicat food:${etat} .
                ?subject rdfs:label ?label.
                ?subject rdfs:label ?value

            }
      `,
      { transform: 'toJSON' }
    );

    return maladies
      ? res.json(maladies)
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

exports.maladieRecommendation = async (req, res, next) => {
  let _maladies = setApport(req.body);

  try {
    let response = await graphDBEndpoint.query(
      `
      SELECT *
      WHERE {  
    {
            ?uriMaladie ?predicat ?uriObject .
        OPTIONAL {
          ?uriMaladie rdfs:label ?labelMaladieFR
                FILTER (lang(?labelMaladieFR) = "fr") .
        }
        
        OPTIONAL {
          ?uriObject rdfs:label ?uriObjectFR
                FILTER (lang(?uriObjectFR) = "fr") .
        }
        
          OPTIONAL {
          ?uriObject rdfs:label ?uriObjectEN
                FILTER (lang(?uriObjectEN) = "en") .
        }
        
           OPTIONAL {
          ?uriMaladie rdfs:label ?labelMaladieEN 
                FILTER (lang(?labelMaladieEN) = "en") .
        }
        
        OPTIONAL {
            ?predicat rdfs:label ?labelPredicat .
        }
    FILTER (?uriMaladie IN (${_maladies}))
        
    } UNION {
         ?uriSubject ?predicat ?uriMaladie .

         OPTIONAL {
          ?uriMaladie rdfs:label ?labelMaladieFR 
                FILTER (lang(?labelMaladieFR) = "") .
        }

         ?uriSubObj ?predicatSubObj ?uriSubject .
        
         OPTIONAL {
          ?uriSubObj rdfs:label ?labeluriSubObjEN 
                FILTER (lang(?labeluriSubObjEN) = "en") .
        }
        
           OPTIONAL {
          ?uriSubObj rdfs:label ?labeluriSubObjFR
                FILTER (lang(?labeluriSubObjFR) = "fr") .
        }
                
         OPTIONAL {
            ?predicat rdfs:label ?labelPredicat .
        }
        
         OPTIONAL {
            ?uriSubject rdfs:label ?labelUriSubject .
        }
          FILTER (?uriMaladie IN (${_maladies}))

        }
        
} 
      `,
      { transform: 'toJSON' }
    );

    let newData = normalizeSparqlResults(response.records);
    let newArray = [];

    for (const [key, value] of Object.entries(newData)) {
      remove(value, function (cur) {
        return (
          cur.predicat === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' ||
          cur.predicat === 'https://www.w3.org/2000/01/rdf-schema#comment'
        );
      });
    }

    return newData
      ? res.json(newData)
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

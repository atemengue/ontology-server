/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');
var groupBy = require('lodash.groupby');
var omit = require('lodash.omit');

const normalizeSparqlResults = (results) =>
  omit(
    groupBy(results, (x) => x.predicat.split('#')[1]),
    ['topObjectProperty']
  );

exports.explore = async (req, res, next) => {
  const libelle = req.params.libelle;
  try {
    let data = await graphDBEndpoint.query(
      `
      SELECT DISTINCT * {
        { food:${libelle} ?predicat ?object
               OPTIONAL { ?object rdf:type ?type }
                OPTIONAL { ?object rdfs:label ?label 
                        FILTER (lang(?label) = "fr") . }
                OPTIONAL { ?object rdfs:comment ?comment .} 
              OPTIONAL { ?object rdfs:label ?labelENG  
                      FILTER (lang(?labelENG) = "en") }
              OPTIONAL { ?predicat rdfs:label ?labelPredicat
                    FILTER (lang(?labelPredicat) = "fr") .}
              OPTIONAL { ?predicat rdfs:label ?labelPredicat
                    FILTER (lang(?labelPredicat) = "fr") . } 
                
                  FILTER ( !bound(?label) || lang(?label) = 'fr' )
          FILTER (isLiteral(?object) || isLiteral(?label))
          FILTER ( !bound(?labelPredicat) || lang(?labelPredicat) = 'fr' )
          }
          UNION 
        {  ?predicat ?object food:${libelle} .
              OPTIONAL { ?object rdf:type ?type }
                
                 OPTIONAL { ?object rdfs:label ?label 
                        FILTER (lang(?label) = "fr") . }
                OPTIONAL { ?object rdfs:comment ?comment .} 
              OPTIONAL { ?object rdfs:label ?labelENG  
                      FILTER (lang(?labelENG) = "en") }
              OPTIONAL { ?predicat rdfs:label ?labelPredicat
                    FILTER (lang(?labelPredicat) = "fr") .}
              OPTIONAL { ?predicat rdfs:label ?labelPredicat
                    FILTER (lang(?labelPredicat) = "fr") . } 
              
                  FILTER ( !bound(?label) || lang(?label) = 'fr' )
          FILTER (isLiteral(?object) || isLiteral(?label))
          FILTER ( !bound(?labelPredicat) || lang(?labelPredicat) = 'fr' )
            }
        
        
        }
      `,
      { transform: 'toJSON' }
    );

    let newData = normalizeSparqlResults(data.records);

    return data
      ? res.json({
          details: newData,
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

exports.describe = async (req, res, next) => {
  const libelle = req.params.libelle;

  try {
    let data = await graphDBEndpoint.query(
      `SELECT DISTINCT * {
        { food:${libelle} ?predicat ?object .
         
        }
        UNION 
        { ?subject ?predicat food:${libelle} .
            OPTIONAL {
             ?subject rdfs:label ?label 
                 FILTER (lang(?label) = "fr") .
           }
          }
      }
      `,
      { transform: 'toJSON' }
    );

    let newData = normalizeSparqlResults(data.records);

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

/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');

exports.getAllClasses = async (req, res, next) => {
  try {
    let classes = await graphDBEndpoint.query(
      `SELECT ?class ?label ?value
      WHERE { 
        ?class rdf:type owl:Class ;
        	rdfs:label ?label .

          OPTIONAL {
            ?class rdfs:label ?value .
          }

    	FILTER (lang(?label) = "fr") .
    	FILTER (lang(?value) = "fr")
    
    }

      ORDER BY ?label

`,
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
      status: ' error',
      message: `Erreur sur le serveur`,
      errors: error,
    });
  }
};

exports.getClasse = async (req, res, next) => {
  const nameClasse = req.params.nameClasse;
  try {
    let classes = await graphDBEndpoint.query(
      `SELECT ?link ?uri ?label ?comment ?labelENG ?value
      WHERE {
          ?uri rdf:type food:${nameClasse} ;

         

          OPTIONAL {
            ?uri rdfs:label ?label 
                  FILTER (lang(?label) = "fr") .
          }
          OPTIONAL {
                ?uri rdfs:comment ?comment .
          }
          OPTIONAL {
                ?uri rdfs:label ?labelENG  
                      FILTER (lang(?labelENG) = "en")
          }

          OPTIONAL {
            ?uri rdfs:label ?value
                  FILTER (lang(?value) = "fr") .
          }

          
      }
      `,
      { transform: 'toJSON' }
    );
    return classes
      ? res.json(classes)
      : res.status(200).send({
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

exports.addClasse = async = (req, res, next) => {};

exports.deleteClasse = async = (req, res, next) => {};

exports.updateClass = async = (req, res, next) => {};

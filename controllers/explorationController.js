/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');
var groupBy = require('lodash.groupby');
var omit = require('lodash.omit');

const normalizeSparqlResults = (results) =>
  omit(
    groupBy(results, (x) => x.predicat.split('#')[1]),
    [
      'topObjectProperty',
      'first',
      'someValuesFrom',
      'allValuesFrom',
      'topDataProperty',
    ]
  );

exports.explore = async (req, res, next) => {
  const libelle = req.params.libelle;
  try {
    let data = await graphDBEndpoint.query(
      `
      SELECT DISTINCT *  {
        {
              food:${libelle} ?predicat ?object
            
                OPTIONAL { ?object rdfs:label ?labelObject 
                  FILTER (lang(?labelObject) = "fr")  
            }
            
              OPTIONAL { ?object rdfs:comment ?commentObject
                  FILTER (lang(?commentObject) = "fr")  
            }
            
                OPTIONAL { ?predicat rdfs:label ?labelPredicatEN 
                  FILTER (lang(?labelPredicatEN) = "en")  
            }
            
              OPTIONAL { ?predicat rdfs:label ?labelPredicat 
                  FILTER (lang(?labelPredicat) = "fr")  
            }
            
             OPTIONAL { ?predicat rdfs:comment ?commentPredicat
                  FILTER (lang(?commentPredicat) = "fr")  
            }
            
                OPTIONAL { ?object rdfs:label ?labelObject 
                  FILTER (lang(?labelObject) = "fr")  
            }
             OPTIONAL { ?object rdfs:label ?labelObjectEN
                  FILTER (lang(?labelObjectEN) = "en")  
            }
           
        
        } UNION {
                
             ?subject ?predicat food:${libelle}
              OPTIONAL { ?subject rdfs:label ?labelSubject
                  FILTER (lang(?labelSubject) = "fr")  
            }
            OPTIONAL { ?subject rdfs:label ?labelSubjectEN
                  FILTER (lang(?labelSubjectEN) = "en")  
            }
             OPTIONAL { ?subject rdfs:label ?labelSubjectCM
                  FILTER (lang(?labelSubjectCM) = "cm")  
            }
            
              OPTIONAL { ?subject rdfs:comment ?commentSubject
                  FILTER (lang(?commentSubject) = "fr")  
            }
        }
        
    }
      `,
      { transform: 'toJSON' }
    );

    let newData = normalizeSparqlResults(data.records);

    return data
      ? res.json(newData)
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
    {
	food:${libelle} ?predicat ?object

  OPTIONAL { food:${libelle} rdfs:label ?classLabel
    FILTER (lang(?classLabel) = "fr")  
}

 OPTIONAL { food:${libelle} rdfs:label ?classLabelEN
    FILTER (lang(?classLabelEN) = "en")  
}

  OPTIONAL { food:${libelle} rdfs:comment ?classComment
    FILTER (lang(?classComment) = "fr")  
}
         OPTIONAL { ?object rdfs:label ?labelObject 
              FILTER (lang(?labelObject) = "fr")  
        }
         OPTIONAL { ?object rdfs:label ?labelObjectEN
              FILTER (lang(?labelObjectEN) = "en")  
        }
    }  UNION {
	?subject ?predicat food:${libelle}
         OPTIONAL { ?subject rdfs:label ?labelSubject
              FILTER (lang(?labelSubject) = "fr")  
        }
        OPTIONAL { ?subject rdfs:label ?labelSubjectEN
              FILTER (lang(?labelSubjectEN) = "en")  
        }
        OPTIONAL { ?subject rdfs:comment ?labelSubjectComment
              FILTER (lang(?labelSubjectComment) = "fr")  
        }
    }
    FILTER (!isLiteral(?object) || !isLiteral(?subject) )

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

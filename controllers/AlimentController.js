/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');

const setApport = (substances) => {
  return substances.join(', ');
};

exports.getAliments = async (req, res, next) => {
  try {
    let aliments = await graphDBEndpoint.query(
      `SELECT ?entity ?label ?comment ?value
      WHERE  { 
          { ?entity rdf:type  food:Aliment } UNION {?entity rdf:type  food:Legumes }  UNION {?entity rdf:type  food:ProduitLaitiers } UNION {?entity rdf:type  food:MatiereGrasses } UNION {?entity rdf:type  food:ViandeSeche } UNION  {?entity rdf:type  food:Cereales }  UNION  {?entity rdf:type  food:ViandeBrousse } 
          UNION {?entity rdf:type  food:MatiereGrasses } UNION {?entity rdf:type  food:ViandeBlanche } UNION {?entity rdf:type  food:Cereales }
           OPTIONAL {
                ?entity rdfs:label ?label 
                      FILTER (lang(?label) = "fr") .
              }
          
               OPTIONAL {
                ?entity rdfs:label ?value 
                      FILTER (lang(?value) = "fr") .
              }
          
         
      }
      
`,
      { transform: 'toJSON' }
    );
    return aliments
      ? res.json(aliments)
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

exports.getAliment = async (req, res, next) => {};

exports.addAliment = async (req, res, next) => {
  console.log(req.body);
  const { name, labelFR, labelEN, comment, substances } = req.body;

  let apports = setApport(substances);

  try {
    let aliment = await graphDBEndpoint.update(
      `
      INSERT DATA { food:${name} rdf:type food:Aliment, owl:NamedIndivual .
                    food:${name} rdfs:label  "${labelFR}"@fr, "${labelEN}"@en .
                    food:${name} rdfs:comment "${comment}"@fr .
                    food:${name} food:apporte ${apports} .
      }
      `,
      { tranform: 'toJSON' }
    );

    console.log(aliment);

    return aliment
      ? res.json(aliment)
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

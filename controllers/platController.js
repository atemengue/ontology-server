/** @format */

const { graphDBEndpoint } = require('../config/ConnectionProvider');

const setApport = (substances) => {
  return substances.join(', ');
};

exports.addPlat = async (req, res, next) => {
  console.log(req.body);
  const { name, labelFR, labelEN, comment, regions, alimentPlats } = req.body;

  let _aliments = setApport(alimentPlats);
  let _regions = setApport(regions);

  try {
    let aliment = await graphDBEndpoint.update(
      `
      INSERT DATA { food:${name} rdf:type food:Plat, owl:NamedIndivual .
        food:${name} rdfs:label  "${labelFR}"@fr, "${labelEN}"@en .
        food:${name} rdfs:comment "${comment}"@fr .
        food:${name} food:food:Consommer-Au ${_regions}
        food:${name} food:contient ${_aliments} .
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
    console.log(error);
    return res.status(500).send({
      status: 'error',
      message: `Erreur sur le serveur`,
      errors: error,
    });
  }
};

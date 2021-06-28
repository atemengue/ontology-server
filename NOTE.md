<!-- @format -->

#CHARGEMENT A LA PAGE

SELECT ?labelfr
?uri ?comment ?classe
WHERE { ?Aliment
rdf:
type ?classe .
?Aliment
rdfs:
label ?labelfr .
?Aliment
rdfs:
comment ?comment

#NOMBRE DE CLASSE
#MOT DE BIENVENUE
#NOMBRE DE PROPRIETE

SELECT ?s ?label ?comment ?domain
WHERE {
?s rdf:type owl:Class .
?s rdfs:label ?label .
}

const GRAPHDB_BASE_URL = 'http://localhost:7200',
GRAPHDB_REPOSITORY = 'food',
GRAPHDB_USERNAME = 'test',
GRAPHDB_PASSWORD = 'test';

const DEFAULT_PREFIXES = [
EnapsoGraphDBClient.PREFIX_OWL,
EnapsoGraphDBClient.PREFIX_RDF,
EnapsoGraphDBClient.PREFIX_RDFS,
EnapsoGraphDBClient.PREFIX_XSD,
EnapsoGraphDBClient.PREFIX_PROTONS,

{
prefix: 'food',
iri: 'http://localhost/ontologies/2021/food#',
},
];

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
baseURL: GRAPHDB_BASE_URL,
repository: GRAPHDB_REPOSITORY,
prefixes: DEFAULT_PREFIXES,
transform: 'toCSV',
});

graphDBEndpoint
.login(GRAPHDB_USERNAME, GRAPHDB_PASSWORD)
.then((result) => {
console.log(result);
})
.catch((err) => {
console.log(err);
});

graphDBEndpoint
.query(
`SELECT ?s ?label ?comment ?domain WHERE { ?s rdf:type owl:Class . ?s rdfs:label ?label . } `,
{ transform: 'toJSON' }
)
.then((result) => {
console.log('Read the classes name:\n' + JSON.stringify(result, null, 2));
})
.catch((err) => {
console.log(err);
});

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

// CODE TUTORIEL API
sparql endpoint c'est un web service qui accepte les requetes SPARQL

# filename: ex002.ttl exercice

@prefix ab: <http://learningsparql.com/ns/addressbook#> .

ab:richard ab:homeTel "(229) 276-5135" .
ab:richard ab:email "richard49@hotmail.com" .

ab:cindy ab:homeTel "(245) 646-5488" .
ab:cindy ab:email "cindym@gmail.com" .

ab:craig ab:homeTel "(194) 966-1505" .
ab:craig ab:email "craigellis@yahoo.com" .
ab:craig ab:email "c.ellis@usairwaysgroup.com" .

# REQUETE PERSONNE

PREFIX d: <http://learningsparql.com/ns/demo#>
SELECT ?person
WHERE
{ ?person d:homeTel "(229) 276-5135" . }

SELECT ?first ?last ?email
WHERE
{
?person ab:homeTel "(229) 276\*5153" .
?person ab:firtsName "(229) ?first" .
?person ab:lastName "(229) ?last" .
?person ab:email "(229) ?email" .
}

SELECT ?first ?last ?email
WHERE
{
?person ab:homeTel "(229) 276\*5153" ;
ab:firtsName "(229) ?first" ;
ab:lastName "(229) ?last" ;
ab:email "(229) ?email" .
}

# OPTIONAL REQUEST

SELECT ?first ?last ?workTel
WHERE
{
?s ab:firstName ?first ;
ab:lastName ?last .
OPTIONAL
{
?s ab:workTel ?workTel .
?S ab:workTel ?email .
}
OPTIONAL
{
?s ab:workTel ?email .
}
}

# filename: ex012.ttl

@prefix ab: <http://learningsparql.com/ns/addressbook#> .
@prefix d: <http://learningsparql.com/ns/data#> .

d:i0432 ab:firstName "Richard" .
d:i0432 ab:lastName "Mutt" .
d:i0432 ab:homeTel "(229) 276-5135" .
d:i0432 ab:email "richard49@hotmail.com" .

d:i9771 ab:firstName "Cindy" .
d:i9771 ab:lastName "Marshall" .
d:i9771 ab:homeTel "(245) 646-5488" .
d:i9771 ab:email "cindym@gmail.com" .

d:i8301 ab:firstName "Craig" .
d:i8301 ab:lastName "Ellis" .
d:i8301 ab:email "craigellis@yahoo.com" .
d:i8301 ab:email "c.ellis@usairwaysgroup.com" .

# filename: ex054.ttl

@prefix ab: <http://learningsparql.com/ns/addressbook#> .
@prefix d: <http://learningsparql.com/ns/data#> .

d:i0432 ab:firstName "Richard" .
d:i0432 ab:lastName "Mutt" .
d:i0432 ab:homeTel "(229) 276-5135" .
d:i0432 ab:nick "Dick" .
d:i0432 ab:email "richard49@hotmail.com" .

d:i9771 ab:firstName "Cindy" .
d:i9771 ab:lastName "Marshall" .
d:i9771 ab:homeTel "(245) 646-5488" .
d:i9771 ab:email "cindym@gmail.com" .

d:i8301 ab:firstName "Craig" .
d:i8301 ab:lastName "Ellis" .
d:i8301 ab:workTel "(245) 315-5486" .
d:i8301 ab:email "craigellis@yahoo.com" .
d:i8301 ab:email "c.ellis@usairwaysgroup.com" .

# retirer la personne n'ayant le worktel

SELECT ?first ?last
WHERE {
?s ab:firstName ?first ;
ab: lastName ?last .
NOT EXISTS {
?s ab:WorkTel ?workNum
}
}

SELECT ?first ?last
WHERE {
?s ab:firstName ?first ;
ab: lastName ?last .
OPTIONAL {
?s ab:WorkTel ?workNum
}
FILTER (bound(?workNum))
}

# filename: ex067.rq

PREFIX ab: <http://learningsparql.com/ns/addressbook#>

SELECT ?first ?last

WHERE
{
?s ab:firstName ?first ;
ab:lastName ?last .
FILTER NOT EXISTS { ?s ab:workTel ?workNum }
}

# filename: ex068.rq

PREFIX ab: <http://learningsparql.com/ns/addressbook#>

SELECT ?first ?last

WHERE
{
?s ab:firstName ?first ;
ab:lastName ?last .
MINUS { ?s ab:workTel ?workNum }
}

# filename: ex072.ttl

@prefix ab: <http://learningsparql.com/ns/addressbook#> .
@prefix d: <http://learningsparql.com/ns/data#> .

# People

d:i0432 ab:firstName "Richard" ;
ab:lastName "Mutt" ;
ab:email "richard49@hotmail.com" .

d:i9771 ab:firstName "Cindy" ;
ab:lastName "Marshall" ;
ab:email "cindym@gmail.com" .

d:i8301 ab:firstName "Craig" ;
ab:lastName "Ellis" ;
ab:email "c.ellis@usairwaysgroup.com" .

# REQUETES SPARQL

# 1

SELECT ?class ?label
WHERE {
?class rdf:type owl:Class ;
rdfs:label ?label .
FILTER ( lang(?label) = "fr" )
}

#

SELECT \*
WHERE {
food:tomato ?link ?subject .
OPTIONAL {
?subject rdfs:label ?label.
}
OPTIONAL {
?link rdfs:label $linkLabel
}
filter ( !bound(?label) || lang(?label) = 'fr' )
filter ( !bound(?linkLabel) || lang(?linkLabel) = 'fr' )
filter (isLiteral(?subject) || isLiteral(?label))
}

VOIR LA REQUETE

PROPOSTION DE REPAS QUEL GENRE REPAS CASE A COCHER POUR LES REPAS
LES REPAS ET LES PLATS QUI SONT CONSOMMES DANS LES REGIONS

REGIME ON CONSEILLE TAPE DIABETE REGIME CONSEILLER A SUIVRE L'UTILISATEUER
TELECHARGER LE FICHIER

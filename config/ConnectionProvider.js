/** @format */

const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client');
require('dotenv').config();

const DEFAULT_PREFIXES = [
  EnapsoGraphDBClient.PREFIX_OWL,
  EnapsoGraphDBClient.PREFIX_RDF,
  EnapsoGraphDBClient.PREFIX_RDFS,
  EnapsoGraphDBClient.PREFIX_XSD,
  EnapsoGraphDBClient.PREFIX_PROTONS,

  {
    prefix: process.env.GRAPHDB_PREFIX,
    iri: process.env.ONTOLOGY_URI,
  },
];

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
  baseURL: process.env.GRAPHDB_BASE_URL,
  repository: process.env.GRAPHDB_REPOSITORY,
  prefixes: DEFAULT_PREFIXES,
  transform: 'JSON',
});

module.exports = { graphDBEndpoint };

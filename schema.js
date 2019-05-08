const axios = require('axios');
const PokedexAPI = require('pokedex-promise-v2');

const pokedex = new PokedexAPI();

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql');

// helper method to get Pokemon Image by id
const getPokemonImageById = (id) => {
  return `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png`;
};

// Pokedex Type
const PokedexType = new GraphQLObjectType({
  name: "Pokedex",
  // api fields
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    pokemon_details: { type: GraphQLList(PokemonDetailsType) },
  }),
});

// PokemonDetails Type
const PokemonDetailsType = new GraphQLObjectType({
  name: "PokemonDetails",
  // api fields
  fields: () => ({
    id: { type: GraphQLInt },
    image: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

// Pokemon Type
const PokemonType = new GraphQLObjectType({
  name: "Pokemon",
  fields: () => ({
    id: { type: GraphQLInt },
    height: { type: GraphQLInt },
    name: { type: GraphQLString },
    species: { type: PokemonSpeciesType },
    sprites: { type: PokemonSpriteType },
    stats: { type: GraphQLList(PokemonStatsType) },
    types: { type: GraphQLList(PokemonTypesType) },
    weight: { type: GraphQLInt },
  }),
});

// PokemonSpecies Type
const PokemonSpeciesType = new GraphQLObjectType({
  name: "PokemonSpecies",
  fields: () => ({
    id: { type: GraphQLInt },
    capture_rate: { type: GraphQLInt },
    gender_rate: { type: GraphQLInt },
    hatch_counter: { type: GraphQLInt },
    name: { type: GraphQLString },
  }),
});

// PokemonSprite Type
const PokemonSpriteType = new GraphQLObjectType({
  name: "PokemonSprite",
  fields: () => ({
    back_default: { type: GraphQLString },
    back_female: { type: GraphQLString },
    back_shiny: { type: GraphQLString },
    back_shiny_female: { type: GraphQLString },
    front_default: { type: GraphQLString },
    front_female: { type: GraphQLString },
    front_shiny: { type: GraphQLString },
    front_shiny_female: { type: GraphQLString },
  }),
});

// PokemonStats Type
const PokemonStatsType = new GraphQLObjectType({
  name: "PokemonStats",
  fields: () => ({
    base_stat: { type: GraphQLInt },
    stat: { type: StatObjectType },
  }),
});

const StatObjectType = new GraphQLObjectType({
  name: "StatObject",
  fields: () => ({
    name: { type: GraphQLString },
  }),
});

// PokemonTypes Type
const PokemonTypesType = new GraphQLObjectType({
  name: "PokemonTypes",
  fields: () => ({
    type: { type: PokemonTypeType },
  }),
});

const PokemonTypeType = new GraphQLObjectType({
  name: "PokemonType",
  fields: () => ({
    name: { type: GraphQLString },
  }),
});

// Root Query - request interface
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    pokemons: {
      type: PokedexType,
      resolve(parentValue, args) {
        return pokedex
          .getPokedexByName("kanto")
          .then(data => {
            // merge pokemon_entries, and pokemon species into one object (pokemon_details)
            const { pokemon_entries } = data;
            const pokemon_details = pokemon_entries.map((entry) => {
              const {
                entry_number: id = "",
                pokemon_species: {
                  name = "",
                }
              } = entry;

              const newEntry = {
                id,
                name,
              };

              newEntry.image = getPokemonImageById(id);

              return newEntry;
            });

            // add pokemon details to response data
            data.pokemon_details = pokemon_details;

            return data;
          });
      }
    },
    pokemon: {
      type: PokemonType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        const { name } = args;
        return pokedex
          .getPokemonByName(name)
          .then(pokemon => {
            // get pokemon name
            let { name } = pokemon;

            // request additional resources
            return pokedex
              .getPokemonSpeciesByName(name)
              .then(function(species) {
                pokemon.species = species;
                return pokemon;
              });
          })
      },
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
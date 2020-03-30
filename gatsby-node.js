const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(
    `
    query MyQuery {
      allPokemonJson {
        nodes {
          id
          name {
            english
          }
          type
          base {
            HP
            Attack
            Defense
            SpecialAttack
            SpecialDefense
            Speed
          }
        }
      }
    }
        `
  )

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const pokemonTemplate = path.resolve(`src/templates/pokemon.js`)
  result.data.allPokemonJson.nodes.forEach((node) => {
    const path = node.name.english.toLowerCase()
    createPage({
      path,
      component: pokemonTemplate,
      context: {
        pagePath: path,
        ...node,
      },
    })
  })
}

const { createFileSystem } = 'gatsby-source-filesystem'
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.interval.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

async function getPageData(graphql) {
  return await graphql(`
    {
      blogPosts: allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
}

const path = require('path')
exports.createPages = async ({ graphql, actions }) => {
  const { data } = await getPageData(graphql)
  data.blogPosts.edges.forEach(({ node }) => {
    const { slug } = node.fields
    actions.createPage({
      path: `/blog/${slug}`,
    })
  })
}

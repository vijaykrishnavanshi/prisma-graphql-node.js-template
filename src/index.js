const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')
const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote,
  };

  const logInput = async (resolve, root, args, context, info) => {
    console.log(`1. logInput: ${JSON.stringify(args)}`)
    console.log(`1. logInput: ${JSON.stringify(root)}`)
    const result = await resolve(root, args, context, info)
    console.log(`5. logInput`)
    return result
  }
  
  const logResult = async (resolve, root, args, context, info) => {
    console.log(`2. logResult`)
    const result = await resolve(root, args, context, info)
    console.log(`4. logResult: ${JSON.stringify(result)}`)
    return result
  }

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
  middlewares: [logInput, logResult],
})

server.start(() => console.log(`Server is running on http://localhost:4000`));

const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
// 1
let idCount = links.length
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links();
        },
        link: (parent, args) => links.find(elem => elem.id === args.id),
    },
    Mutation: {
        // 2
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
        updateLink: (parent, args, context) => {
            return context.prisma.updateLink({
                data: {
                    url: args.url,
                    description: args.description,
                },
                where: {
                    id: args.id,
                }
            })
        },
        deleteLink: (parent, args, context) => {
            return context.prisma.deleteLink({
                where: {
                    id: args.id,
                },
            })
        }
    },
};

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

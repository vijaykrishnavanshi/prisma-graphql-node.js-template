const { GraphQLServer } = require('graphql-yoga')
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
        feed: () => links,
        link: (parent, args) => links.find(elem => elem.id === args.id),
    },
    Mutation: {
        // 2
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        update: (parent, args) => {
            const link = links.find(elem => elem.id === args.id);
            if (args.url) {
                link.url = args.url;
            }
            if (args.description) {
                link.description = args.description;
            }
            return link
        },
        delete: (parent, args) => {
            const link = links.find(elem => elem.id === args.id);
            links = links.filter(elem => elem.id !== args.id);
            return link
        }
    },
};

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));

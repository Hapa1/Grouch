const graphql = require('graphql');
const _ = require('lodash');
const Container = require('../models/container')

const { 
    GraphQLFloat,
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull //ensures values arent null
} = graphql //es6 destructuring

const DataType = new GraphQLObjectType({
    name: 'Data',
    fields: () => ({
        id: { type: GraphQLString},
        timeStamp: { type: GraphQLString},
        wasteLevel: { type: GraphQLInt},
    })
})

const ContainerType = new GraphQLObjectType({
    name: 'Container',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        type: { type: GraphQLString},
        description: { type: GraphQLString},
        address: { type: GraphQLString},
        city: { type: GraphQLString},
        level: { type: GraphQLInt},
        lat: { type: GraphQLFloat},
        lng: { type: GraphQLFloat},
        imgUrl: { type: GraphQLString},
        wasteLevels: { 
            type: GraphQLList(GraphQLInt)
        },
        wasteTimes: { 
            type: GraphQLList(GraphQLString)
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        container: {
            type: ContainerType, //type of data we are looking for 
            args: {id: { type: GraphQLID}}, //pass argument for certain book 
            resolve(parent, args){  //code to get data from db
                return Container.findById(args.id) //query!!!
            }
        },
        containers: {
            type: new GraphQLList(ContainerType),
            resolve(parent, args){
                return Container.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({ 
    query: RootQuery, //determine which query users can use from frontend 
})
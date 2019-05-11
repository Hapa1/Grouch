const graphql = require('graphql');
const _ = require('lodash');
const Container = require('../models/container')
var moment = require('moment')

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
        ctype: { type: GraphQLString},
        description: { type: GraphQLString},
        address: { type: GraphQLString},
        city: { type: GraphQLString},
        level: { type: GraphQLFloat},
        lat: { type: GraphQLFloat},
        lng: { type: GraphQLFloat},
        imgUrl: { type: GraphQLString},
        wasteLevels: { 
            type: GraphQLList(GraphQLFloat)
        },
        wasteTimes: { 
            type: GraphQLList(GraphQLString)
        },
        emptyLevel: { type: GraphQLFloat}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        container: {
            type: ContainerType, //type of data we are looking for 
            args: {id: { type: GraphQLID}}, //pass argument for certain book 
            resolve(parent, args){  //code to get data from db
                console.log("queried", args.id)
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

var r1 = Math.floor(Math.random() * 100);
var r2 = .0001 * Math.floor(Math.random() * 100);
var r3 = .0001 * Math.floor(Math.random() * 100);
var data = []
var levels = []
var times = []
var r = 0
var rando = Math.floor(Math.random() * 6) + 1;
for (var i = 0; i < 24; i++){
    
    var r = r + Math.floor(Math.random() * rando) + 1;
    var time = moment().add(i, 'hours').format("YYYY-MM-DD HH:mm:ss")
    //var waste = {
    //    timeStamp: time,
    //    wasteLevel: r
    //}
    //data.push(waste)
    times.push(time)
    console.log(time)
    levels.push(r)
}

console.log(levels)

const Mutation = new GraphQLObjectType({ //Create and update 
    name: 'Mutation',
    fields: {
        deleteContainer: {
            type: ContainerType,
            args: {
                _id: {type: new GraphQLNonNull(GraphQLID)},
                
            },
            resolve(parent, args){
                return Container.findByIdAndRemove(args._id)
            }
        },
        updateContainer: {
            type: ContainerType,
            args: {
                _id: {type: new GraphQLNonNull(GraphQLID)},
                level: {type: GraphQLInt}
            },
            resolve(parent, args){
                
                Container.update({_id: args._id}, {
                    $push: {wasteLevels: args.level, wasteTimes: moment().format("YYYY-MM-DD HH:mm:ss")},
                }).then(c => {
                    
                    console.log(Container);
                    return c
                }).catch(err => {
                    console.log(err);
                })
               
            }

        },
        addContainer: {
            type: ContainerType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                type: {type: new GraphQLNonNull(GraphQLString)},
                ctype: {type: new GraphQLNonNull(GraphQLString)},
                id: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLString},
                address: {type: GraphQLString},
                city: {type: GraphQLString},
                lat: { type: GraphQLFloat},
                lng: { type: GraphQLFloat},
                emptyLevel: { type: GraphQLFloat}
            },
            resolve(parent, args){//store in database 
                console.log("type", args.ctype)
                var url = ""
                if (args.ctype == "Large bin"){
                    url = 'https://s3-us-west-1.amazonaws.com/lootbox1/public/medium.png'
                }
                if (args.ctype == "Medium Can"){
                    url = 'https://s3-us-west-1.amazonaws.com/lootbox1/public/Large.png'
                }
                if (args.ctype == "Small Container"){
                    url = 'https://s3-us-west-1.amazonaws.com/lootbox1/public/Small.png'
                }
                else {
                    url = 'https://s3-us-west-1.amazonaws.com/lootbox1/public/medium.png'
                }
                console.log("url", url)
                let container = new Container({ //Mongoose 
                    name: args.name,
                    ctype: args.ctype,
                    type: args.type,
                    description: args.description,
                    address: args.address,
                    city: args.city,
                    lat: args.lat,
                    lng: args.lng,
                    wasteLevels: levels,
                    wasteTimes: times,
                    imgUrl: url,
                    emptyLevel: 100,
                });
                console.log(args.ctype)
                console.log(container)
                return container.save();
                
            }
        },
    }
});

module.exports = new GraphQLSchema({ 
    query: RootQuery, //determine which query users can use from frontend 
    mutation: Mutation
})
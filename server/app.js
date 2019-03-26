const express = require('express');
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const keys = require('../config/keys');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');

console.log("URI",keys.mongoURI)

app.use(cors());

mongoose.connect(keys.mongoURI);

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
})
app.use('/graphql',graphqlHTTP({
    schema, //schema: schema
    graphiql: true
}));

app.listen(5000, () => {
    console.log("Server online at port 5000")
})
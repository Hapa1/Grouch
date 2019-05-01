const express = require('express');
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const keys = require('../config/keys');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');
var router = express.Router();

console.log("URI",keys.mongoURI)

app.use(cors());

//mongoose.connect(keys.mongoURI);
//mongoose.connect('mongodb://root:secretword123@ds012889.mlab.com:12889/grouch-dev')
mongoose.connect('mongodb://root:secretword123@ds149806.mlab.com:49806/grouch-test')

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
})
app.use('/graphql',graphqlHTTP({
    schema, //schema: schema
    graphiql: true
}));

app.use('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


app.listen(8080, () => {
    console.log("Server online at port 5000")
})
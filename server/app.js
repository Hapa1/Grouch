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
    schema, //schema: schema --> schema
    graphiql: true
}));

if (process.env.NODE_ENV === 'production') {
    //Express will server up production assets
    //like main.js file, or main.css
  
    app.use(express.static('../client/build'));
  
    //Express will serve up the index.html file if
    //it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  
  }

  const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server online at port: "+PORT)
})
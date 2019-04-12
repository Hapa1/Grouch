const Container = require('../models/container')
var mongoose = require('mongoose');
var keys = require('../../config/keys');
var moment = require('moment')
mongoose.connect(keys.mongoURI);
mongoose.Promise = global.Promise;


for (var i = 0; i < 3; i++){
    var r1 = Math.floor(Math.random() * 100);
    var r2 = .0001 * Math.floor(Math.random() * 100);
    var r3 = .0001 * Math.floor(Math.random() * 100);
    var data = []
    var levels = []
    var times = []
    var r = 0
    //var today = new Date()
    for (var i = 0; i < 24; i++){
        var r = r + Math.floor(Math.random() * 5) + 1;
        var time = moment().add(i, 'hours').format()
        //var waste = {
        //    timeStamp: time,
        //    wasteLevel: r
        //}
        //data.push(waste)
        times.push(time)
        console.log(time)
        levels.push(r)
    }
    c = new Container({
        name: "Test" + r1,
        type: "Recyclables",
        description: "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum",
        address: "123 Lorem Ipsum St.",
        city: "San Jose CA",
        level: r1,
        lat: 37.336 + r2,
        lng: -121.89 + r3,
        wasteLevels: levels,
        wasteTimes: times
    })
    c.save()
}

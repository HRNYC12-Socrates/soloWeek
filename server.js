const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const bodyParser = require('body-parser')
const db = require('./db/index.jsx')
const fileUpload = require('express-fileupload')
const btoa = require('btoa')
app.use(bodyParser.json())
app.use(fileUpload())
 
const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + '/www'));
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.post('/server/pic', (req, res) => {
  db.Photos.findOrCreate({where : {user: req.body.user , pic: req.files.image.data}}).then((data) => {
    console.log('heyyyaaaa ', data)
    res.send('finished')
  })
})

app.post('/server/userLogIn', (req, res) => {
  console.log('lets check if req worked', req.body)
  db.User.find({where : {username: req.body.username, password: req.body.password}}).then((data) => {
    // console.log('this is the data RIGHT HERE', data.dataValues)
    if(data){
      res.send(data.dataValues)
    } else{
      res.send('null')
    }
  })
  //this is where we check our user LogIn and send either a redirect to the user page, send them to signup, or tell them wrong password
  //send response.redirect
})

app.post('/server/goals', (req, res) => {
  console.log('inside server goals', req.body)
  req.body[1] = req.body[1].slice(1)
  db.User.update({goals: JSON.stringify(req.body[1])}, {where: {id: req.body[0]}}).then(() =>{
    console.log('should be in there now!')
    res.send()
  })
})

app.post('/server/signup', (req, res) => {
  db.User.findOrCreate({where: {username:req.body.username, password:req.body.password}}).then((data) =>{
    console.log(data)
    res.send(data[1])
  })
})

app.post('/server/todaysWorkout', (req, res) => {
  console.log('req.body', req.body)
  db.Week.find({where: {user: req.body.user}}).then((data) => {
    var workout = data.dataValues[req.body.day]
    db.Workout.find({where: {id: workout}}).then((data) => {
      console.log('did we find the shoulder workout : ', data.dataValues)
      var load = {
        name: data.dataValues.name,
        payload: JSON.parse(data.dataValues.payload)
      }
      res.send(load)
    })
  })
})

app.post('/server/photoRequest', (req, res) => {
  console.log('hiya3')
  db.Photos.findAll({where : {user: req.body.user}}).then((data) => {
    console.log(data)
    res.send(data)
  })
})


app.post('/server/saveWeek', (req, res) => {
  //NEED TO BUILD THIS TO HANDLE ARRAYS
  db.Week.find({where:{user: req.body.user}}).then((data) =>{
    if(data){
  db.Week.update({
    monday: Number(req.body.monday), 
    tuesday: Number(req.body.tuesday), 
    wednesday: Number(req.body.wednesday),
    thursday: Number(req.body.thursday),
    friday: Number(req.body.friday),
    saturday: Number(req.body.saturday),
    sunday: Number(req.body.sunday)
  }, {where: {user: Number(req.body.user)}}).then(() => {
    res.send()
  })
    } else{
        db.Week.create({
    user : Number(req.body.user),
    monday: Number(req.body.monday), 
    tuesday: Number(req.body.tuesday), 
    wednesday: Number(req.body.wednesday),
    thursday: Number(req.body.thursday),
    friday: Number(req.body.friday),
    saturday: Number(req.body.saturday),
    sunday: Number(req.body.sunday)
  }).then(() => {
    res.send()
  })
    }
  })
  res.send()
})

app.get('/test', (req, res) => {
  console.log('inside test')
  var work = {
    Relax : {
      sets: 0,
      reps: '1 min on, 30 Secs off',
    }
  }

  var work = JSON.stringify(work)
  db.Workout.findOrCreate({where: {name: 'Rest Day', payload: work}})
  res.status(200).end('done')
})

app.get('/testBack', (req, res) => {
  db.DailyLog.find({where:{user : 1}}).then((result) =>{
    result.workout = JSON.parse(result.workout)
    res.send(result)
  })
})

app.post('/server/measure', (req, res) => {
  console.log(req.body.user, 'inside server measure', typeof req.body.user)
  var user = req.body.user
  db.User.find({where:{id: user}}).then((data) => {
    var dateStr = (data.dataValues.createdAt).toString()
    var diff = Math.abs(new Date() - new Date(dateStr.replace(/-/g,'/')));
    var seconds = diff/1000
    var mins = seconds/60
    var hours = mins/60
    var days = (hours/24).toFixed(2)

    db.Measurements.findOrCreate({where: {userId: user, daySince: days, payload: JSON.stringify(req.body.payload)}}).then(() => {
      res.send()
    })


  })
})

app.post('/server/graphData', (req, res) => {
  db.Measurements.findAll({where:{userId: req.body.user}}).then((data) => {
    console.log('data', data)
    res.send(data)
  })
})

app.get('/testDif', (req, res) => {

  db.User.find({where:{id: 1}}).then((data) => {
    var dateStr = (data.dataValues.createdAt).toString()
    var diff = Math.abs(new Date() - new Date(dateStr.replace(/-/g,'/')));
    var seconds = diff/1000
    var mins = seconds/60
    var hours = mins/60
    var days = hours/24
    console.log('SERVER SIDE test', dateStr, diff, 'testing days, hours: ', days, hours)
    res.send(days.toString())
  })
})

   app.set('port', process.env.PORT || 3000)

  const server = app.listen(app.get('port'))
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
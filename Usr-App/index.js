var express = require ( 'express' )
var fs = require ( 'fs' )
var bodyParser = require ( 'body-parser' )
var jf = require ( 'jf' )
var jade = require('jade');

var app = express ( )

app.set ( 'views', '.' )
app.set( 'view engine', 'jade' )

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get ( '/', function ( request, response ) {
  fs.readFile ( './users.json', function(error, filedata ) {
    if ( error ) {
      throw error;
    }

    var parsedData = JSON.parse ( filedata )
    console.log ( parsedData )
    response.render ( "users", {
      users : parsedData
    } )
  } )
} )

app.get ( '/new', function ( request, response ) { 
  response.render ( "createuser", {
  } )
} )

app.post ( '/new', function ( request, response ) {
  var newuser = request.body
  var userList = fs.readFileSync ( './users.json' )
  var users = JSON.parse ( userList )
  users.push ( newuser )
  var userJSON = JSON.stringify ( users )
  fs.writeFileSync ( './users.json', userJSON )
  response.redirect ( '/' )
} )

app.get ( '/search', function ( request, response ) { 
  response.render ( "search", {
  } )
} )

app.post( '/api', function ( request, response ) {
  var srch = request.body.search
  var userList = fs.readFileSync ( './users.json' )
  var parsedData = JSON.parse ( userList )
  var matchArray = []
  for (var i = 0; i < srch.length; i++) {
    for (var j = 0; j < parsedData.length; j++) {
      for (var k = 0; k < parsedData[j].firstname.length; k++) {
        if (srch[i] == parsedData[j].firstname[i]) {
          var firstnamematch = parsedData[j].firstname 
          matchArray.push ( firstnamematch )
        }
      }
      for (var l = 0; l < parsedData[j].lastname.length; l++) {
        if (srch[i] == parsedData[j].lastname[i]) {
          var lastnamematch = parsedData[j].lastname 
          matchArray.push ( lastnamematch )
        }
      }
    }
  }
  response.send ( matchArray )
})


app.post ( '/search', function ( request, response ) { 
  var search = request.body.name
  var userList = fs.readFileSync ( './users.json' )
  var users = JSON.parse ( userList )
  var results = []
  console.log(search)
  for (var i = 0; i < users.length; i++) {
    if (search == users[i].firstname) {
      console.log("User " + search + " has been found.")
      results.push(users[i].firstname, users[i].lastname, users[i].email)
    } 
    else if (search == users[i].lastname) {
      console.log("User " + search + " has been found.")
      results.push(users[i].firstname, users[i].lastname, users[i].email)
    } 
  }
  response.send("Search Completed: " + "<br>" + results[0] + " " + results[1] + " " + results[2])
} )

var server = app.listen ( 3000, function ( ) {
  console.log ( 'User App listening on port: ' + server.address ( ).port );
} )
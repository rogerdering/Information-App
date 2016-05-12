var express = require ( 'express' )
var fs = require ( 'fs' )
var bodyParser = require ( 'body-parser' )
var jf = require ( 'jf' )
var jade = require('jade');

var app = express ( )

app.set ( 'views', '.' )
app.set( 'view engine', 'jade' )

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
  response.send("Search Completed: " + "<br>" + results)
} )

var server = app.listen ( 3000, function ( ) {
  console.log ( 'User App listening on port: ' + server.address ( ).port );
} )
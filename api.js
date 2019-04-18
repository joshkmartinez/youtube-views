var express = require('express')
var app = express()
const api = express.Router()
var http = require('https')
let x = 'incorrect video id'
//need to ad promise to method
function pullVid(id) {
  var options = {
    method: 'GET',
    hostname: 'www.googleapis.com',
    port: null,
    path:
      '/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=' +
      id +
      '&key=AIzaSyDY2V6mD-_JtXUZrj3gKQkt0TdUFlUIXV8',
    headers: {
      'content-length': '0'
    }
  }

  var req = http.request(options, function(res) {
    var chunks = []
    res.on('data', function(chunk) {
      chunks.push(chunk)
    })

    res.on('end', function() {
      var body = Buffer.concat(chunks)
      let c = JSON.parse(body).items[0].statistics.viewCount
      //console.log(c)
      x = c
    })
  })

  req.end()
}
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

api.get('/rick', (req, res) => {
  res.writeHead(302, {
    Location: 'https://rickroll.now.sh'
  })
  res.end()
})

api.get('/:param', (req, res) => {
  pullVid(req.params.param)
  res.send(x)
  //res.sendFile('./save.txt', { root: __dirname })
  //save('') //save nothing so number isnt messed up
  x = 'incorrect video id'
})

api.get('/', (req, res) => {
  res.send(
    `
Put the youtube video id after / find how many views it has

eg.
  ytv.now.sh/dQw4w9WgXcQ
  ytv.now.sh/jeg_TJvkSjg

github.com/joshkmartinez/youtube-views
    `
  )
})
app.use('/', api)
app.listen(3000, () => {
  //console.log('Server running on port 3000')
})

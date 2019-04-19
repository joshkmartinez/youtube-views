var express = require('express')
var app = express()
const api = express.Router()
const axios = require('axios')

async function pull(id) {
  let views = 'incorrect video id'
  await axios
    .get(
      'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=' +
        id +
        '&key=AIzaSyDY2V6mD-_JtXUZrj3gKQkt0TdUFlUIXV8'
    )
    .then(response => {
      views = response.data.items[0].statistics.viewCount
    })
    .catch(error => {
      return 'incorrect video id'
    })
  return views
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

api.get('/:param', async (req, res) => {
  let x = await pull(req.params.param)
  res.send(x)
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

const http = require('http')
const fs = require('fs')
const mimeTypes = {
  'html': 'text/html',
  'svg': 'image/svg+xml',
  'css': 'text/css',
  'js': 'application/javascript',
  'json': 'application/json',
  'txt': 'text/plain',
  'gif': 'image/gif',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'ico': 'image/x-icon'
}
const PORT = 3001
const users = []

const requestHandler = (request, response) => {
    console.log('request.url: ', request.url)
    let pathToFile = './' + request.url

    let headContent = {}
    let indexOfLastSlashInPathToFile = pathToFile.lastIndexOf('/')
    let indexOfLastDotInPathToFile = pathToFile.indexOf('.', indexOfLastSlashInPathToFile)
    if ( indexOfLastDotInPathToFile == -1 ) { // Видимо, это папка
        if ( indexOfLastSlashInPathToFile < pathToFile.length ) { // Не заканчивается слэшем
            pathToFile += '/'
        }
        pathToFile += 'index.html' // Будем искать в ней index.html
        headContent[ 'Content-Type' ] = 'text/html'
    } else {
        let fileExtension = pathToFile.slice(indexOfLastDotInPathToFile + 1)
        if ( mimeTypes[fileExtension] ) {
            headContent[ 'Content-Type' ] = mimeTypes[fileExtension]
        }
    }

    let cookie = request.headers.cookie
    console.log('cookie: ', cookie)

    let userId

    console.log('headContent: ', headContent)
    if ( !cookie || cookie.indexOf('cookieid=test') != -1 ) {
        userId = users.length
        headContent[ 'Set-Cookie' ] = 'cookieId=' + userId
        users[ userId ] = {}
    } else {
        console.log( 'indexOf cookieid=test: ', cookie.indexOf('cookieid=test') )
    }

    let webContent
    let responseCode = 200
    try {
        webContent = fs.readFileSync(pathToFile)
        response.writeHead(responseCode, headContent)
        response.write(webContent)
    } catch (err) {
        // console.log('err: ', err)
        responseCode = 404
        console.error(err)
        response.writeHead(responseCode)
    }

    response.end()
}

const server = http.createServer(requestHandler)
server.listen(PORT)

console.log(`Server has started at http://localhost:${PORT}/`)
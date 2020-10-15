const express = require('express')
const path = require('path')

const port = process.env.PORT || 8080
const app = express()

app.use(express.static(__dirname + '/dist'))

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist/index.html'))
})

app.listen(port)

console.log(`
   _____ _                _    
  / ____| |              | |   
 | |    | |__  _   _  ___| | __
 | |    | '_ \\| | | |/ __| |/ /
 | |____| | | | |_| | (__|   < 
  \\_____|_| |_|\\__,_|\\___|_|\\_\\
  _   _                 _
 | \\ | |               (_)     
 |  \\| | ___  _ __ _ __ _ ___  
 | . \' |/ _ \\| '__| '__| / __| 
 | |\\  | (_) | |  | |  | \\__ \\ 
 |_| \\_|\\___/|_|  |_|  |_|___/ 
`)
console.log(`  is available at\n\n  --  localhost:${port}`)

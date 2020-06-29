const express = require('express')
const server = express()

server.use(express.static('public'))

//utilizando templet engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render('index.html', {title: 'Qualquer coisa'})
})

server.get("/creat-point", (req, res) => {
    return res.render('creat-point.html')
})

server.get("/search", (req, res) => {
    return res.render('search-results.html')
})

server.listen(3000)

//Para iniciar o servidor tem quer dar o comando "npm start"
//Comandos para diretório cd - ls
// ctrl+C -> finaliza o node"
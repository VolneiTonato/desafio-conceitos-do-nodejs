const express = require("express");
const cors = require("cors")
const routes = require("./routes")

const app = express()

app.use(express.json())
app.use(cors())

for (let router of routes) 
  app.use(router.route, router.router)



app.use((err, request, response, next) => {
  const status = err.status || 500
  const message = err.message || 'Erro interno no servidor'
  return response.status(status).send({ message: message })
})

module.exports = app
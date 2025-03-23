const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")


const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({ extended: true }))

server.get("/", function (req, res) {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {
  // Inserir dados na table
  const query = ` 
  INSERT INTO places (
    image, 
    name, 
    address, 
    address2, 
    state, 
    city, 
    items
  ) VALUES (?, ?, ?, ?, ?, ?, ?); `

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(error) {
    if (error) {
      console.log(error)
      return res.send("Erro no cadastro")
    }

    console.log("Cadastrado com sucesso")
    console.log(this)

    return res.render("create-point.html", { saved: true })
  }

  // 2.Inserindo os dados na tabela
  db.run(query, values, afterInsertData)

  console.log(req.body)

})

server.get("/search-results", (req, res) => {

  const search = req.query.search

  if (search == "") {
    return res.render("search-results.html", { totalPoints: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (error, rows) {
    if (error) {
      return console.log(error)
    }
    console.log("Aqui estão os seus registros")
    console.log(rows)

    const totalPoints = rows.length

    return res.render("search-results.html", { places: rows, totalPoints })
  })
})

server.listen(3333)

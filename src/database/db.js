const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// db.serialize(() => {

//   // Criar uma tabela
//   db.run(` 
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       address TEXT,
//       adress2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `)

//   // Inserir dados na table
//   const query = ` 
//   INSERT INTO places (
//     image, 
//     name, 
//     address, 
//     adress2, 
//     state, 
//     city, 
//     items
//   ) VALUES (?, ?, ?, ?, ?, ?, ?); `

//   const values = [
//     "http://localhost:3000/assets/paperside.png",
//     "Rio do Sul, Santa Catarina",
//     "Guilherme Geballa, Jadrim América",
//     "Nº 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Resíduos Eletrônicos, Lâmpadas"
//   ]

//   function afterInsertData(error) {
//     if (error) {
//       return console.log(error)
//     }

//     console.log("Cadastrado com sucesso")
//     console.log(this)
//   }

//   // 2.Inserindo os dados na tabela
//   db.run(query, values, afterInsertData) 

//   // 3. Consultar os dados da tabela
//   db.all(`SELECT * FROM PLACES`, function (error, rows) {
//     if (error) {
//       return console.log(error)
//     }
//     console.log("Aqui estão seus registros: ")
//     console.log(rows)
//   })

//   // 4. Deletar dados da tabela
//   // db.run(`DELETE FROM places WHERE id = ?`, [1], function (error) {
//   //   if (error) {
//   //     return console.log(error)
//   //   }
//   //   console.log("Registro deletado com sucesso")
//   // })

// })


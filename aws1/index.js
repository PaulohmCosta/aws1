const express = require("express");
const bodyParser = require("body-parser");

const { pool } = require("./db");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/users", async (req, res) => {
  try {
    const queryAllUsers = await pool.query(
      "SELECT * FROM users ORDER BY id ASC"
    );

    if (queryAllUsers.rows.length) {
      return res.status(200).send(queryAllUsers.rows);
    }
  } catch (error) {
    console.error("Usuários não encontrados");

    return res.status(400).send("Usuários não encontrados");
  }
});

app.get("/books", async (req, res) => {
  try {
    const queryAllBooks = await pool.query(
      `
      select b.id, b.name as book_name, b.isbn, b.publish_date, p.name as publisher_name, a.id as author_id, u.email from books b
      inner join publishers p on b.publishers = p.id
      inner join authors a on b.authors = a.id
      inner join users u on a.user_id = u.id
      `
    );

    if (queryAllBooks.rows.length) {
      return res.status(200).send(queryAllBooks.rows);
    }
    
    return res.status(200).send([]);
  } catch (error) {
    console.error("Livros não encontrados");

    return res.status(400).send("Livros não encontrados");
  }
});

app.post("/books/search", async (req, res) => {
    try {
        const book_name = req.body.book_name;

        if (!book_name) throw new Error('Inserir o nome do livro a ser pesquisado');

        const books = await pool.query(`select * from books where name like '${book_name}'`);

        if (books.rows.length) {
            return res.status(200).send(books.rows);
        }

        return res.status(200).send([]);
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

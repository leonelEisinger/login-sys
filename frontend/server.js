const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new Client({
    host: "localhost",
    user: "postgres",
    password: "123",
    database: "login-system",
    port: "5432"
});

app.post('/login', async (req, res) => {
    const sql = "SELECT * FROM users WHERE email = $1 AND password = $2";
    //console.log('Recebido no body:', req.body);

    try {
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        //if(err) return res.json("Error");

        if(data.length > 0) {
            return res.json("Login Successul!")
        } else {
            return res.json("Email or Password is may be wrong")
        }
    })
    } catch {
        console.error("Erro na query:", err);
        res.status(500).json({ error: "Erro no banco de dados" });
    }
})

app.listen(8081, () =>{
    console.log("Listening....")
})
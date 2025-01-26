const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sistema_usuarios"
});

db.connect((err) => {
    if (err) {
        console.error("Error en la conexión de la base de datos:", err);
        process.exit(1);
    }
    console.log("Conectado a la base de datos.");
});

module.exports = db;

const express = require('express');
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./config/db");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const PORT =  8000;
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
    response.send(" Servidor activo");
});

app.post("/register", async (req, res) => {
    const { nss, contrasena, nombre_completo, telefono, edad } = req.body;

    try {
        // Validar que los datos estén completos
        if (!nss || !contrasena || !nombre_completo || !telefono || !edad) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        // Validar longitud del NSS (debería ser 11 caracteres)
        if (nss.length !== 11) {
            return res.status(400).json({ error: "El NSS debe tener exactamente 11 caracteres" });
        }

        // Validar formato de teléfono (opcional)
        const telefonoRegex = /^[0-9]{10,15}$/;
        if (!telefonoRegex.test(telefono)) {
            return res.status(400).json({ error: "El teléfono debe contener entre 10 y 15 dígitos" });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Insertar el paciente en la base de datos
        const sql = `
            INSERT INTO pacientes (nss, contrasena, nombre_completo, telefono, edad) 
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(sql, [nss, hashedPassword, nombre_completo, telefono, edad], (err, result) => {
            if (err) {
                console.error("Error al registrar el paciente:", err);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ error: "El NSS o el teléfono ya están registrados" });
                }
                return res.status(500).json({ error: "Error al registrar el paciente" });
            }

            // Responder con éxito
            res.status(201).json({ message: "Paciente registrado exitosamente" });
        });
    } catch (error) {
        console.error("Error inesperado en el servidor:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});
app.post("/login", async (req, res) => {
    const { nss, contrasena } = req.body;

    try {
        if (!nss || !contrasena) {
            return res.status(400).json({ error: "El NSS y la contraseña son obligatorios" });
        }

        console.log("Datos recibidos desde el frontend:", { nss, contrasena });

        const sql = "SELECT * FROM pacientes WHERE nss = ?";
        db.query(sql, [nss], async (err, results) => {
            if (err) {
                console.error("Error al buscar usuario en la base de datos:", err);
                return res.status(500).json({ error: "Error del servidor" });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: "Usuario no encontrado" });
            }

            const user = results[0];
            const validPassword = await bcrypt.compare(contrasena, user.contrasena);

            if (!validPassword) {
                return res.status(401).json({ error: "Contraseña incorrecta" });
            }

            res.json({
                message: "Inicio de sesión exitoso",
                nombre_completo: user.nombre_completo,
            });
        });
    } catch (error) {
        console.error("Error inesperado en el servidor:", error);
        res.status(500).json({ error: "Error inesperado en el servidor" });
    }
});




app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

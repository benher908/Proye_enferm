const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const SECRET_KEY = "secreto_super_seguro";

const login = async (req, res) => {
    const { usuario, contrasena, token } = req.body;

    const sql = "SELECT * FROM usuarios WHERE telefono = ?";
    db.query(sql, [usuario], async (err, results) => {
        if (err) return res.status(500).json({ error: "Error del servidor" });
        if (results.length === 0) return res.status(401).json({ error: "Usuario no encontrado" });

        const user = results[0];
        const validPassword = await bcrypt.compare(contrasena, user.contrasena);
        if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

        if (user.rol === "jefe" && token !== "TOKEN_ADMIN_SEGURO") {
            return res.status(403).json({ error: "Token de administrador incorrecto" });
        }

        const accessToken = jwt.sign({ id: user.id, rol: user.rol }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: "Login exitoso", token: accessToken, nombre: user.nombre });
    });
};

const register = async (req, res) => {
  const { nombre, usuario, contrasena } = req.body;

  try {
      // Validar que los datos estén completos
      if (!nombre || !usuario || !contrasena) {
          return res.status(400).json({ error: "Todos los campos son obligatorios" });
      }

      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      // Insertar el usuario en la base de datos
      const sql = "INSERT INTO usuarios (nombre, telefono, contrasena, rol) VALUES (?, ?, ?, 'usuario')";
      db.query(sql, [nombre, usuario, hashedPassword], (err, result) => {
          if (err) {
              console.error("Error al registrar el usuario:", err);
              return res.status(500).json({ error: "Error al registrar el usuario" });
          }
          res.status(201).json({ message: "Usuario registrado exitosamente" });
      });
  } catch (error) {
      console.error("Error en el servidor:", error);
      res.status(500).json({ error: "Error en el servidor" });
  }
};


module.exports = { login, register };

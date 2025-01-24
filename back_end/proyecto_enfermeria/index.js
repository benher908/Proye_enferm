const express = require('express');

const app = express();

const PORT = 8000;

app.listen(
    PORT,
    () => console.log(`Corriendo en http://localhost:${PORT}`)
)
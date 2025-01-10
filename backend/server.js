const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Configurazione database SQLite3
const db = new sqlite3.Database("./fantavolle.db", (err) => {
    if (err) {
        console.error("Errore nell'apertura del database:", err.message);
    } else {
        console.log("Connessione al database SQLite3 stabilita.");
        db.run(`CREATE TABLE IF NOT EXISTS punteggi (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            squadra1 TEXT NOT NULL,
            punteggio1 INTEGER NOT NULL,
            squadra2 TEXT NOT NULL,
            punteggio2 INTEGER NOT NULL,
            data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// Endpoint per ottenere tutti i punteggi
app.get("/api/punteggi", (req, res) => {
    db.all("SELECT * FROM punteggi", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Endpoint per aggiungere un nuovo punteggio
app.post("/api/punteggi", (req, res) => {
    const { squadra1, punteggio1, squadra2, punteggio2 } = req.body;
    if (!squadra1 || !squadra2 || punteggio1 === undefined || punteggio2 === undefined) {
        return res.status(400).json({ error: "Tutti i campi sono obbligatori." });
    }

    const query = `INSERT INTO punteggi (squadra1, punteggio1, squadra2, punteggio2) VALUES (?, ?, ?, ?)`;
    db.run(query, [squadra1, punteggio1, squadra2, punteggio2], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ id: this.lastID });
        }
    });
});

// Endpoint per eliminare un punteggio
app.delete("/api/punteggi/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM punteggi WHERE id = ?`;
    db.run(query, [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: "Punteggio non trovato." });
        } else {
            res.json({ success: true });
        }
    });
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`Server avviato su http://localhost:${PORT}`);
});

# FantaVolley Backend

Questo è il backend per il progetto FantaVolley. Utilizza Express.js come server e SQLite3 come database.

## Requisiti

- Node.js installato sul tuo sistema

## Installazione

1. Naviga nella directory `backend`:
   ```bash
   cd backend
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Avvia il server:
   ```bash
   npm start
   ```

Il server sarà in esecuzione su `http://localhost:3000`.

## API Endpoints

### 1. Recuperare tutti i punteggi
**GET** `/api/punteggi`

### 2. Aggiungere un punteggio
**POST** `/api/punteggi`  
Richiede un corpo JSON:
```json
{
  "squadra1": "Nome Squadra 1",
  "punteggio1": 25,
  "squadra2": "Nome Squadra 2",
  "punteggio2": 20
}
```

### 3. Eliminare un punteggio
**DELETE** `/api/punteggi/:id`


const form = document.getElementById("punteggio-form");
const punteggiList = document.getElementById("punteggi-list");

// Funzione per aggiungere una riga nella tabella
function aggiungiRiga(punteggio) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${punteggio.id}</td>
        <td>${punteggio.squadra1}</td>
        <td>${punteggio.punteggio1}</td>
        <td>${punteggio.squadra2}</td>
        <td>${punteggio.punteggio2}</td>
        <td>${new Date(punteggio.data).toLocaleString()}</td>
        <td><button class="delete-btn" data-id="${punteggio.id}">Elimina</button></td>
    `;
    punteggiList.appendChild(row);
}

// Funzione per caricare i punteggi dal server
async function caricaPunteggi() {
    const response = await fetch("/api/punteggi");
    const punteggi = await response.json();
    punteggiList.innerHTML = ""; // Svuota la lista
    punteggi.forEach(aggiungiRiga);
}

// Evento per inviare i dati del modulo
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const punteggio = {
        squadra1: form.squadra1.value,
        punteggio1: parseInt(form.punteggio1.value),
        squadra2: form.squadra2.value,
        punteggio2: parseInt(form.punteggio2.value),
    };

    // Invia i dati al server
    const response = await fetch("/api/punteggi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(punteggio),
    });

    if (response.ok) {
        form.reset(); // Resetta il modulo
        caricaPunteggi(); // Aggiorna la lista
    } else {
        alert("Errore durante il salvataggio.");
    }
});

// Evento per eliminare un punteggio
punteggiList.addEventListener("click", async (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const id = event.target.getAttribute("data-id");

        const response = await fetch(`/api/punteggi/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            caricaPunteggi(); // Aggiorna la lista
        } else {
            alert("Errore durante l'eliminazione.");
        }
    }
});

// Carica i punteggi all'avvio
caricaPunteggi();

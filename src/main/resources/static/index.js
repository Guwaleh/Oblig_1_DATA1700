
// Sørger for at alle DOM-elementer JavaScript-koden manipulerer, er lastet først
document.addEventListener("DOMContentLoaded", () => {
    const billetter = [];


    // Funksjon for å kjøpe billetter
    document.getElementById("kjopBillettKnapp").addEventListener("click", () => {
        if (validereInputs()) {             // Knapp blir trykket, sjekker om validateInputs = true -> kjører
            const billett = {       // Pusher values, viser billetter og tilbakestiller inputs
                film: document.getElementById("film").value,
                antall: document.getElementById("antall").value,
                fornavn: document.getElementById("fornavn").value,
                etternavn: document.getElementById("etternavn").value,
                telefon: document.getElementById("telefon").value,
                epost: document.getElementById("epost").value
            };
            billetter.push(billett);
            visBilletter();
            tilbakestillBill();
        }
    });

    function visBilletter() {
        const tbody = document.getElementById('billett_tabell').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Tømmer tabellen før ny oppdatering

        for (let billett of billetter) {        // Iterer først bilettobjektet og oppretter rad, så celler i den opprettede raden
            const row = tbody.insertRow();
            for (let value of Object.values(billett)) {
                const cell = row.insertCell();
                cell.textContent = value;
            }
        }
    }

    // Funksjon for å resette inputfeltene
    function tilbakestillBill() {
        document.getElementById("film").value = "";
        document.getElementById("antall").value = "";
        document.getElementById("fornavn").value = "";
        document.getElementById("etternavn").value = "";
        document.getElementById("telefon").value = "";
        document.getElementById("epost").value = "";
    }

    // Funksjon for validering av inputs
    function validereInputs() {
        const epost = document.getElementById("epost").value;
        const telefon = document.getElementById("telefon").value;
        let valid = true;

        // Resetter feilmeldinger
        document.querySelectorAll(".error").forEach(el => {
            el.textContent = "";
        });

        // Epostvalidering
        if (!epost.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showError("epost", "Vennligst skriv inn en gyldig epostadresse.");
            valid = false;
        }

        // Telefonnummer validering
        if (!telefon.match(/^\d{8}$/)) {
            showError("telefon", "Vennligst skriv inn et gyldig telefonnummer.");
            valid = false;
        }

        // Sjekker om alle feltene er fylt ut
        ["film", "antall", "fornavn", "etternavn", "telefon", "epost"].forEach(id => {
            if (!document.getElementById(id).value) {
                showError(id, "Dette feltet kan ikke være tomt.");
                valid = false;
            }
        });

        return valid;
    }

    // Funksjon for å vise feilmeldinger
    function showError(inputId, message) {
        const errorSpanId = inputId + "Error";
        let errorSpan = document.getElementById(errorSpanId);
        if (!errorSpan) {
            errorSpan = document.createElement("span");
            errorSpan.id = errorSpanId;
            errorSpan.className = "error";
            errorSpan.style.color = "red"; // Setter teksten til rød for feilmeldinger
            const inputElement = document.getElementById(inputId);
            inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
        }
        errorSpan.textContent = message;
    }
});
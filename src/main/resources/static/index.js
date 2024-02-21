// Sørger for at DOM er fullstendig lastet før eventlisteners kan manipulere
document.addEventListener("DOMContentLoaded", () => {
    const billetter = [];


    // Funksjon for å kjøpe billetter
    document.getElementById("kjopBillettKnapp").addEventListener("click", () => {
        if (validereInputs()) {
            // Oppretter billettobjekt og legger til i arrayet
            const billett = {
                film: document.getElementById("film").value,
                antall: document.getElementById("antall").value,
                fornavn: document.getElementById("fornavn").value,
                etternavn: document.getElementById("etternavn").value,
                telefon: document.getElementById("telefon").value,
                epost: document.getElementById("epost").value
            };
            // Viser oppdatert tabell og nullstiller skjema
            billetter.push(billett);
            visBilletter();
            tilbakestillBill();
        }
    });

    document.getElementById("tilbakeStillBill").addEventListener("click", () => {
        billetter.length = 0; // Tømmer billettene
        visBilletter(); // Oppdaterer tabellen for å vise at ingen billetter er tilgjengelige
    });

    function visBilletter() {
        const tbody = document.getElementById('billett_tabell').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Tømmer tabellen før ny oppdatering

        for (let billett of billetter) {     // Iterer først billettobjektet og oppretter rad, så celler i den opprettede raden
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
        const antall = document.getElementById("antall").value;
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
        // Antall-validering
        if (!antall.match(/^[1-9]\d*$/)) {
            showError("antall", "Vennligst skriv inn et gyldig antall billetter");
            valid = false;
        }
        // Sjekker om alle feltene er fylt ut
        ["film", "antall", "fornavn", "etternavn", "telefon", "epost"].forEach(id => {
            if (!document.getElementById(id).value) {
                showError(id, "Dette feltet kan ikke være tomt.");
                valid = false;
            }
        });

        // Funksjon for å vise feilmeldinger. Med inputId fra valideringene over og tilhørende melding
        function showError(inputId, message) {
            const errorSpanId = inputId + "Error";
            let errorSpan = document.getElementById(errorSpanId);
            // Oppretter et nyrr span-element for feilmeldinger
            if (!errorSpan) {
                errorSpan = document.createElement("span");
                errorSpan.id = errorSpanId;
                errorSpan.className = "error";
                errorSpan.style.color = "red"; // Setter teksten til rød for feilmeldinger
                const inputElement = document.getElementById(inputId);
                inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
                // linja over sørger for at feilmeldingen dukker opp riktig sted
            }
            errorSpan.textContent = message;
        }

        return valid;
    }
});
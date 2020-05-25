
# Validation
La validazione è il processo mediante la quale si verificano che i dati che arrivano dall'esterno dell'applicazione siano accettabili.
Occorre quindi creare uno schema di validazione per ogni dato passato dal client.
In breve, è il processo mediante la quale ci si accerta che gli input in arrivo da una chiamata http siano quelli che ci si aspetta che siano.
Se durante il processo di validazione, che avviene all'inizio del lifecycle di una chiamata, avvengono degli errori, non bisogna proseguire e occorre ritornare un errore parlante (senza però troppo dettagli tecnici).
Mediante la valiadazione si controllano comunemente i seguenti aspetti:
- presenza (required)
- tipo (stringa, array, double, ecc)
- formato (YYYY-DD-GG, filippo@gmail.com)
- lunghezza (max 35 caratteri)
- il dato B diviene required se è presente il dato A

## Why:
- la validazione lato client può essere disabilitata dall'utente
- la validazione lato client non è considerata sicura, ma solo un modo efficiente per dare all'utente un riscontro immediato che sta immettendo degli input non validi





## Notes
- non è accettabile passare il dato fino al layer database prima che ci si accorga che non è valido
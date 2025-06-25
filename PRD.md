# Documento dei Requisiti di Progetto (PRD) - My Simple Notes App

## 1. Introduzione

Questo documento descrive i requisiti per lo sviluppo di "My Simple Notes App", un'applicazione web che consentirà agli utenti di gestire le proprie note personali in modo intuitivo e sicuro. Il progetto è concepito come un'opportunità di apprendimento per sviluppatori full-stack, coprendo concetti fondamentali di sviluppo web.

## 2. Obiettivi del Progetto

- **Apprendimento Full-Stack**: Fornire un'esperienza pratica nello sviluppo di applicazioni web complete, dal frontend al backend, inclusa l'interazione con un database.
- **Gestione Note Personali**: Consentire agli utenti di creare, leggere, aggiornare ed eliminare le proprie note.
- **Autenticazione Utente**: Implementare un sistema di registrazione e accesso sicuro per gli utenti.
- **Esperienza Utente Semplice**: Creare un'interfaccia utente pulita e facile da usare per la gestione delle note.

## 3. Ambito del Progetto

### 3.1. Funzionalità Principali

- **Registrazione Utente**: Gli utenti devono essere in grado di registrarsi con un nome utente e una password.
- **Login/Logout Utente**: Gli utenti registrati devono poter effettuare il login e il logout per accedere/disconnettersi dalla propria area personale.
- **Creazione Note**: Gli utenti autenticati devono poter creare nuove note con un titolo e un contenuto.
- **Visualizzazione Note**: Gli utenti devono poter visualizzare un elenco di tutte le proprie note.
- **Modifica Note**: Gli utenti devono poter modificare il titolo e/o il contenuto delle note esistenti.
- **Eliminazione Note**: Gli utenti devono poter eliminare le note che non desiderano più conservare.
- **Protezione Dati**: Le note devono essere private e accessibili solo dall'utente che le ha create.

### 3.2. Funzionalità Fuori Ambito (per la Fase Iniziale)

- Ricerca note per parola chiave.
- Tagging o categorizzazione delle note.
- Condivisione note con altri utenti.
- Formattazione avanzata del testo delle note (es. Markdown).
- Integrazione con servizi di terze parti.

## 4. Requisiti Tecnici

### 4.1. Architettura

L'applicazione seguirà un'architettura client-server tradizionale, con un frontend web che comunica con un backend tramite API RESTful (o quasi RESTful).

### 4.2. Tecnologie Raccomandate

- **Frontend**:
    - **HTML5**: Per la struttura di base delle pagine.
    - **CSS3**: Per lo stile e il layout dell'applicazione (es. Tailwind CSS per un approccio utility-first).
    - **React**: Per lo sviluppo dell'interfaccia utente e l'interattività lato client.
- **Backend**:
    - **Linguaggio**: JavaScript.
    - **Framework**: Node.js con Express.js.
    - **API**: Implementazione di endpoint HTTP (GET, POST, PUT, DELETE) per le operazioni CRUD sulle note e la gestione degli utenti.
- **Database**:
    - **Tipo**: Relazionale.
    - **Sistema**: SQLite (ideale per iniziare in quanto basato su file e senza necessità di un server separato).
    - **ORM (Object-Relational Mapper)**: Sarà necessario selezionare un ORM/ODM adeguato per Node.js che supporti SQLite (es. Sequelize o Knex.js con `sqlite3` driver).

### 4.3. Schema del Database (Proposta Iniziale)

- **Tabella `users`**:
    - `id` (PRIMARY KEY, INTEGER)
    - `username` (TEXT, UNIQUE, NOT NULL)
    - `password_hash` (TEXT, NOT NULL)
    - `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)
- **Tabella `notes`**:
    - `id` (PRIMARY KEY, INTEGER)
    - `user_id` (FOREIGN KEY verso `users.id`, INTEGER, NOT NULL)
    - `title` (TEXT, NOT NULL)
    - `content` (TEXT)
    - `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)
    - `updated_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)

### 4.4. Sicurezza

- **Hashing delle Password**: Le password degli utenti devono essere hashate prima di essere memorizzate nel database (es. utilizzando `bcrypt.js` in Node.js).
- **Prevenzione SQL Injection**: L'uso di un ORM/Query Builder adeguato per Node.js aiuterà a prevenire automaticamente la maggior parte degli attacchi di SQL Injection.
- **Prevenzione XSS (Cross-Site Scripting)**: Sanificazione dell'input utente e output escaping nel frontend e backend.
- **Gestione Autenticazione (JWT)**: L'autenticazione utente sarà gestita tramite JSON Web Tokens (JWT) per creare API stateless. Dopo un login riuscito, il backend emetterà un JWT che il frontend salverà (es. in `localStorage` o `sessionStorage`) e invierà con ogni richiesta autenticata.

### 4.5. Deployment (Opzionale per la Fase Iniziale)

- Esplorare piattaforme di hosting gratuite o a basso costo come Heroku, Render o altri servizi compatibili con Node.js per rendere l'applicazione accessibile pubblicamente.

## 5. Criteri di Successo

- L'applicazione è funzionante e permette agli utenti di completare tutte le operazioni CRUD sulle note.
- Il sistema di registrazione e login funziona correttamente.
- Il codice è ben strutturato, leggibile e commentato.
- Vengono applicati i principi base di sicurezza.
- Il progetto è una solida base per future espansioni.

## 6. Vantaggi per il Portfolio

Questo progetto, pur essendo semplice, dimostra una comprensione approfondita dei seguenti concetti, rendendolo un'ottima aggiunta a un portfolio:

- **Competenze Full-Stack**: Capacità di lavorare su tutti i livelli di un'applicazione web.
- **Concetti Fondamentali**: Padronanza di autenticazione, gestione utenti e operazioni CRUD, pilastri di quasi tutte le applicazioni web.
- **Progetto Tangibile**: Un'applicazione funzionale che può essere facilmente mostrata e compresa dai recruiter.
- **Base Espandibile**: Dimostra la capacità di costruire una base solida su cui si possono aggiungere funzionalità più complesse in futuro.
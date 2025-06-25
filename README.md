# My Simple Notes App 📝

Un'applicazione web full-stack per la gestione di note personali, costruita con React, Node.js, Express e SQLite. Questo progetto dimostra l'implementazione di operazioni CRUD complete, autenticazione utente sicura e best practice di sviluppo web moderno.

## 📋 Indice

- [Caratteristiche](#-caratteristiche)
- [Tecnologie Utilizzate](#-tecnologie-utilizzate)
- [Architettura](#-architettura)
- [Prerequisiti](#-prerequisiti)
- [Installazione](#-installazione)
- [Utilizzo](#-utilizzo)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Sicurezza](#-sicurezza)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Contributi](#-contributi)
- [Licenza](#-licenza)

## ✨ Caratteristiche

### 🔐 Autenticazione e Autorizzazione

- Registrazione utente sicura con validazione
- Login/logout con JWT (JSON Web Tokens)
- Protezione delle route e middleware di autenticazione
- Hashing delle password con bcrypt

### 📝 Gestione Note

- **Creazione**: Aggiungi nuove note con titolo e contenuto
- **Lettura**: Visualizza tutte le tue note in un'interfaccia pulita
- **Aggiornamento**: Modifica note esistenti
- **Eliminazione**: Rimuovi note indesiderate
- **Privacy**: Le note sono private e accessibili solo al proprietario

### 🎨 Interfaccia Utente

- Design responsive con Tailwind CSS
- Interfaccia moderna e intuitiva
- Navigazione fluida con React Router
- Feedback visivo per azioni utente

## 🛠 Tecnologie Utilizzate

### Frontend

- **React 19.1** - Libreria UI per interfacce dinamiche
- **React Router DOM 7.6** - Routing lato client
- **Tailwind CSS 4.1** - Framework CSS utility-first
- **Axios 1.10** - Client HTTP per chiamate API
- **Vite 6.3** - Build tool e development server

### Backend

- **Node.js** - Runtime JavaScript server-side
- **Express.js 5.1** - Framework web minimalista
- **Sequelize 6.37** - ORM per database relazionali
- **SQLite 5.1** - Database leggero basato su file
- **JSON Web Tokens 9.0** - Autenticazione stateless
- **bcryptjs 3.0** - Hashing delle password
- **CORS 2.8** - Cross-Origin Resource Sharing

### Development Tools

- **ESLint** - Linting del codice
- **Nodemon** - Auto-restart del server in development
- **Sequelize CLI** - Gestione database e migrazioni
- **PostCSS** - Processing CSS

## 🏗 Architettura

```text
┌─────────────────┐    HTTP/JSON     ┌─────────────────┐
│                 │    Requests      │                 │
│   React SPA     │ ◄────────────► │   Express API   │
│   (Frontend)    │                  │   (Backend)     │
│                 │                  │                 │
└─────────────────┘                  └─────────────────┘
                                              │
                                              │ Sequelize ORM
                                              ▼
                                     ┌─────────────────┐
                                     │                 │
                                     │   SQLite DB     │
                                     │   (Database)    │
                                     │                 │
                                     └─────────────────┘
```

### Struttura del Progetto

```text
My-Simple-Notes-App/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/       # Componenti riutilizzabili
│   │   ├── pages/           # Pagine dell'applicazione
│   │   ├── services/        # API client e servizi
│   │   ├── hooks/           # Custom React hooks
│   │   └── context/         # Context providers
│   └── public/              # Asset statici
├── backend/                 # Express API Server
│   ├── controllers/         # Logic di business
│   ├── models/             # Modelli Sequelize
│   ├── routes/             # Definizione routes API
│   ├── middleware/         # Middleware personalizzati
│   ├── migrations/         # Migrazioni database
│   └── config/             # Configurazione applicazione
└── docs/                   # Documentazione
```

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere installato:

- **Node.js** (versione 18 o superiore)
- **npm** (generalmente incluso con Node.js)
- **Git** (per clonare il repository)

Verifica l'installazione:

```bash
node --version
npm --version
git --version
```

## 🚀 Installazione

### 1. Clona il Repository

```bash
git clone https://github.com/AngeloAlbanesi/My-Simple-Notes-App.git
cd My-Simple-Notes-App
```

### 2. Configurazione Backend

```bash
# Naviga nella cartella backend
cd backend

# Installa le dipendenze
npm install

# Crea file di configurazione ambiente (opzionale)
cp .env.example .env  # Se presente un file di esempio
# Oppure crea .env manualmente con:
# PORT=3001
# JWT_SECRET=your_super_secret_jwt_key_here

# Esegui le migrazioni del database
npx sequelize-cli db:migrate

# (Opzionale) Esegui i seeder per dati di test
npx sequelize-cli db:seed:all
```

### 3. Configurazione Frontend

```bash
# Apri un nuovo terminale e naviga nella cartella frontend
cd frontend

# Installa le dipendenze
npm install
```

### 4. Avvia l'Applicazione

Avvia il backend (terminale 1):

```bash
cd backend
npm run dev  # Sviluppo con auto-restart
# oppure
npm start    # Produzione
```

Avvia il frontend (terminale 2):

```bash
cd frontend
npm run dev  # Server di sviluppo
```

L'applicazione sarà disponibile su:

- **Frontend**: <http://localhost:5173>
- **Backend API**: <http://localhost:3001>

## 🎯 Utilizzo

### Registrazione e Login

1. Visita <http://localhost:5173>
2. Clicca su "Registrati" per creare un nuovo account
3. Compila il form con username e password
4. Dopo la registrazione, effettua il login
5. Verrai reindirizzato alla dashboard

### Gestione Note

1. **Creare una nota**: Clicca su "Nuova Nota" e compila il form
2. **Visualizzare note**: Tutte le tue note saranno visibili nella pagina "Le Mie Note"
3. **Modificare una nota**: Clicca sull'icona di modifica accanto alla nota
4. **Eliminare una nota**: Clicca sull'icona del cestino (con conferma)

### Navigazione

- **Dashboard**: Panoramica dell'applicazione
- **Le Mie Note**: Gestione completa delle note personali
- **Logout**: Termina la sessione in sicurezza

## 🔌 API Endpoints

### Autenticazione

```http
POST /api/users/register     # Registrazione utente
POST /api/users/login        # Login utente
```

### Note (Richiede Autenticazione)

```http
GET    /api/notes           # Ottieni tutte le note dell'utente
POST   /api/notes           # Crea una nuova nota
PUT    /api/notes/:id       # Aggiorna nota esistente
DELETE /api/notes/:id       # Elimina nota
```

### Esempi di Richieste

#### Registrazione

```json
POST /api/users/register
Content-Type: application/json

{
  "username": "mariorossi",
  "password": "password123"
}
```

#### Creazione Nota

```json
POST /api/notes
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "La mia prima nota",
  "content": "Questo è il contenuto della nota..."
}
```

## 🗄 Database Schema

### Tabella `users`

| Campo       | Tipo      | Descrizione                    |
|-------------|-----------|--------------------------------|
| id          | INTEGER   | Chiave primaria (auto-increment) |
| username    | TEXT      | Nome utente (unico)            |
| password    | TEXT      | Password hashata con bcrypt    |
| createdAt   | DATETIME  | Data creazione account         |
| updatedAt   | DATETIME  | Data ultimo aggiornamento      |

### Tabella `notes`

| Campo       | Tipo      | Descrizione                    |
|-------------|-----------|--------------------------------|
| id          | INTEGER   | Chiave primaria (auto-increment) |
| userId      | INTEGER   | Riferimento a users.id         |
| title       | TEXT      | Titolo della nota              |
| content     | TEXT      | Contenuto della nota           |
| createdAt   | DATETIME  | Data creazione                 |
| updatedAt   | DATETIME  | Data ultimo aggiornamento      |

## 🔒 Sicurezza

### Implementazioni di Sicurezza

- **Password Hashing**: Tutte le password sono hashate con bcrypt (salt rounds: 10)
- **JWT Authentication**: Token sicuri per sessioni stateless
- **CORS Protection**: Configurato per prevenire richieste cross-origin non autorizzate
- **Input Validation**: Validazione lato client e server
- **SQL Injection Prevention**: Uso di Sequelize ORM con query parametrizzate
- **XSS Protection**: Sanificazione dell'input utente

### Middleware di Sicurezza

- Middleware di autenticazione per proteggere le route API
- Validazione dei token JWT
- Controllo delle autorizzazioni per le operazioni sulle note

## 📸 Screenshots

### Landing Page

[Inserire screenshot della landing page]

### Dashboard

[Inserire screenshot della dashboard]

### Gestione Note (Screenshots)

[Inserire screenshot della pagina note]

## 🗺 Roadmap

### Versione 1.1 (Nel prossimo futuro)

- [ ] Ricerca note per titolo/contenuto
- [ ] Filtri e ordinamento note
- [ ] Dark/Light theme toggle
- [ ] Esportazione note (PDF, TXT)

### Versione 1.2 (Futuro)

- [ ] Categorizzazione note con tag
- [ ] Editor rich text con Markdown
- [ ] Sincronizzazione cloud (?)
- [ ] Condivisione note pubbliche(?)

### Versione 2.0 (Visione a Lungo Termine)

- [ ] App mobile con React Native


## 🤝 Contributi

I contributi sono benvenuti! Per contribuire:

1. **Fork** il progetto
2. Crea un **feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit** le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. **Push** al branch (`git push origin feature/AmazingFeature`)
5. Apri una **Pull Request**

### Guidelines per i Contributi

- Segui lo stile di codice esistente
- Aggiungi test per nuove funzionalità
- Aggiorna la documentazione se necessario
- Descrivi chiaramente le modifiche nella PR

### Reporting Issues

- Usa i template di issue quando disponibili
- Fornisci informazioni dettagliate per riprodurre bug
- Includi screenshot se appropriato

## 📝 Licenza

Questo progetto è rilasciato sotto la [MIT License](LICENSE).

```text
Copyright (c) 2025 [Il Tuo Nome]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Autore

**Angelo Albanesi**

- GitHub: [@AngeloAlbanesi](https://github.com/AngeloAlbanesi)

---



⭐ **Se questo progetto ti è stato utile, lascia una stella!** ⭐
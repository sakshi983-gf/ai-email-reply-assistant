# AI Email Reply Assistant

An AI-powered full-stack web application that helps users compose professional email replies, improve grammar, summarize emails, and customize responses using Large Language Models (LLMs).

---

## Features

- AI-powered email reply generation
- Multiple reply tone options (Professional, Friendly, Formal, Casual)
- Grammar correction
- Email summarization
- Subject line generation
- User authentication (JWT)
- Profile management
- Settings customization
- Responsive user interface

---

## Tech Stack

### Frontend
- React.js
- CSS3
- Axios
- React Router

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### AI
- Groq API (Llama Model)

### Authentication
- JWT (JSON Web Token)

---

## Project Structure

```
AI-Email-Reply-Assistant
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── middleware
│   ├── database
│   ├── config
│   ├── utils
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/sakshi983-gf/ai-email-reply-assistant.git
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and configure:

```
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=mailpilot_ai
DB_USER=postgres
DB_PASSWORD=your_password

JWT_SECRET=your_secret

GROQ_API_KEY=your_api_key
```

Start backend

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Future Enhancements

- Gmail integration
- Email scheduling
- AI-powered spam detection
- Smart attachment suggestions
- Multi-language support
- Voice-to-email
- Dark mode

---

## Author

**Sakshi B S**

GitHub:
https://github.com/sakshi983-gf

LinkedIn:
https://www.linkedin.com/in/sakshi-b-s-050093290

---

## License

This project is intended for learning and educational purposes.
# AI Email Reply Assistant

An AI-powered web application that helps users generate professional email replies using AI.

## Screenshot

![Login Page](assets/login.png)
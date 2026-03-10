# ContactHub — Contact Form Application

A fullstack contact form application built with **React (TypeScript) + Tailwind CSS** on the frontend and **Node.js/Express** on the backend. Supports dark/light themes, client + server validation, responsive design, and an admin panel for viewing/deleting submissions.

---

## Features

- **Contact Form** with Name, Email, Subject (dropdown), and Message fields
- **Client-side validation** with real-time feedback on blur and submit
- **Server-side validation** as a safety net (never trust the client)
- **Success/error feedback** with animated UI states
- **Admin panel** to view all submissions in a table (with delete support)
- **Dark/light theme** toggle with OS preference detection
- **Mobile-first responsive design** — works on all screen sizes
- **Character counter** for the message field
- **Loading states** during form submission
- **Confirmation dialog** before deleting submissions

---

## Tech Stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Frontend | React 18, TypeScript, Tailwind v4 |
| Backend  | Node.js, Express                  |
| Storage  | JSON file (`server/data.json`)    |
| Bundler  | Vite                              |

---

## Project Structure

```
contact-form/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.tsx     # Main form component
│   │   │   ├── FormField.tsx       # Reusable form field
│   │   │   ├── SuccessMessage.tsx  # Post-submit success UI
│   │   │   ├── SubmissionsList.tsx # Admin table view
│   │   │   └── ThemeToggle.tsx     # Dark/light mode toggle
│   │   ├── hooks/
│   │   │   ├── useContactForm.ts   # Form state & validation logic
│   │   │   └── useTheme.ts         # Theme management hook
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript interfaces
│   │   ├── App.tsx                 # Root component with nav
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Tailwind + custom theme
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
├── server/                     # Express backend
│   ├── index.js                    # API server (routes + validation)
│   ├── data.json                   # Submission storage
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** installed

### 1. Start the Backend

```bash
cd server
npm install
npm run dev
```

The API server starts at **http://localhost:3001**.

### 2. Start the Frontend

```bash
cd client
npm install
npm run dev
```

The dev server starts at **http://localhost:5173** with a proxy to the backend.

### 3. Open the App

Visit **http://localhost:5173** in your browser. Use the nav tabs to switch between the **Contact Form** and **Admin Submissions** views.

---

## API Endpoints

### `POST /api/contact`

Submit a new contact form.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "General Inquiry",
  "message": "Hello, I have a question about your services."
}
```

**Response (201):**
```json
{ "id": 1, "message": "Thank you for your message!" }
```

**Response (400):**
```json
{ "errors": { "email": "Invalid email format", "message": "Message must be at least 10 characters" } }
```

### `GET /api/contact`

Retrieve all submissions.

**Response (200):**
```json
{
  "submissions": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "General Inquiry",
      "message": "Hello...",
      "createdAt": "2026-03-10T08:30:00.000Z"
    }
  ]
}
```

### `DELETE /api/contact/:id`

Delete a submission by ID.

---

## Validation Rules

| Field   | Rules                                              |
| ------- | -------------------------------------------------- |
| Name    | Required, minimum 2 characters                     |
| Email   | Required, valid email format (regex)                |
| Subject | Required, must be one of the predefined options     |
| Message | Required, minimum 10 characters                    |

**Subject options:** General Inquiry, Technical Support, Feedback, Partnership, Other

---

## What I'd Improve

- **Database**: Replace JSON file storage with SQLite or PostgreSQL for thread safety and scalability
- **Authentication**: Add login for the admin panel so submissions aren't publicly accessible
- **Rate limiting**: Prevent spam by adding rate limits on the POST endpoint
- **Email notifications**: Send an email confirmation to the user and a notification to the admin
- **Pagination & search**: Add pagination and filtering to the admin submissions view
- **End-to-end tests**: Add Cypress or Playwright tests for the full user flow
- **Deployment**: Containerize with Docker and deploy to a cloud provider

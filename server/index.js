const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(express.json());


const VALID_SUBJECTS = [
  'General Inquiry',
  'Technical Support',
  'Feedback',
  'Partnership',
  'Other',
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readSubmissions() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeSubmissions(submissions) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8');
}

function validateSubmission(body) {
  const errors = {};

  // Name
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (body.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email
  if (!body.email || typeof body.email !== 'string' || body.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(body.email.trim())) {
    errors.email = 'Invalid email format';
  }

  // Subject
  if (!body.subject || typeof body.subject !== 'string' || body.subject.trim().length === 0) {
    errors.subject = 'Subject is required';
  } else if (!VALID_SUBJECTS.includes(body.subject.trim())) {
    errors.subject = 'Subject must be one of: ' + VALID_SUBJECTS.join(', ');
  }

  // Message
  if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (body.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}


// POST /api/contact — submit a new contact form
app.post('/api/contact', (req, res) => {
  const errors = validateSubmission(req.body);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const submissions = readSubmissions();

  const newId = submissions.length > 0
    ? Math.max(...submissions.map((s) => s.id)) + 1
    : 1;

  const submission = {
    id: newId,
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    subject: req.body.subject.trim(),
    message: req.body.message.trim(),
    createdAt: new Date().toISOString(),
  };

  submissions.push(submission);
  writeSubmissions(submissions);

  return res.status(201).json({
    id: submission.id,
    message: 'Thank you for your message!',
  });
});

// GET /api/contact — list all submissions
app.get('/api/contact', (_req, res) => {
  const submissions = readSubmissions();
  return res.json({ submissions });
});

// DELETE /api/contact/:id — delete a submission
app.delete('/api/contact/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  let submissions = readSubmissions();
  const index = submissions.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  submissions.splice(index, 1);
  writeSubmissions(submissions);

  return res.json({ message: 'Submission deleted' });
});

// Server Start 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

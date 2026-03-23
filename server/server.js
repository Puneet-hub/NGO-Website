require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// ✅ FIXED CORS (IMPORTANT)
app.use(cors({
  origin: '*',   // 🔥 allows all (no more CORS error)
}));

app.use(express.json());

console.log('🚀 Backend Starting...');

// ─── Nodemailer Transporter (Brevo SMTP) ─────────────────────────

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter error:', error.message);
  } else {
    console.log('✅ Email transporter ready');
  }
});

// ─── Services ───────────────────────────────────────────────────

const services = [
  {
    _id: '1',
    title: 'Web Development',
    description: 'Custom responsive websites',
    image: 'https://images.unsplash.com/photo-1469362102473-8622cfb973cd?w=400',
    details: 'React, Node.js, Full-stack MERN development...',
    category: 'Digital'
  },
  {
    _id: '2',
    title: 'Graphic Design',
    description: 'Brand identity & logos',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400',
    details: 'Professional logos, banners...',
    category: 'Creative'
  },
  {
    _id: '3',
    title: 'Digital Marketing',
    description: 'SEO & Social Media',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    details: 'Google ranking, ads...',
    category: 'Marketing'
  }
];

// ─── Routes ─────────────────────────────────────────────────────

app.get('/api/services', (req, res) => {
  console.log('📊 Services requested');
  res.json(services);
});

app.get('/api/services/:id', (req, res) => {
  const service = services.find(s => s._id === req.params.id);
  res.json(service || {});
});

// ─── Contact API ───────────────────────────────────────────────

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  console.log('📧 NEW CONTACT:', name, email);

  const mailOptions = {
    from: `"Website" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_TO,
    subject: `New Message from ${name}`,
    html: `
      <h2>New Contact</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent');
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Email error:', error.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// ─── ROOT ROUTE ────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// ─── START SERVER (RENDER FIX) ────────────────────────────────

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});